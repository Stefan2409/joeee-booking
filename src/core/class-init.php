<?php

namespace Joeee_Booking\Core;

use Joeee_Booking\Admin as Admin;
use Joeee_Booking\Common as Common;
use Joeee_Booking\Frontend as Frontend;
use Joeee_Booking\PluginData as PluginData;
use Joeee_Booking\RestController as RestController;
use Joeee_Booking\Shortcodes as Shortcodes;

// Abort if this file is called directly.
if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists(Init::class)) {
    /**
     * The core plugin class.
     * Defines internationalization, admin-specific hooks, and public-facing site hooks.
     */
    class Init
    {

        /**
         * The loader that's responsible for maintaining and registering all hooks that power
         * the plugin.
         *
         * @var Loader $loader Maintains and registers all hooks for the plugin.
         */
        protected $loader;

        /**
         * Initialize and define the core functionality of the plugin.
         */
        public function __construct()
        {
            $this->loadDependencies();
            $this->setLocale();
            $this->defineCommonHooks();
            $this->defineAdminHooks();
            $this->definePublicHooks();
            $this->registerShortcodes();
            $this->loadRestApi();
            $this->frontendLogin();
        }

        /**
         * Loads the following required dependencies for this plugin.
         *
         * - Loader - Orchestrates the hooks of the plugin.
         * - InternationalizationI18n - Defines internationalization functionality.
         * - Admin - Defines all hooks for the admin area.
         * - Frontend - Defines all hooks for the public side of the site.
         */
        private function loadDependencies(): void
        {
            $this->loader = new Loader();
        }

        /**
         * Define the locale for this plugin for internationalization.
         *
         * Uses the InternationalizationI18n class in order to set the domain and to register the hook
         * with WordPress.
         */
        private function setLocale(): void
        {
            $plugin_i18n = new InternationalizationI18n();

            $this->loader->addAction('plugins_loaded', $plugin_i18n, 'loadPluginTextdomain');
        }

        /**
         * Register all of the hooks related to both the admin area and the public-facing functionality of the plugin.
         */
        private function defineCommonHooks(): void
        {
            $plugin_common = new Common\Common();

            // Example: $this->loader->add_filter( 'gform_currencies', $plugin_common, 'gf_currency_usd_whole_dollars', 50 );
        }

        /**
         * Register all of the hooks related to the admin area functionality of the plugin.
         * Also works during Ajax.
         */
        private function defineAdminHooks(): void
        {
            if (!is_admin()) {
                return;
            }

            $assets = new Admin\Assets();

            // Enqueue plugin's admin styles. The scripts are enqueued for each site extra under admin_menus class.
            $this->loader->addAction('admin_enqueue_scripts', $assets, 'enqueueStyles');

            $settings = new Admin\Settings();

            // Plugin action links
            $this->loader->addFilter('plugin_action_links_' . PluginData::pluginBasename(), $settings, 'addActionLinks');

            // Admin menu
            $this->loader->addAction('admin_menu', $settings, 'addPluginAdminMenu');

            $admin_main_menu = new Admin\AdminMenus();

            // Calendar menu
            $this->loader->addAction('admin_menu', $admin_main_menu, 'addCalendarMenu');

            //Extras menu
            $this->loader->addAction('admin_menu', $admin_main_menu, 'addExtrasSubmenu');

        }

        /**
         * Register all of the hooks related to the public-facing functionality of the plugin.
         * Also works during Ajax.
         */
        private function definePublicHooks(): void
        {
            if (is_admin() && !wp_doing_ajax()
            ) {
                return;
            }

            $assets = new Frontend\Assets();

            // Enqueue plugin's front-end assets
            $this->loader->addAction('wp_enqueue_scripts', $assets, 'enqueueStyles');
            $this->loader->addAction('wp_enqueue_scripts', $assets, 'enqueueScripts');
        }

        private function frontendLogin(): void {
            $login = new Frontend\Login();

            $this->loader->addAction('after_setup_theme', $login, 'add_login');
        }

        /**
         * Register all of the shortcodes.
         */
        private function registerShortcodes(): void
        {
            (new Shortcodes\ManageShortcodes())->registerAllShortcodes();
        }

        /**
         * Run the loader to execute all of the hooks with WordPress.
         */
        public function run(): void
        {
            $this->loader->run();
        }

        /**
         * The reference to the class that orchestrates the hooks with the plugin.
         *
         * @return Loader Orchestrates the hooks of the plugin.
         */
        public function getLoader(): Loader
        {
            return $this->loader;
        }
        /**
         * Loads the REST Api used for the plugin
         *
         */
        public function loadRestApi()
        {
            $rest_api = new RestController();
            $this->loader->addAction('rest_api_init', $rest_api, 'registerRoutes');
        }
    }
}

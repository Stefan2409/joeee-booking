<?php

namespace Joeee_Booking\Core;

use Joeee_Booking\Admin as Admin;
use Joeee_Booking\Common as Common;
use Joeee_Booking\Frontend as Frontend;
use Joeee_Booking\Shortcodes as Shortcodes;
use Joeee_Booking\Plugin_Data as Plugin_Data;
use Joeee_Booking\Rest_Controller as Rest_Controller;

// Abort if this file is called directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( Init::class ) ) {
	/**
	 * The core plugin class.
	 * Defines internationalization, admin-specific hooks, and public-facing site hooks.
	 */
	class Init {

		/**
		 * The loader that's responsible for maintaining and registering all hooks that power
		 * the plugin.
		 *
		 * @var      Loader $loader Maintains and registers all hooks for the plugin.
		 */
		protected $loader;

		/**
		 * Initialize and define the core functionality of the plugin.
		 */
		public function __construct() {
			$this->load_dependencies();
			$this->set_locale();
			$this->define_common_hooks();
			$this->define_admin_hooks();
			$this->define_public_hooks();
			$this->register_shortcodes();
			$this->load_rest_api();
		}

		/**
		 * Loads the following required dependencies for this plugin.
		 *
		 * - Loader - Orchestrates the hooks of the plugin.
		 * - Internationalization_I18n - Defines internationalization functionality.
		 * - Admin - Defines all hooks for the admin area.
		 * - Frontend - Defines all hooks for the public side of the site.
		 */
		private function load_dependencies(): void {
			$this->loader = new Loader();
		}

		/**
		 * Define the locale for this plugin for internationalization.
		 *
		 * Uses the Internationalization_I18n class in order to set the domain and to register the hook
		 * with WordPress.
		 */
		private function set_locale(): void {
			$plugin_i18n = new Internationalization_I18n();

			$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );
		}

		/**
		 * Register all of the hooks related to both the admin area and the public-facing functionality of the plugin.
		 */
		private function define_common_hooks(): void {
			$plugin_common = new Common\Common();

			// Example: $this->loader->add_filter( 'gform_currencies', $plugin_common, 'gf_currency_usd_whole_dollars', 50 );
		}


		/**
		 * Register all of the hooks related to the admin area functionality of the plugin.
		 * Also works during Ajax.
		 */
		private function define_admin_hooks(): void {
			if ( ! is_admin() ) {
				return;
			}

			$assets = new Admin\Assets();

			// Enqueue plugin's admin assets
			$this->loader->add_action( 'admin_enqueue_scripts', $assets, 'enqueue_styles' );
			$this->loader->add_action( 'admin_enqueue_scripts', $assets, 'enqueue_scripts' );

			$settings = new Admin\Settings();

			// Plugin action links
			$this->loader->add_filter( 'plugin_action_links_' . Plugin_Data::plugin_basename(), $settings, 'add_action_links' );

			// Admin menu
			$this->loader->add_action( 'admin_menu', $settings, 'add_plugin_admin_menu' );

			$admin_main_menu = new Admin\Admin_Menus();

			// Calendar menu
			$this->loader->add_action( 'admin_menu', $admin_main_menu, 'add_calendar_menu' );

			//Extras menu
			$this->loader->add_action( 'admin_menu', $admin_main_menu, 'add_extras_submenu' );

		}

		/**
		 * Register all of the hooks related to the public-facing functionality of the plugin.
		 * Also works during Ajax.
		 */
		private function define_public_hooks(): void {
			if (
				is_admin()
				&& ! wp_doing_ajax()
			) {
				return;
			}

			$assets = new Frontend\Assets();

			// Enqueue plugin's front-end assets
			$this->loader->add_action( 'wp_enqueue_scripts', $assets, 'enqueue_styles' );
			$this->loader->add_action( 'wp_enqueue_scripts', $assets, 'enqueue_scripts' );
		}

		/**
		 * Register all of the shortcodes.
		 */
		private function register_shortcodes(): void {
			( new Shortcodes\Manage_Shortcodes() )->register_all_shortcodes();
		}

		/**
		 * Run the loader to execute all of the hooks with WordPress.
		 */
		public function run(): void {
			$this->loader->run();
		}

		/**
		 * The reference to the class that orchestrates the hooks with the plugin.
		 *
		 * @return Loader Orchestrates the hooks of the plugin.
		 */
		public function get_loader(): Loader {
			return $this->loader;
		}
		/**
		 * Loads the REST Api used for the plugin
		 * 
		 */
		public function load_rest_api() {
			$rest_api = new Rest_Controller();
			$this->loader->add_action( 'rest_api_init', $rest_api, 'register_routes' );

		}

		


	}
}
<?php

namespace Joeee_Booking\Admin;

use Joeee_Booking\Common\Settings as Common_Settings;
use Joeee_Booking\Plugin_Data as Plugin_Data;

// Abort if this file is called directly.
if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists(Settings::class)) {
    /**
     * The admin-specific settings.
     */
    class Settings
    {

        /**
         * Get the Settings instance from Common.
         *
         * @var Common_Settings
         */
        private $settings;

        /**
         * Initialize the class and set its properties.
         */
        public function __construct()
        {
            $this->settings = new Common_Settings();
        }

        /**
         * Add Settings link within Plugins List page.
         *
         * @param array $links
         *
         * @return array
         */
        public function add_action_links(array $links): array
        {
            $mylinks = [
                '<a href="' . esc_url($this->settings->get_main_settings_page_url()) . '">' . $this->settings->get_settings_word() . '</a>',
            ];

            return array_merge($mylinks, $links);
        }

        /**
         * Add the Settings page to the wp-admin menu.
         */
        public function add_plugin_admin_menu(): void
        {
            add_options_page(
                Plugin_Data::get_plugin_display_name(),
                Plugin_Data::get_plugin_display_name(),
                $this->settings->common->required_capability(),
                $this->settings->get_settings_page_slug(),
                [$this, 'settings_page']
            );
        }

        /**
         * Outputs HTML for the plugin's Settings page.
         */
        public function settings_page(): void
        {
            if (!current_user_can($this->settings->common->required_capability())) {
                wp_die(esc_html__('You do not have sufficient permissions to access this page.', 'joeee-booking'));
            }

            ?>
			<div class="wrap">
				<h1><?php echo Plugin_Data::get_plugin_display_name() . ' ' . $this->settings->get_settings_word(); ?>
				</h1>
			</div>
			<?php
}
    }
}
<?php

namespace Joeee_Booking\Admin;

use Joeee_Booking\Common\Settings as CommonSettings;
use Joeee_Booking\PluginData as PluginData;

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
         * @var CommonSettings
         */
        private $settings;

        /**
         * Initialize the class and set its properties.
         */
        public function __construct()
        {
            $this->settings = new CommonSettings();
        }

        /**
         * Add Settings link within Plugins List page.
         *
         * @param array $links
         *
         * @return array
         */
        public function addActionLinks(array $links): array
        {
            $mylinks = [
                '<a href="' . esc_url($this->settings->getMainSettingsPageUrl()) . '">' . $this->settings->getSettingsWord() . '</a>',
            ];

            return array_merge($mylinks, $links);
        }

        /**
         * Add the Settings page to the wp-admin menu.
         */
        public function addPluginAdminMenu(): void
        {
            add_options_page(
                PluginData::getPluginDisplayName(),
                PluginData::getPluginDisplayName(),
                $this->settings->common->requiredCapability(),
                $this->settings->getSettingsPageSlug(),
                [$this, 'settingsPage']
            );
        }

        /**
         * Outputs HTML for the plugin's Settings page.
         */
        public function settingsPage(): void
        {
            if (!current_user_can($this->settings->common->requiredCapability())) {
                wp_die(esc_html__('You do not have sufficient permissions to access this page.', 'joeee-booking'));
            }

            ?>
			<div class="wrap">
				<h1><?php echo PluginData::getPluginDisplayName() . ' ' . $this->settings->getSettingsWord(); ?>
				</h1>
			</div>
			<?php
}
    }
}
<?php

namespace Joeee_Booking\Common;

use Joeee_Booking\Common\Common as Common;
use Joeee_Booking\Plugin_Data as Plugin_Data;

// Abort if this file is called directly.
if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists(Settings::class)) {
    /**
     * Everything related to setting, getting, and sanitizing plugin settings/options.
     */
    class Settings
    {

        /**
         * The Common instance.
         *
         * @var Common
         */
        public $common;

        /**
         * Initialize the class and set its properties.
         */
        public function __construct()
        {
            $this->common = new Common();
        }

        /**
         * The plugin's Settings page URL.
         *
         * @return string
         */
        public function get_main_settings_page_url(): string
        {
            $url = 'options-general.php?page=' . $this->get_settings_page_slug();

            return admin_url($url);
        }

        /**
         * The plugin's Settings page slug.
         *
         * @return string
         */
        public function get_settings_page_slug(): string
        {
            return 'joeee-booking' . '-settings';
        }

        /**
         * The translatable "Settings" text.
         *
         * @return string
         */
        public function get_settings_word(): string
        {
            return esc_html__('Settings', 'joeee-booking');
        }

        /**
         * Get a single option from the database, as a string, with an optional fallback value.
         *
         * @param string $key
         * @param string $default
         *
         * @return string
         */
        public function get_option_as_string(string $key, string $default = ''): string
        {
            $result = $this->get_option($key, $default);

            return $result;
        }

        /**
         * Get the raw value of a single option from the database with an optional fallback value.
         *
         * @param string $key
         * @param mixed  $default
         *
         * @return mixed
         */
        public function get_option(string $key, $default = '')
        {
            $all_options = $this->get_all_options();

            // Cannot use empty() because an unchecked checkbox is boolean false, for example.
            if (isset($all_options[$key])) {
                return $all_options[$key];
            } else {
                return $default;
            }
        }

        /**
         * Get all of the saved options from the database.
         *
         * @return array
         */
        public function get_all_options(): array
        {
            $plugin_options = get_option(Plugin_Data::plugin_text_domain_underscores());

            if (!empty($plugin_options)) {
                return (array) $plugin_options;
            } else {
                return [];
            }
        }

        /**
         * Get a single option from the database as an array with an optional fallback value.
         *
         * @todo Is array_keys() really what we want here?
         *
         * @param string $key
         * @param mixed  $default
         *
         * @return array
         */
        public function get_option_as_array(string $key, $default = ''): array
        {
            $result = $this->get_option($key, $default);

            if (is_string($result)) {
                $result = json_decode($result, true);
            }

            $result = (array) $result;

            $result = array_keys($result);

            return $result;
        }

        /**
         * Delete all of the saved options from the database.
         *
         * @see delete_option()
         *
         * @return bool
         */
        public function delete_all_options(): bool
        {
            return delete_option(Plugin_Data::plugin_text_domain_underscores());
        }

    }
}

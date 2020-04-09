<?php

namespace Joeee_Booking\Core;

// Abort if this file is called directly.
if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists(InternationalizationI18n::class)) {
    /**
     * Define the internationalization functionality.
     *
     * Loads and defines the internationalization files for this plugin so that it is ready for translation.
     */
    class InternationalizationI18n
    {

        /**
         * Load the plugin text domain for translation.
         */
        public function loadPluginTextdomain(): void
        {
            load_plugin_textdomain('joeee-booking', false, dirname(dirname(plugin_basename(__FILE__))) . '/languages/');
        }
    }
}

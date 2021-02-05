<?php

namespace Joeee_Booking\Admin;

use Joeee_Booking\PluginData as PluginData;

// Abort if this file is called directly.
if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists(Assets::class)) {
    /**
     * Enqueues the admin-specific assets.
     */
    class Assets
    {

        /**
         * Register the stylesheets for the admin area.
         */
        public function enqueueStyles(): void
        {
            wp_enqueue_style('joeee-booking', plugin_dir_url(__FILE__) . 'css/bookingcalendar.css', [], PluginData::pluginVersion(), 'all');
        }

        /**
         * Register the JavaScript for the admin area.
         */
        public function enqueueScripts(): void
        {
            wp_enqueue_script('axios', 'https://unpkg.com/axios/dist/axios.min.js', [], PluginData::pluginVersion(), false);
            wp_enqueue_script('joeee-booking', plugin_dir_url(__FILE__) . 'js/bookingcalendar.js', ['wp-element', 'wp-i18n', 'axios'], PluginData::pluginVersion(), true);

            wp_localize_script('joeee-booking', 'joeeeRest', array(
                'restURL' => rest_url(),
                'restNonce' => wp_create_nonce('wp_rest'),
            ));
        }

        public function enqueueScriptsExtra(): void
        {
            if (defined('WP_DEBUG') && true === WP_DEBUG) {
                wp_enqueue_script('joeee-booking-extras', plugin_dir_url(__FILE__) . 'js/extras.js', ['jquery', 'wp-i18n'], PluginData::pluginVersion(), false);
            } else {
                wp_enqueue_script('joeee-booking-extras', plugin_dir_url(__FILE__) . 'js/extras.min.js', ['jquery', 'wp-i18n'], PluginData::pluginVersion(), false);
            }
            wp_localize_script('joeee-booking-extras', 'joeeeExtrasRest', array(
                'restURL' => rest_url(),
                'restNonce' => wp_create_nonce('wp_rest'),
            ));
        }
    }
}

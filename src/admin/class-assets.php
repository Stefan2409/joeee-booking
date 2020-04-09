<?php

namespace Joeee_Booking\Admin;

use Joeee_Booking\Plugin_Data as Plugin_Data;

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
        public function enqueue_styles(): void
        {
            if (defined('WP_DEBUG') && true === WP_DEBUG) {
                wp_enqueue_style('joeee-booking', plugin_dir_url(__FILE__) . 'css/style.css', [], Plugin_Data::plugin_version(), 'all');
            } else {
                wp_enqueue_style('joeee-booking', plugin_dir_url(__FILE__) . 'css/style.min.css', [], Plugin_Data::plugin_version(), 'all');
            }
        }

        /**
         * Register the JavaScript for the admin area.
         */
        public function enqueue_scripts(): void
        {
            if (defined('WP_DEBUG') && true === WP_DEBUG) {
                wp_enqueue_script('joeee-booking', plugin_dir_url(__FILE__) . 'js/script.js', ['jquery', 'wp-i18n'], Plugin_Data::plugin_version(), false);
            } else {
                wp_enqueue_script('joeee-booking', plugin_dir_url(__FILE__) . 'js/script.min.js', ['jquery', 'wp-i18n'], Plugin_Data::plugin_version(), false);
            }
            wp_localize_script('joeee-booking', 'joeeeRest', array(
                'restURL' => rest_url(),
                'restNonce' => wp_create_nonce('wp_rest'),
            ));
        }

        public function enqueue_scripts_extra(): void
        {
            if (defined('WP_DEBUG') && true === WP_DEBUG) {
                wp_enqueue_script('joeee-booking-extras', plugin_dir_url(__FILE__) . 'js/extras.js', ['jquery', 'wp-i18n'], Plugin_Data::plugin_version(), false);
            } else {
                wp_enqueue_script('joeee-booking-extras', plugin_dir_url(__FILE__) . 'js/extras.min.js', ['jquery', 'wp-i18n'], Plugin_Data::plugin_version(), false);
            }
            wp_localize_script('joeee-booking-extras', 'joeeeExtrasRest', array(
                'restURL' => rest_url(),
                'restNonce' => wp_create_nonce('wp_rest'),
            ));
        }
    }
}

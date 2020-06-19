<?php

namespace Joeee_Booking\Frontend;

use Joeee_Booking\PluginData as PluginData;
use WPS\WPS_Hide_Login\Plugin;

// Abort if this file is called directly.
if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists(Assets::class)) {
    /**
     * Enqueues the public-facing assets.
     */
    class Assets
    {

        /**
         * Register the stylesheets for the public-facing side of the site.
         */
        public function enqueueStyles(): void
        {
            wp_enqueue_style('joeee-booking-login', plugin_dir_url(__FILE__) . 'css/login.css', [], PluginData::pluginVersion(), 'all');
            $this->enqueueMemberStyles();
        }

        /**
         * Register the JavaScript for the public-facing side of the site.
         */
        public function enqueueScripts(): void
        {
            wp_enqueue_script('axios', 'https://unpkg.com/axios/dist/axios.min.js', [], PluginData::pluginVersion(), false);
            wp_enqueue_script('joeee-booking-login', plugin_dir_url(__FILE__) . 'js/login.js', ['wp-element', 'wp-i18n', 'axios'], PluginData::pluginVersion(), true);
            wp_localize_script('joeee-booking-login', 'restRoute', array(
                'restURL' => rest_url(),
            ));
            $this->enqueueMemberScripts();
        }

        private function enqueueMemberScripts(): void
        {
            if (is_user_logged_in()) {
                if (is_page('Members')) {
                    wp_enqueue_script('joeee-booking-members', plugin_dir_url(__FILE__) . 'js/members.js', ['wp-element', 'wp-i18n', 'axios'], PluginData::pluginVersion(), true);
                    wp_localize_script('joeee-booking-members', 'memberData', array(
                        'restURL' => rest_url(),
                        'loggedIn' => is_user_logged_in(),
                        'restNonce' => wp_create_nonce('wp_rest'),
                        'frontendPath' => get_site_url(null, "/wp-content/plugins/joeee-booking/src/frontend/"),
                        'memberPicture' => get_option('joeee_booking_membersite_picture'),
                    ));
                }
            }
        }

        private function enqueueMemberStyles(): void
        {
            if (is_user_logged_in()) {
                if (is_page('Members')) {
                    wp_enqueue_style('joeee-booking-members', plugin_dir_url(__FILE__) . 'css/members.css', [], PluginData::pluginVersion(), 'all');
                }
            }
        }
    }
}

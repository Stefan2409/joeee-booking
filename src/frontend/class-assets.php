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
            if (defined('WP_DEBUG') && true === WP_DEBUG) {
                wp_enqueue_style('joeee-booking', plugin_dir_url(__FILE__) . 'css/style.css', [], PluginData::pluginVersion(), 'all');
                wp_enqueue_style('joeee-booking-login', plugin_dir_url(__FILE__) . 'login/build/static/css/login.css', [], PluginData::pluginVersion(), 'all');
                $this->enqueueMemberStyles();
            } else {
                wp_enqueue_style('joeee-booking', plugin_dir_url(__FILE__) . 'css/style.min.css', [], PluginData::pluginVersion(), 'all');
                wp_enqueue_style('joeee-booking-login', plugin_dir_url(__FILE__) . 'login/build/static/css/login.css', [], PluginData::pluginVersion(), 'all');
                $this->enqueueMemberStyles();
            }
        }

        /**
         * Register the JavaScript for the public-facing side of the site.
         */
        public function enqueueScripts(): void
        {
            if (defined('WP_DEBUG') && true === WP_DEBUG) {
                wp_enqueue_script('joeee-booking', plugin_dir_url(__FILE__) . 'js/script.js', ['jquery'], PluginData::pluginVersion(), false);
                wp_enqueue_script('axios', 'https://unpkg.com/axios/dist/axios.min.js', [], PluginData::pluginVersion(), false);
                wp_enqueue_script('joeee-booking-login', plugin_dir_url(__FILE__) . 'login/build/static/js/login.js', ['wp-element', 'wp-i18n'], PluginData::pluginVersion(), true);
                wp_localize_script('joeee-booking-login', 'restRoute', array(
                    'restURL' => rest_url(),
                ));
                $this->enqueueMemberScripts();
            } else {
                wp_enqueue_script('joeee-booking', plugin_dir_url(__FILE__) . 'js/script.min.js', ['jquery'], PluginData::pluginVersion(), false);
                wp_enqueue_script('axios', 'https://unpkg.com/axios/dist/axios.min.js', [], PluginData::pluginVersion(), false);
                wp_enqueue_script('joeee-booking-login', plugin_dir_url(__FILE__) . 'login/build/static/js/login.js', ['wp-element', 'wp-i18n'], PluginData::pluginVersion(), true);
                wp_localize_script('joeee-booking-login', 'restRoute', array(
                    'restURL' => rest_url(),
                ));
                $this->enqueueMemberScripts();
            }
        }

        private function enqueueMemberScripts(): void
        {
            if (is_page('Members')) {
                wp_enqueue_script('joeee-booking-members', plugin_dir_url(__FILE__) . 'js/members.js', ['wp-element', 'wp-i18n'], PluginData::pluginVersion(), true);
                wp_localize_script('joeee-booking-members', 'memberData', array(
                    'restURL' => rest_url(),
                    'loggedIn' => is_user_logged_in(),
                    'restNonce' => wp_create_nonce('wp_rest'),
                    'frontendPath' => get_site_url(null, "/wp-content/plugins/joeee-booking/src/frontend/"),
                ));
            }
        }

        private function enqueueMemberStyles(): void
        {
            if (is_page('Members')) {
                wp_enqueue_style('joeee-booking-members', plugin_dir_url(__FILE__) . 'css/members.css', [], PluginData::pluginVersion(), 'all');
            }
        }
    }
}

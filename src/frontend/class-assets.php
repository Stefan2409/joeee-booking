<?php

namespace Joeee_Booking\Frontend;

use Joeee_Booking\PluginData as PluginData;

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
            } else {
                wp_enqueue_style('joeee-booking', plugin_dir_url(__FILE__) . 'css/style.min.css', [], PluginData::pluginVersion(), 'all');
            }
        }

        /**
         * Register the JavaScript for the public-facing side of the site.
         */
        public function enqueueScripts(): void
        {
            if (defined('WP_DEBUG') && true === WP_DEBUG) {
                wp_enqueue_script('joeee-booking', plugin_dir_url(__FILE__) . 'js/script.js', ['jquery'], PluginData::pluginVersion(), false);
            } else {
                wp_enqueue_script('joeee-booking', plugin_dir_url(__FILE__) . 'js/script.min.js', ['jquery'], PluginData::pluginVersion(), false);
            }
        }
    }
}

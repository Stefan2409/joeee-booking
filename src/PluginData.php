<?php

namespace Joeee_Booking;

// Abort if this file is called directly.
if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists(PluginData::class)) {
    /**
     * The basic information about this plugin, like its texts (text domain and display name) and file locations.
     */
    class PluginData
    {

        /**
         * Get this plugin's version.
         *
         * @TODO Keep current with readme.txt header and changelog + plugin header.
         *
         * @return string
         */
        public static function pluginVersion(): string
        {
            return '1.0.0';
        }

        /**
         * Get this plugin's database version.
         *
         * @TODO Keep current with readme.txt header and changelog + class-activator.php.
         *
         * @return string
         */
        public static function pluginDbVersion(): string
        {
            return '1.0.0';
        }

        /**
         * Get this plugin's required minimum version of PHP.
         *
         * Should match composer.json's `"require": { "php":...`
         *
         * @link https://wordpress.org/about/requirements/
         * @link https://en.wikipedia.org/wiki/PHP#Release_history
         *
         * @return string
         */
        public static function requiredMinPHPVersion(): string
        {
            return '7.1.0';
        }

        /**
         * Get this plugin's text domain.
         *
         * Must match the plugin's main directory and its main PHP filename.
         *
         * @return string
         */
        public static function pluginTextDomain(): string
        {
            return 'joeee-booking';
        }

        /**
         * Get this plugin's text domain with underscores instead of hyphens.
         *
         * Used for saving options. Also useful for building namespaced hook names, class names, URLs, etc.
         *
         * @return string 'joeee_booking'
         */
        public static function pluginTextDomainUnderscores(): string
        {
            return str_replace('-', '_', self::pluginTextDomain());
        }

        /**
         * Get the plugin's display name.
         *
         * Useful for headings, for example.
         *
         * @return string
         */
        public static function getPluginDisplayName(): string
        {
            return esc_html_x("Jö's booking", "Jö's Booking Plugin", self::pluginTextDomain());
        }

        /**
         * Get this plugin's directory path, relative to this file's location.
         *
         * This file should be in `/src` and we want one level above.
         * Example: /app/public/wp-content/plugins/joeee-booking
         *
         * @return string
         */
        public static function pluginDirPath(): string
        {
            return trailingslashit(realpath(__DIR__ . DIRECTORY_SEPARATOR . '..'));
        }

        /**
         * Get this plugin's directory URL.
         *
         * Example: https://example.com/wp-content/plugins/joeee-booking
         *
         * @return string
         */
        public static function pluginDirUrl(): string
        {
            return plugin_dir_url(self::mainPluginFile());
        }

        /**
         * Get this plugin's basename.
         *
         * @return string 'joeee-booking.php'
         */
        public static function pluginBasename(): string
        {
            return plugin_basename(self::mainPluginFile());
        }

        /**
         * Get this plugin's directory relative to this file's location.
         *
         * This file should be in `/src` and we want two levels above.
         * Example: /app/public/wp-content/plugins/
         *
         * @return string
         */
        public static function allPluginsDir(): string
        {
            return trailingslashit(realpath(self::pluginDirPath() . '..'));
        }

        /**
         * Get this plugin's main plugin file.
         *
         * WARNING: Assumes the file exists - so don't make an epic fail!!!
         *
         * @return string
         */
        private static function mainPluginFile(): string
        {
            return self::pluginDirPath() . self::pluginTextDomain() . '.php';
        }
    }
}

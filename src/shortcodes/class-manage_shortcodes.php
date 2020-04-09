<?php

namespace Joeee_Booking\Shortcodes;

// Abort if this file is called directly.
if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists(ManageShortcodes::class)) {
    /**
     * Handle all the shortcodes.
     */
    class ManageShortcodes
    {
        /**
         * Shortcodes to register.
         *
         * Enter the name of each class (without namespace) from within the `Joeee_Booking\Shortcodes` namespace.
         */
        public $shortcode_classes = [
            'TKRequest',
        ];

        /**
         * Register all of the hard-coded shortcode classes.
         *
         * @see \Joeee_Booking\Shortcodes\Shortcode::register()
         */
        public function registerAllShortcodes(): void
        {
            foreach ($this->shortcode_classes as $shortcode_class) {
                $shortcode_class = __NAMESPACE__ . '\\' . $shortcode_class;

                (new $shortcode_class)->register();
            }
        }
    }
}

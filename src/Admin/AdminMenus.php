<?php

namespace Joeee_Booking\Admin;

use Joeee_Booking\Admin\Assets as Assets;

if (!class_exists(AdminMenus::class)) {
    /**
     * The admin-specific calendar menu.
     */
    class AdminMenus
    {

        public function addCalendarMenu(): void
        {
            add_menu_page(
                esc_html__("Jö's Booking", 'joeee-booking'),
                esc_html__('Booking Calendar', 'joeee-booking'),
                'manage_options',
                'joeee-booking-calendar',
                [$this, 'bookingCalendarPage'],
                'dashicons-calendar-alt',
                20
            );
        }

        /**
         * Outputs HTML for the Booking Calendar page.
         */
        public function bookingCalendarPage(): void
        {
            require_once plugin_dir_path(__FILE__) . 'templates/calendar.php';

            $Assets = new Assets();
            $Assets->enqueueScripts();
            $Assets->enqueueStyles();
        }

        /**
         * Adding sub-menu for booking extras like dinner etc.
         */
        public function addExtrasSubmenu(): void
        {
            add_submenu_page(
                'joeee-booking-calendar',
                esc_html__("Reservation Extras", 'joeee-booking'),
                esc_html__('Reservation Extras', 'joeee-booking'),
                'manage_options',
                'joeee-booking-extras',
                [$this, 'bookingExtrasPage']
            );
        }

        /**
         * Outputs HTML for the Extras page.
         */
        public function bookingExtrasPage()
        {
            require_once plugin_dir_path(__FILE__) . 'templates/extras.php';
            $Assets = new Assets();

            $Assets->enqueueScriptsExtra();
        }
    }
}

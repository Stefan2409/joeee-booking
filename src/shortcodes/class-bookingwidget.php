<?php

namespace Joeee_Booking\Shortcodes;

// Abort if this file is called directly.
if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists(BookingWidget::class)) {
    /**
     * Enables the booking widget for the frontend.
     */
    class BookingWidget
    {
        public function bookingWidgetShortcode(): String {
            return "";

        }



    }
}
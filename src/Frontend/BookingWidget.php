<?php

namespace Joeee_Booking\Frontend;
use Joeee_Booking\PluginData as PluginData;

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
        public function register()
        {
            add_action('widgets_init', array($this, 'bookingWidgetArea'));
            add_action('wp_enqueue_scripts', array($this, 'enqueueJQuery'));
            add_action('wp_footer', array($this, 'addFloatingBookingWidget'));
        }

        public function bookingWidgetArea()
        {
            register_sidebar(array(
                'name'  => 'Joeee Booking Widget Sidebar',
                'id'    => 'joeee-booking-widget-area',
                'before_widget' => '',
                'after_widget'  => '',
            ));
        }

        public function addFloatingBookingWidget()
        {
?>
            <div id="joeee-booking-widget"><?php dynamic_sidebar('joeee-booking-widget-area'); ?></div>
            <script>
                jQuery("#et-main-area").prepend(jQuery("#joeee-booking-widget"));
            </script>
<?php
        }

        public function enqueueJQuery()
        {
            wp_enqueue_style('joeee-booking-widgetstyle', plugin_dir_url(__FILE__) . 'css/widget.css', [], PluginData::pluginVersion(), 'all');
            wp_enqueue_style('joeee-booking-bookingwidgetstyle', plugin_dir_url(__FILE__) . 'css/bookingwidget.css', [], PluginData::pluginVersion(), 'all');
            wp_enqueue_script('joeee-booking-widget', plugin_dir_url(__FILE__) . 'js/bookingwidget.js', ['wp-element', 'wp-i18n', 'axios'], PluginData::pluginVersion(), true);
            wp_enqueue_script('jquery');
        }
    }
}

<?php

namespace Joeee_Booking\Core;

use \WP_Error;

// Abort if this file is called directly.
if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists(Extras::class)) {
    /**
     * The basic information about this plugin, like its texts (text domain and display name) and file locations.
     */
    class Extras
    {

        protected $table_extra;

        public function __construct()
        {
            global $wpdb;
            $this->table_extra = $wpdb->prefix . "joeee_extra";
        }

        public function getExtra($id)
        {
            global $wpdb;
            if (!isset($id)) {
                return new WP_Error("joeee-booking-extras-error", __("You have to send me an ID to get that extra!", "joeee-booking"), array('status' => 400));
            }

            $query = $wpdb->prepare("SELECT * FROM $this->table_extra WHERE id = $id;");
            $extra = $wpdb->get_row($query);

            if ($extra) {
                return $extra;
            }
            return new WP_Error("joeee-booking-extras-error", __("Error by receiving the extra.", "joeee-booking"), array('status' => 400));

        }

        public function getExtras()
        {
            global $wpdb;

            $query = "SELECT * FROM $this->table_extra;";

            $result = $wpdb->get_results($query, 'ARRAY_A');

            if (isset($result)) {

                return $result;
            }
            return new WP_Error("joeee-booking-extras-error", __("There are no extras available!", "joeee-booking"), array('status' => 400));
        }

        public function createExtra($data)
        {
            global $wpdb;

            $result = $wpdb->insert($this->table_extra, $data);

            if (!isset($result)) {
                return new WP_Error("joeee-booking-extras-error", __("There occured an error by inserting the extra!", "joeee-booking"), array('status' => 400));
            }

            return $data;

        }

        public function deleteExtra($id)
        {
            global $wpdb;

            if (empty($id)) {
                return new WP_Error('joeee_booking_extras_error', esc_html__('A valid ID is required!', 'joeee-booking'), array('status' => 400));
            }
            $delete_extra = array('id' => $id);
            $result = $wpdb->delete($this->table_extra, $delete_extra);
            if ($result == 0 || $result == false) {
                return new WP_Error('joeee_booking_extras_error', esc_html__('Error by deleting the extra.', 'joeee-booking'), array('status' => 400));
            } else {
                return array("success" => "Extra deleted.");
            }
        }

    }
}

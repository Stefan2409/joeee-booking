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

            $query = $wpdb->prepare("SELECT id, title, price, bookable FROM $this->table_extra WHERE id = $id;");
            $extra = $wpdb->get_row($query);

            if ($extra) {
                return $extra;
            }
            return new WP_Error("joeee-booking-extras-error", __("Error by receiving the extra.", "joeee-booking"), array('status' => 400));
        }

        public function getExtras()
        {
            global $wpdb;

            $query = "SELECT id, title, price, bookable FROM $this->table_extra;";

            $result = $wpdb->get_results($query, 'ARRAY_A');

            if (isset($result)) {
                return $result;
            }
            return new WP_Error("joeee-booking-extras-error", __("There are no extras available!", "joeee-booking"), array('status' => 400));
        }

        public function createExtra($data)
        {
            global $wpdb;

            $data['active'] = 1;
            $result = $wpdb->insert($this->table_extra, $data);

            if (!isset($result)) {
                return new WP_Error("joeee-booking-extras-error", __("There occured an error by inserting the extra!", "joeee-booking"), array('status' => 400));
            }

            return $data;
        }

        public function editExtra($data)
        {
            global $wpdb;
            $sql_data = array();
            $extra_id = array(
                'id'    => $data['id'],
            );
            if (isset($data['title'])) {
                $sql_data['title'] = $data['title'];
            }

            if (isset($data['price'])) {
                $sql_data['price'] = $data['price'];
            }


            if (isset($data['bookable'])) {
                $sql_data['bookable'] = $data['bookable'];
            }

            $wpdb->update($this->table_extra, $sql_data, $extra_id);
            return $data;
        }

        public function deleteExtra($id)
        {
            global $wpdb;

            if (empty($id)) {
                return new WP_Error('joeee_booking_extras_error', esc_html__('A valid ID is required!', 'joeee-booking'), array('status' => 400));
            }

            $delete_extra_id = array('id' => $id);
            $delete_extra = array(
                'active'    => 0,
                'bookable'  => 0,
            );
            $result = $wpdb->update($this->table_extra, $delete_extra, $delete_extra_id);
            if ($result == 0 || $result == false) {
                return new WP_Error('joeee_booking_extras_error', esc_html__('Error by deleting the extra.', 'joeee-booking'), array('status' => 400));
            } else {
                return array("success" => "Extra deleted.");
            }
        }
    }
}

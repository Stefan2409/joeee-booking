<?php

namespace Joeee_Booking;
use \WP_Error;


// Abort if this file is called directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( Room::class ) ) {
	/**
	 * The basic information about this plugin, like its texts (text domain and display name) and file locations.
	 */
	class Room {

        protected $room_table;

        protected $keys = ["id", "number", "floor", "capacity", "price", "active"];

        public function __construct() {
            global $wpdb;
            $this->room_table = $wpdb->prefix . "joeee_room";
        }

        public function check_data( $request ) {
            foreach( $this->keys as $key ) {
                if( !array_key_exists( $key, $request )) {
                    return new WP_Error( 'rest_forbidden', esc_html__("There are keys missing in your request. Check the room json scheme!", "joeee-booking" ), array('status' => 400));
                }
            }

            if( !(is_int($request['id']) || $request['id'] == null)) {
                return new WP_Error( 'rest_forbidden', esc_html__("The id isn't an integer. Check the room json scheme!", "joeee-booking" ), array('status' => 400));
            }

            if( !(is_string($request['number']) || $request['number'] == null)) {
                return new WP_Error( 'rest_forbidden', esc_html__("The room number isn't a string. Check the room json scheme!", "joeee-booking" ), array('status' => 400));
            }

            if( !(is_int($request['floor']) || $request['floor'] == null)) {
                return new WP_Error( 'rest_forbidden', esc_html__("The floor number isn't an integer. Check the room json scheme!", "joeee-booking", array('status' => 400) ));
            }

            if( !(is_int($request['capacity']) || $request['capacity'] == null)) {
                return new WP_Error( 'rest_forbidden', esc_html__("The capacity isn't an integer. Check the room json scheme!", "joeee-booking", array('status' => 400) ));
            }

            if( !(is_numeric($request['price']) || $request['price'] == null)) {
                return new WP_Error( 'rest_forbidden', esc_html__("The price isn't numerical. Check the room json scheme!", "joeee-booking", array('status' => 400) ));
            }

            if( !(is_bool($request['active']) || $request['active'] == null)) {
                return new WP_Error( 'rest_forbidden', esc_html__("The variable active isn't a boolean. Check the room json scheme!", "joeee-booking", array('status' => 400) ));
            }

            return true;

        }

        public function filter_data( $data ) {
            $args = array(
                'id' => array(
                    'filter' => FILTER_SANITIZE_NUMBER_INT,
                ),
                'number' => array(
                    'filter' => FILTER_SANITIZE_STRING,
                ),
                'floor' => array(
                    'filter' => FILTER_SANITIZE_NUMBER_INT,
                ),
                'capacity' => array(
                    'filter' => FILTER_SANITIZE_NUMBER_INT,
                ),
                'price' => array(
                    'filter' => FILTER_SANITIZE_NUMBER_FLOAT,
                    'flags' => FILTER_FLAG_ALLOW_FRACTION,
                ),
                'active' => array(
                    'filter' => FILTER_VALIDATE_BOOLEAN,
                ),
            );
            $filtered = filter_var_array($data, $args);
            return $filtered;
        }

        public function create_room( $request ) {
            global $wpdb;
            $validation_result = $this->check_data( $request); 
            if($validation_result === true ) {
                $filtered = $this->filter_data( $request );
                $check_room_number = $wpdb->prepare("SELECT id FROM $this->room_table WHERE number = '%s'", $filtered['number']);
                $room_number_exists = $wpdb->get_row($check_room_number, ARRAY_A);
                if($room_number_exists != null) {
                    return new WP_Error('joeee_booking_room_error', esc_html__('The room number already exists!', 'joeee-booking' ));
                }
                unset($filtered['id']);
                $wpdb->insert($this->room_table, $filtered);
                $id = $wpdb->insert_id;

                if( $id !== false ) {
                    return true;
                }
                else {
                    return new WP_Error('joeee_booking_room_error', esc_html__( 'Error by creating the new room.', 'joeee-booking' ), array('status' => 400));
                }

            }
            else {
                return $validation_result;
            }
        }

        public function get_room( $request ) {
            global $wpdb;
            $validation_result = $this->check_data( $request); 
            if($validation_result === true ) {
                $filtered = $this->filter_data( $request );
                if( empty($filtered['id']) ) {
                    return new WP_Error('joeee_booking_room_error', esc_html__( 'A valid ID is required!', 'joeee-booking'), array('status' => 400));
                }
                $query = $wpdb->prepare("SELECT id, number, floor, capacity, price, active FROM $this->room_table WHERE id = %d", array( $filtered['id']));
                $result = $wpdb->get_row($query, ARRAY_A);
                if ( empty($result)) {
                    return new WP_Error('joeee_booking_room_error', esc_html__( 'A valid ID is required!', 'joeee-booking'), array('status' => 400));
                }
                else {
                    return $result;
                }               
               
            }
            else {
                return $validation_result;
            }
            
        }

        public function get_rooms() {
            global $wpdb;

            $resource_data = array();
            $db_query = "SELECT id, number, capacity, active FROM $this->room_table";

            $query_result = $wpdb->get_results( $db_query );

            foreach( $query_result as $row ) {


                $resource_data[] = array(
                    'id'        => $row->id,
                    'title'     => $row->number,
                    'capacity'  => $row->capacity,
                );
            }

            return $resource_data;
        }

        public function delete_room( $request ) {
            global $wpdb;
            $validation_result = $this->check_data( $request); 
            if($validation_result === true ) {
                $filtered = $this->filter_data( $request );
                if( empty($filtered['id']) ) {
                    return new WP_Error('joeee_booking_room_error', esc_html__( 'A valid ID is required!', 'joeee-booking'), array('status' => 400));
                }
                $delete_room_id = array('id' => $filtered['id']);
                $result = $wpdb->delete($this->room_table ,$delete_room_id);
                if ( $result == 0 || $result == false ) {
                    return new WP_Error('joeee_booking_room_error', esc_html__( 'Error by deleting the room.', 'joeee-booking'), array('status' => 400));
                }
                else {
                    return array("success" => "Room deleted.");
                }               
               
            }
            else {
                return $validation_result;
            }
            
        }

        public function update_room( $request ) {
            global $wpdb;
            $validation_result = $this->check_data( $request); 
            if($validation_result === true ) {
                $filtered = $this->filter_data( $request );
                if( empty($filtered['id']) ) {
                    return new WP_Error('joeee_booking_room_error', esc_html__( 'A valid ID is required!', 'joeee-booking'), array('status' => 400));
                }
                $update_room_id = array('id' => $filtered['id']);
                $result = $wpdb->update($this->room_table, $filtered, $update_room_id);
                if ( $result === false ) {
                    return new WP_Error('joeee_booking_room_error', esc_html__( 'Error by updating the room.', 'joeee-booking'), array('status' => 400));
                }
                else {
                    return array("success" => "Room updated.");
                }               
               
            }
            else {
                return $validation_result;
            }
            
        }

    }
}
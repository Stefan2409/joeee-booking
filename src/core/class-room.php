<?php

namespace Joeee_Booking\Core;
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

        protected $keys = ["id", "number", "floor", "adults", "kids", "price", "active"];

        public function __construct() {
            global $wpdb;
            $this->room_table = $wpdb->prefix . "joeee_room";
        }

        public function check_data( $request, $comesfrom ) {
            if($comesfrom === 'update') {
                foreach( $this->keys as $key ) {
                if( !array_key_exists( $key, $request )) {
                        return new WP_Error( 'rest_forbidden', esc_html__("There are keys missing in your request. ($key) Check the room json scheme!", "joeee-booking" ), array('status' => 400));
                    }
                }
            }
            if( $comesfrom == "create" ) {

                if( !($request['id'] == null) ) {
                    return new WP_Error( 'rest_forbidden', esc_html__("The id is set wrong. Check the room json scheme!", "joeee-booking" ), array('status' => 400));
                }
            }

            if( $comesfrom == "update" ) {

                if( !isset( $request['id']) || !is_int( $request['id'] ) ) {
                    return new WP_Error( 'rest_forbidden', esc_html__("The id isn't an integer. Check the room json scheme!", "joeee-booking" ), array('status' => 400));
                }
            }
            if( !(is_string($request['number']) || $request['number'] == null)) {
                return new WP_Error( 'rest_forbidden', esc_html__("The room number isn't a string. Check the room json scheme!", "joeee-booking" ), array('status' => 400));
            }

            if( !(is_numeric($request['floor']) || $request['floor'] == null)) {
                $floor = $request['floor'];
                return new WP_Error( 'rest_forbidden', esc_html__("The floor number isn't an integer $floor. Check the room json scheme!", "joeee-booking", array('status' => 400) ));
            }

            if( !(is_numeric($request['adults']) || $request['adults'] == null)) {
                return new WP_Error( 'rest_forbidden', esc_html__("The number of adults isn't an integer. Check the room json scheme!", "joeee-booking", array('status' => 400) ));
            }

            if( !(is_numeric($request['kids']) || !($request['kids'] == null)) ) {
                return new WP_Error( 'rest_forbidden', esc_html__("The number of kids isn't an integer. Check the room json scheme!", "joeee-booking", array('status' => 400) ));
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
                'adults' => array(
                    'filter' => FILTER_SANITIZE_NUMBER_INT,
                ),
                'kids' => array(
                    'filter' => FILTER_SANITIZE_NUMBER_INT,
                ),
                'price' => array(
                    'filter' => FILTER_SANITIZE_NUMBER_FLOAT,
                    'flags' => FILTER_FLAG_ALLOW_FRACTION,
                ),
                'description'   => array(
                    'filter' => FILTER_SANITIZE_STRING,
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
            $validation_result = $this->check_data( $request, "create" ); 
            if($validation_result === true ) {
                $filtered = $this->filter_data( $request );
                $check_room_number = $wpdb->prepare("SELECT id FROM $this->room_table WHERE number = '%s'", $filtered['number']);
                $room_number_exists = $wpdb->get_row($check_room_number, ARRAY_A);
                if( isset($room_number_exists) ) {
                    return new WP_Error('joeee_booking_room_error', esc_html__('The room number already exists!', 'joeee-booking' ));
                }
                unset($filtered['id']);
                $wpdb->insert($this->room_table, $filtered);
                $id = $wpdb->insert_id;

                if( $id !== false ) {
                    return $filtered;
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
            $filtered = $request;
                if( empty($filtered) ) {
                    return new WP_Error('joeee_booking_room_error', esc_html__( 'A valid ID is required!', 'joeee-booking'), array('status' => 400));
                }
                $query = $wpdb->prepare("SELECT id, number, floor, adults, kids, price, description, active FROM $this->room_table WHERE id = %d", array( $filtered ));
                $result = $wpdb->get_row($query, ARRAY_A);
                if ( empty($result)) {
                    return new WP_Error('joeee_booking_room_error', esc_html__( 'There is no room with your given ID!', 'joeee-booking'), array('status' => 400));
                }
                else {
                    return $result;
                }               
               
            }
            

        public function get_rooms() {
            global $wpdb;

            $resource_data = array();
            $db_query = "SELECT * FROM $this->room_table";

            $query_result = $wpdb->get_results( $db_query );

            if( isset($query_result) ){
                foreach( $query_result as $row ) {


                    $resource_data[] = array(
                        'id'        => $row->id,
                        'title'     => $row->number,
                        'floor'     => $row->floor,
                        'adults'    => $row->adults,
                        'kids'      => $row->kids,
                        'description' => $row->description,
                        'active'    => $row->active,
                    );
                }   
            }
            return $resource_data;
            
        }
        public function delete_room( $id ) {
            global $wpdb;
             
           
              
            if( empty($id) ) {
                return new WP_Error('joeee_booking_room_error', esc_html__( 'A valid ID is required!', 'joeee-booking'), array('status' => 400));
            }
            $delete_room_id = array('id' => $id);
            $result = $wpdb->delete($this->room_table ,$delete_room_id);
            if ( $result == 0 || $result == false ) {
                return new WP_Error('joeee_booking_room_error', esc_html__( 'Error by deleting the room.', 'joeee-booking'), array('status' => 400));
            }
            else {
                return array("success" => "Room deleted.");
            }               
            
        
    
            
        }

        public function update_room( $request ) {
            global $wpdb;
            $validation_result = $this->check_data( $request, "update" ); 
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
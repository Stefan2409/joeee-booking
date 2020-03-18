<?php

namespace Joeee_Booking\Core;

use WP_Error;
use \Joeee_Booking\Core\User as User;

// Abort if this file is called directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handles all the reservation creation, modification and deletion processes.
 */

if ( ! class_exists( Reservation::class ) ) {
	/**
	 * Handles all the reservation creation, modification and deletion processes.
	 *
	 */
	class Reservation {

        protected $table_reservation;
        protected $table_room_booked;
        protected $table_reservation_extra;
        protected $table_extra;
        protected $table_person;
        protected $table_room;
        protected $table_fellow;

        public function __construct() {
            global $wpdb;
            $this->table_reservation = $wpdb->prefix . "joeee_reservation";
            $this->table_room_booked = $wpdb->prefix . "joeee_room_booked";
            $this->table_reservation_extra = $wpdb->prefix . "joeee_reservation_extra";
            $this->table_extra = $wpdb->prefix . "joeee_extra";
            $this->table_person = $wpdb->prefix . "joeee_person";
            $this->table_room = $wpdb->prefix . "joeee_room";
            $this->table_fellow = $wpdb->prefix . "joeee_fellow_traveler";
        }
        
        public function create_reservation( $data ) {
            global $wpdb;

            if( count( $data['room_id'] ) == 0 ) {
                return new WP_Error( 'joeee_booking_reservation_error', esc_html__( 'You have to give me a room id!', 'joeee-booking'), array('status' => 400));
            }
            if( count($data['person_id']) == 0 ) {
                return new WP_Error( 'joeee_booking_reservation_error', esc_html__( 'You have to give me a user id!', 'joeee-booking'), array('status' => 400));
            }

            

            if( count($data['person_id']) == 1 && ($data['adults'] + $data['kids']) > 1 ) {
                $person_ids = array();
                $number_persons = $data['adults'] + $data['kids'];
                $booker_id = $data['person_id'][0];
                $booker = $wpdb->get_row("SELECT * FROM $this->table_person WHERE id = $booker_id", ARRAY_A);
                $new_user_data['first_name'] = "Guest";
                $new_user_data['last_name'] = $booker['last_name'];
                $new_user_data['birthday']  = NULL;
                $new_user_data['nationality'] = $booker['nationality_id'];
                $new_user_data['tin'] = NULL;
                $new_user_data['street'] = "";
                $new_user_data['zip'] = "";
                $new_user_data['city'] = "";
                $new_user_data['gender'] = 1;
                $new_user_data['country'] = $booker['nationality_id'];
                $new_user_data['email'] = "";
                $User = new User();
                for($i = 0; $i < $number_persons - 1; $i++ ) {
                    $user = $User->create_user( $new_user_data );
                    if( is_wp_error($user) ) {
                        return $user;
                    }
                    array_push($person_ids, $user['id']);
                }
                $reservation_data = array(
                    'person_id' => $booker_id,
                    'confirmation' => $data['confirmation'],
                );

                $wpdb->insert( $this->table_reservation, $reservation_data, array('%d', '%d') );
                $reservation_id = $wpdb->insert_id;
                $booked_from = $data['booked_from'];
                $booked_to = $data['booked_to'];

                foreach( $data['room_id'] as $room ) {
                    $room_price = $wpdb->get_var( "SELECT price FROM $this->table_room WHERE id = $room" );
                    $room_booked_data = array(
                        'room_id'           => $room,
                        'reservation_id'    => $reservation_id,
                        'booked_from'       => $booked_from,
                        'booked_to'         => $booked_to,
                        'price'             => $room_price,   
                    );

                    

                    $room_booked_check = $wpdb->insert( $this->table_room_booked, $room_booked_data, array('%d', '%d', '%s', '%s', '%f') );

                    if( !$room_booked_check ) {
                        return new WP_Error( 'joeee_booking_reservation_error', esc_html__( 'There occured an error by saving the reserved room.', 'joeee-booking'), array('status' => 400));
                    }

                }

                foreach( $person_ids as $fellow ) {
                    $fellow_check = $wpdb->insert( $this->table_fellow, array('reservation_id' => $reservation_id, 'person_id' => $fellow), array( '%d', '%d' ));
                    if( !$fellow_check ) {
                        return new WP_Error( 'joeee_booking_reservation_error', esc_html__( 'There occured errors by creating the fellow travelers reservations!', 'joeee-booking'), array('status' => 400));
                    }
                }
                $extras = $data['extras'];
                $extra_keys = array_keys($data['extras']);
                foreach( $extra_keys as $key ) {
                    $extra_check = $wpdb->insert( $this->table_reservation_extra, array('reservation_id' => $reservation_id, 'extra_id' => $key, 'count' => $extras[$key]), array('%d', '%d', '%d') );
                    if( !$extra_check ) {
                        return new WP_Error( 'joeee_booking_reservation_error', esc_html__( 'There occured errors by creating the reservation extras!', 'joeee-booking'), array('status' => 400));
                    }


                }
                

            }
            return $data;
        }


        public function modify_reservation($reservation_id) {

        }

        public function delete_reservation($reservation_id) {

        }

        public function confirm_reservation($reservation_id) {

        }

        public function get_reservation($search_pattern) {

        }

        public function get_reservations() {
            global $wpdb;
            
            $sql = "SELECT rb.reservation_id, rb.room_id, rb.booked_from, rb.booked_to, r.confirmation, p.first_name, p.last_name FROM $this->table_room_booked rb
            JOIN $this->table_reservation r on r.id = rb.reservation_id
            JOIN $this->table_person p on p.id = r.person_id
            WHERE booked_from >= MAKEDATE(YEAR(CURRENT_DATE()),DAYOFYEAR(CURRENT_DATE())-DAYOFMONTH(CURRENT_DATE())+1);";

            $query_result = $wpdb->get_results($sql);
            $result = array();
            foreach( $query_result as $reservation ) {
                $confirm = function(int $argument) {
                                switch( $argument ) {
                                case 1:
                                    return "green";
                                    break;
                                case 2:
                                    return "orange";
                                    break;
                                case 3:
                                    return "red";
                                    break;
                            }
                        };
                
                $result[] = array(
                    'id'            => $reservation->reservation_id,
                    'resourceId'    => $reservation->room_id,
                    'title'         => $reservation->first_name . ' ' . $reservation->last_name,
                    'start'         => $reservation->booked_from,
                    'end'           => $reservation->booked_to,
                    'color'         => $confirm( $reservation->confirmation ),
                );
            }

            return $result;

        }
    
    }
}
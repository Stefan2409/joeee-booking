<?php

namespace Joeee_Booking\Core;

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

        public function __construct() {
            global $wpdb;
            $this->table_reservation = $wpdb->prefix . "joeee_reservation";
            $this->table_room_booked = $wpdb->prefix . "joeee_room_booked";
            $this->table_reservation_extra = $wpdb->prefix . "joeee_reservation_extra";
            $this->table_extra = $wpdb->prefix . "joeee_extra";
            $this->table_person = $wpdb->prefix . "joeee_person";
        }
        
        public function create_reservation( $data ) {
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
            
            $sql = "SELECT rb.reservation_id, rb.room_id, rb.booked_from, rb.booked_to, rb.confirmation, p.first_name, p.last_name FROM $this->table_room_booked rb
            JOIN $this->table_reservation r on r.id = rb.reservation_id
            JOIN $this->table_person p on p.id = r.person_id
            LEFT JOIN $this->table_reservation_extra re on re.reservation_id = r.id
            LEFT JOIN $this->table_extra e on e.id = re.extra_id
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
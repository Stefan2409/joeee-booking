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
        
        public function create_reservation($person_id, $room_id, $booked_from, $booked_to, $persons) {
            exit;
        }


        public function modify_reservation($reservation_id) {

        }

        public function delete_reservation($reservation_id) {

        }

        public function confirm_reservation($reservation_id) {

        }

        public function search_for_reservation($search_pattern) {

        }
    
    }
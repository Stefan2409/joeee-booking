<?php

namespace Joeee_Booking\Core;

// Abort if this file is called directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handles all the User creation, modification and deletion processes.
 */

if ( ! class_exists( User::class ) ) {
	/**
	 * Handles all the User creation, modification and deletion processes.
	 *
	 */
	class User {
        public function create_user($first_name, $last_name, $gender, $birth_date, $nationality_id, $address=[]) {
            
        }


        public function modify_user($User_id) {

        }

        public function delete_user($User_id) {

        }

        public function confirm_user($User_id) {

        }

        public function search_for_User($search_pattern) {

        }
    
    }
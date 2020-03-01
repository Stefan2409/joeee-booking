<?php

namespace Joeee_Booking\Core;

use \WP_Error;

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
              

        
        public function create_user( $data ) {
            global $wpdb;
            $table_person = $wpdb->prefix . "joeee_person";
            $table_address = $wpdb->prefix . "joeee_address";
            $username = "";
            $firstname = $data['first_name'];
            $lastname = $data['last_name'];
            $birthday = $data['birthday'];
            $nationality = $data['nationality'];
            $tin = $data['tin'];
            $street = $data['street'];
            $zip = $data['zip'];
            $city = $data['city'];
            $country = $data['country'];
            $gender = $data['gender'];

            $email = $data['email'];
            
            $user_id = email_exists( $email );

            if( $user_id ) {
                return new WP_Error("joeee-booking-user-error", "A user with the E-Mail: $email already exists.");
            }
            else {
                if ( $email != "") {
                    $username = $email;
                }
                else {
                    $username = str_replace(" ", "", $firstname) + str_replace( " ", "", $lastname );
                }
                $password = wp_generate_password( $length = 12 );

                $userdata = array(
                    'user_pass'     => $password,
                    'user_login'    => $username,
                    'user_email'    => $email,
                    'first_name'    => $firstname,
                    'last_name'     => $lastname,
                    'show_admin_bar_front' => 0,
                );

                $user_id = wp_insert_user( $userdata );
                $data['user_id'] = $user_id;


                $create_address = array(
                    "user_id"       => $user_id,
                    "tin"           => $tin,
                    "street"        => $street,
                    "zip"           => $zip,
                    "city"          => $city,
                    "state_id"      => $country,
                );

                $address_fields = array('%d', '%s', '%s', '%s', '%s', '%d');

                $address_created = $wpdb->insert( $table_address, $create_address, $address_fields );

                if ( $address_created ) {
                    $address_id = $wpdb->insert_id;
                }
                else {
                    return new WP_Error('joeee-booking-address', __('The given address cannot be created.', 'joeee-booking') );
                }

                $create_person = array(
                    "user_id"       => $user_id,
                    "first_name"    => $firstname,
                    "last_name"     => $lastname,
                    "gender"        => $gender,
                    "address_id"    => $address_id,
                    "birth"         => $birthday,
                    "nationality_id" => $nationality,
                );

                $person_fields = array('%d', '%s', '%s', '%d', '%d', '%s', '%d');

                $person_created = $wpdb->insert( $table_person, $create_person, $person_fields);
            
                if( $person_created !== 1 ) {
                    return new WP_Error('joeee-booking-person-error', __('Error by creating the user.', 'joeee-booking'));
                }
                $data['id'] = $wpdb->insert_id;
                 
            }

            return $data;
            
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
}
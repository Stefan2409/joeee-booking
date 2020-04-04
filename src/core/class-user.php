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
        protected $table_person;
        protected $table_address;
        protected $table_users;
        protected $table_country;

        public function __construct() {
            global $wpdb;
            $this->table_person = $wpdb->prefix . "joeee_person";
            $this->table_address = $wpdb->prefix . "joeee_address";
            $this->table_users = $wpdb->prefix . "users";
            $this->table_country = $wpdb->prefix . "joeee_country";

        }

              

        
        public function create_user( $data ) {
            global $wpdb;

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
                return new WP_Error("joeee-booking-user-error", esc_html__("A user with the E-Mail: $email already exists.", 'joeee-booking'), array('status' => 400) );
            }
            else {
                if ( $email != "") {
                    $username = $email;
                    $password = wp_generate_password( $length = 12 );
                    $userdata = array(
                        'user_pass'     => $password,
                        'user_login'    => $username,
                        'user_email'    => $email,
                        'first_name'    => $firstname,
                        'last_name'     => $lastname,
                    );
    
                    $user_id = wp_insert_user( $userdata );


                }

                if( !$user_id ) {
                    $user_id = NULL;
                }

                


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

                $address_created = $wpdb->insert( $this->table_address, $create_address, $address_fields );

                if ( $address_created ) {
                    $address_id = $wpdb->insert_id;
                }
                else {
                    return new WP_Error('joeee-booking-address', esc_html__('The given address cannot be created.', 'joeee-booking'), array('status' => 400) );
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

                $person_created = $wpdb->insert( $this->table_person, $create_person, $person_fields);
            
                if( $person_created !== 1 ) {
                    return new WP_Error('joeee-booking-person-error', esc_html__('Error by creating the user.', 'joeee-booking'), array('status' => 400) );
                }
                $data['id'] = $wpdb->insert_id;
                 
            }

            return $data;
            
        }

        public function get_users() {
            global $wpdb;            

            $sql = "SELECT person.user_id, user.user_email, person.first_name, person.last_name, gender, birth, nationality_id, tin, street, zip, city, state_id FROM $this->table_person person
            LEFT JOIN $this->table_users user ON person.user_id = user.ID
            LEFT JOIN $this->table_address address ON person.address_id = address.id
            LEFT JOIN $this->table_country country ON address.state_id = country.id";
            $result = $wpdb->get_results( $sql );

            return $result;
        }

        public function get_user( $person_id ) {
            global $wpdb;
 
            $sql = "SELECT person.user_id, user.user_email, person.first_name, person.last_name, gender, birth, nationality_id, tin, street, zip, city, state_id FROM $this->table_person person
            LEFT JOIN $this->table_users user ON person.user_id = user.ID
            LEFT JOIN $this->table_address address ON person.address_id = address.id
            LEFT JOIN $this->table_country country ON address.state_id = country.id
            WHERE person.id = $person_id";
            $result = $wpdb->get_results( $sql );

            if( empty($result) ) {
                return new WP_Error('joeee-booking-user-error', esc_html__( "The user with ID: $user_id does not exist!", 'joeee-booking' ), array('status' => 400) );
            }

            return $result;

        }


        public function update_user( $data ) {
            global $wpdb;
            if( empty( $data['id'] ) ) {
                return new WP_Error('joeee-booking-user-error', esc_html__( "You have to send an user id to update the user profile!", 'joeee-booking' ) );
            }
            $u_id = $data['id'];


            $user_id = array(
                'user_id' => $data['id'],
            );
            $update_address = array(
                "tin"           => $data['tin'],
                "street"        => $data['street'],
                "zip"           => $data['zip'],
                "city"          => $data['city'],
                "state_id"      => $data['country'],
            );
            $address_fields = array('%s', '%s', '%s', '%s', '%d');

            $update_user = array(
                'ID'            => $u_id,
                'user_email'    => $data['email'],
                'first_name'    => $data['first_name'],
                'last_name'     => $data['last_name'],
            );

            $update_person = array(
                "first_name"    => $data['first_name'],
                "last_name"     => $data['last_name'],
                "gender"        => $data['gender'],
                "birth"         => $data['birthday'],
                "nationality_id" => $data['nationality'],
            );

            $person_fields = array('%s', '%s', '%d', '%s', '%d');
            
            
            $address_return = $wpdb->update( $this->table_address, $update_address, $user_id, $address_fields, array('%d') );
            if( $address_return === false ) {
                return new WP_Error('joeee-booking-user-error', esc_html__( "Error on updating the address for user ID: $u_id.", 'joeee-booking' ), array('status' => 400));
            }

            $user_return = wp_update_user( $update_user );
            if( is_wp_error( $user_return ) ) {
                return new WP_Error('joeeee-booking-user-error', $user_return, array('status' => 400) );
            }

            $person_return = $wpdb->update( $this->table_person, $update_person, $user_id, $person_fields, array('%d'));
            if( $person_return === false ) {
                return new WP_Error('joeee-booking-user-error', esc_html__( "Error on updating person data for user ID: $u_id.", 'joeee-booking' ), array('status' => 400));
            }
            return $data;

        }

        public function delete_user($User_id) {

        }

        public function confirm_user($User_id) {

        }

        public function search_for_User($search_pattern) {

        }
    
    }
}
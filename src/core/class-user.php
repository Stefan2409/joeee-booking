<?php

namespace Joeee_Booking\Core;

use \WP_Error;

// Abort if this file is called directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Handles all the User creation, modification and deletion processes.
 */

if (!class_exists(User::class)) {
    /**
     * Handles all the User creation, modification and deletion processes.
     *
     */
    class User
    {
        protected $table_person;
        protected $table_address;
        protected $table_users;
        protected $table_country;

        public function __construct()
        {
            global $wpdb;
            $this->table_person = $wpdb->prefix . "joeee_person";
            $this->table_address = $wpdb->prefix . "joeee_address";
            $this->table_users = $wpdb->prefix . "users";
            $this->table_country = $wpdb->prefix . "joeee_country";
        }

        public function createWpUser($data)
        {
            $username = "";
            $firstname = $data['first_name'];
            $lastname = $data['last_name'];
            $email = $data['email'];
            $username = $email;
            $password = wp_generate_password($length = 12);
            $userdata = array(
                'user_pass' => $password,
                'user_login' => $username,
                'user_email' => $email,
                'first_name' => $firstname,
                'last_name' => $lastname,
                'show_admin_bar_front' => 'false',
                'role' => 'subscriber',
            );

            $user_id = wp_insert_user($userdata);
            return $user_id;
        }

        public function getUserEmails($data)
        {
            global $wpdb;
            $term = $data['term'];

            $query = "SELECT user_email FROM $this->table_users WHERE user_email LIKE '$term%'";
            $query_result = $wpdb->get_results($wpdb->prepare($query), ARRAY_A);

            if ($query_result === null) {
                return array();
            }
            $result = array();
            foreach ($query_result as $email) {
                array_push($result, $email['user_email']);
            }
            return $result;
        }

        public function getUserByEmail($data)
        {
            global $wpdb;
            $email = $data['email'];
            $user_id = email_exists($email);
            $sql = "SELECT id FROM $this->table_person WHERE user_id = $user_id;";

            $person_id = $wpdb->get_var($sql);

            $result = $this->getUser($person_id);
            return $result;
        }

        public function login($credentials)
        {
            $credentials['remember'] = false;

            $user_signon = wp_signon($credentials, is_ssl());

            if (is_wp_error($user_signon)) {
                return new WP_Error("joeee-booking-user-error", esc_html__("Login error!", 'joeee-booking'), array('status' => 401));
            } else {
                return true;
            }
        }

        public function createUser($data)
        {
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
            if (isset($data['email'])) {
                $email = $data['email'];
            } else {
                $email = "";
            }

            $user_id = email_exists($email);

            if ($user_id !== false && !current_user_can('manage_options')) {
                return new WP_Error("joeee-booking-user-error", esc_html__("A user with the E-Mail: $email already exists.", 'joeee-booking'), array('status' => 400));
            }
            if ($user_id !== false && current_user_can('manage_options')) {
                $get_person_id_query = "SELECT id FROM $this->table_person WHERE user_id = $user_id";
                $person_id_result = $wpdb->get_var($wpdb->prepare($get_person_id_query));
                if ($person_id_result !== null) {
                    $data['id'] = $person_id_result;
                    return $data;
                }
            } else {
                if ($email != "") {
                    $user_id = $this->createWpUser($data);
                }

                if (!$user_id) {
                    $user_id = null;
                }

                $data['user_id'] = $user_id;

                $create_address = array(
                    "user_id" => $user_id,
                    "tin" => $tin,
                    "street" => $street,
                    "zip" => $zip,
                    "city" => $city,
                    "state_id" => $country,
                );

                $address_fields = array('%d', '%s', '%s', '%s', '%s', '%d');

                $address_created = $wpdb->insert($this->table_address, $create_address, $address_fields);

                if ($address_created) {
                    $address_id = $wpdb->insert_id;
                } else {
                    return new WP_Error('joeee-booking-address', esc_html__('The given address cannot be created.', 'joeee-booking'), array('status' => 400));
                }

                $create_person = array(
                    "user_id" => $user_id,
                    "first_name" => $firstname,
                    "last_name" => $lastname,
                    "gender" => $gender,
                    "address_id" => $address_id,
                    "birth" => $birthday,
                    "nationality_id" => $nationality,
                );

                $person_fields = array('%d', '%s', '%s', '%d', '%d', '%s', '%d');

                $person_created = $wpdb->insert($this->table_person, $create_person, $person_fields);

                if ($person_created !== 1) {
                    return new WP_Error('joeee-booking-person-error', esc_html__('Error by creating the user.', 'joeee-booking'), array('status' => 400));
                }
                $data['id'] = $wpdb->insert_id;
            }
            // Logs the user in if he isn't a user with user creation privileges.
            if ($user_id && !current_user_can('upload_files')) {
                $current_user = get_user_by('id', $user_id);
                wp_set_auth_cookie($user_id, true, is_ssl());
            }

            return $data;
        }

        public function getUsers()
        {
            global $wpdb;

            $sql = "SELECT person.user_id, user.user_email, person.first_name, person.last_name, gender, birth, nationality_id, tin, street, zip, city, state_id FROM $this->table_person person
            LEFT JOIN $this->table_users user ON person.user_id = user.ID
            LEFT JOIN $this->table_address address ON person.address_id = address.id
            LEFT JOIN $this->table_country country ON address.state_id = country.id";
            $result = $wpdb->get_results($sql);

            return $result;
        }

        public function getUser($person_id)
        {
            global $wpdb;

            $sql = "SELECT person.user_id, user.user_email, person.first_name, person.last_name, gender, birth, nationality_id, tin, street, zip, city, state_id FROM $this->table_person person
            LEFT JOIN $this->table_users user ON person.user_id = user.ID
            LEFT JOIN $this->table_address address ON person.address_id = address.id
            LEFT JOIN $this->table_country country ON address.state_id = country.id
            WHERE person.id = $person_id";
            $result = $wpdb->get_results($sql);

            if (empty($result)) {
                return new WP_Error('joeee-booking-user-error', esc_html__("The user with ID: $user_id does not exist!", 'joeee-booking'), array('status' => 400));
            }

            return $result;
        }

        public function updateUser($data)
        {
            global $wpdb;
            if (empty($data['id'])) {
                return new WP_Error('joeee-booking-user-error', esc_html__("You have to send an user id to update the user profile!", 'joeee-booking'), array('status' => 400));
            }
            $person_id = $data['id'];
            $user_id = $wpdb->get_var("SELECT user_id FROM $this->table_person WHERE id = $person_id");

            $address_id = $wpdb->get_var("SELECT address_id FROM $this->table_person WHERE id = $person_id");

            $current_email = $wpdb->get_var("SELECT user_email FROM $this->table_users WHERE id = $user_id");
            $address = array(
                'id' => $address_id,
            );

            $p_id = array(
                'id' => $person_id,
            );
            if (isset($user_id)) {
                $u_id = array(
                    'ID' => $user_id,
                );

                $update_user = array(
                    'ID' => $user_id,
                    'first_name' => $data['first_name'],
                    'last_name' => $data['last_name'],
                    'user_email' => $data['email'],
                );

                $update_login = array(
                    'user_login' => $data['email'],
                );

                $user_return = wp_update_user($update_user);
                if (is_wp_error($user_return)) {
                    return new WP_Error('joeeee-booking-user-error', $user_return, array('status' => 400));
                }

                $login_check = $wpdb->update($this->table_users, $update_login, $u_id);

                if ($login_check === false) {
                    return new WP_Error('joeee-booking-user-error', esc_html__("Error by updating the user login name.", 'joeee-booking'), array('status' => 400));
                }
            }

            if (!isset($current_email) && $data['email'] != "") {
                $user_id = $this->create_wp_user($data);
                if (is_wp_error($user_id)) {
                    return $user_id;
                }
                $u_id = array(
                    'user_id' => $user_id,
                );

                $wpdb->update($this->table_person, $u_id, $p_id);
                $wpdb->update($this->table_address, $u_id, $address);
            }

            $update_address = array(
                "tin" => $data['tin'],
                "street" => $data['street'],
                "zip" => $data['zip'],
                "city" => $data['city'],
                "state_id" => $data['country'],
            );
            $address_fields = array('%s', '%s', '%s', '%s', '%d');

            $update_person = array(
                "first_name" => $data['first_name'],
                "last_name" => $data['last_name'],
                "gender" => $data['gender'],
                "birth" => $data['birthday'],
                "nationality_id" => $data['nationality'],
            );

            $person_fields = array('%s', '%s', '%d', '%s', '%d');

            $address_return = $wpdb->update($this->table_address, $update_address, $address, $address_fields, array('%d'));
            if ($address_return === false) {
                return new WP_Error('joeee-booking-user-error', esc_html__("Error on updating the address for user ID: $p_id.", 'joeee-booking'), array('status' => 400));
            }

            $person_return = $wpdb->update($this->table_person, $update_person, $p_id, $person_fields, array('%d'));
            if ($person_return === false) {
                return new WP_Error('joeee-booking-user-error', esc_html__("Error on updating person data for user ID: $p_id.", 'joeee-booking'), array('status' => 400));
            }
            return $data;
        }

        public function deleteUser($User_id)
        {
        }

        public function confirmUser($User_id)
        {
        }

        public function searchForUser($search_pattern)
        {
        }
    }
}

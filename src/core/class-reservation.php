<?php

namespace Joeee_Booking\Core;

use WP_Error;
use \Joeee_Booking\Core\User as User;

// Abort if this file is called directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Handles all the reservation creation, modification and deletion processes.
 */

if (!class_exists(Reservation::class)) {
    /**
     * Handles all the reservation creation, modification and deletion processes.
     *
     */
    class Reservation
    {

        protected $table_reservation;
        protected $table_room_booked;
        protected $table_reservation_extra;
        protected $table_extra;
        protected $table_person;
        protected $table_room;
        protected $table_fellow;
        protected $table_address;
        protected $table_users;

        public function __construct()
        {
            global $wpdb;
            $this->table_reservation = $wpdb->prefix . "joeee_reservation";
            $this->table_room_booked = $wpdb->prefix . "joeee_room_booked";
            $this->table_reservation_extra = $wpdb->prefix . "joeee_reservation_extra";
            $this->table_extra = $wpdb->prefix . "joeee_extra";
            $this->table_person = $wpdb->prefix . "joeee_person";
            $this->table_room = $wpdb->prefix . "joeee_room";
            $this->table_fellow = $wpdb->prefix . "joeee_fellow_traveler";
            $this->table_address = $wpdb->prefix . "joeee_address";
            $this->table_users = $wpdb->prefix . "users";
        }

        /**
         * Creates the additional fellow travelers persons
         * @param int $number_persons
         * @param array $booker
         *
         * @return array or wp_error
         */
        public function createFellows($number_persons, $booker)
        {
            $person_ids = array();
            $new_user_data['first_name'] = "Guest";
            $new_user_data['last_name'] = $booker['last_name'];
            $new_user_data['birthday'] = null;
            $new_user_data['nationality'] = $booker['nationality_id'];
            $new_user_data['tin'] = null;
            $new_user_data['street'] = "";
            $new_user_data['zip'] = "";
            $new_user_data['city'] = "";
            $new_user_data['gender'] = 1;
            $new_user_data['country'] = $booker['nationality_id'];
            $new_user_data['email'] = "";
            $User = new User();
            for ($i = 0; $i < $number_persons - 1; $i++) {
                $user = $User->createUser($new_user_data);
                if (is_wp_error($user)) {
                    return $user;
                }
                array_push($person_ids, $user['id']);
            }
            return $person_ids;
        }

        protected function resetDatabaseAfterError($reservation_id)
        {
            $wpdb->delete($this->table_room_booked, array('reservation_id' => $reservation_id));
            $wpdb->delete($this->table_reservation, array('id' => $reservation_id));
            $wpdb->delete($this->table_fellow, array('reservation_id' => $reservation_id));
            $wpdb->delete($this->table_reservation_extra, array('reservation_id' => $reservation_id));
        }

        protected function createExtras($extras, $reservation_id)
        {
            global $wpdb;
            $extra_keys = array_keys($extras);
            foreach ($extra_keys as $key) {
                $extras_key_exists = $wpdb->get_var("SELECT count FROM $this->table_reservation_extra WHERE reservation_id = $reservation_id AND extra_id = $key");

                $extra_price = $wpdb->get_var("SELECT price FROM $this->table_extra WHERE id = $key");

                if ($extras_key_exists === null) {
                    $insert_extras = array(
                        'reservation_id'    => $reservation_id,
                        'extra_id'          => $key,
                        'count'             => $extras[$key],
                        'price'             => $extra_price,
                    );
                    $extra_check = $wpdb->insert($this->table_reservation_extra, $insert_extras, array('%d', '%d', '%d', '%f'));
                    if (!$extra_check) {
                        return new WP_Error('joeee_booking_reservation_error', esc_html__('There occured errors by creating the reservation extras! Please try again!', 'joeee-booking'), array('status' => 400));
                    }
                } else {
                    $extra_check = $wpdb->update($this->table_reservation_extra, array('count' => $extras[$key]), array('reservation_id' => $reservation_id, 'extra_id' => $key));
                    if ($extra_check === false) {
                        return new WP_Error('joeee_booking_reservation_error', esc_html__('There occured errors by modifying the reservation extras! Please try again!', 'joeee-booking'), array('status' => 400));
                    }
                }
            }
        }

        public function createReservation($data)
        {
            global $wpdb;

            if (count($data['room_id']) == 0) {
                return new WP_Error('joeee_booking_reservation_error', esc_html__('You have to give me a room id!', 'joeee-booking'), array('status' => 400));
            }
            if (count($data['person_id']) == 0) {
                return new WP_Error('joeee_booking_reservation_error', esc_html__('You have to give me a user id!', 'joeee-booking'), array('status' => 400));
            }

            $booker_id = $data['person_id'][0];
            $booker = $wpdb->get_row("SELECT * FROM $this->table_person WHERE id = $booker_id", ARRAY_A);
            $number_persons = $data['adults'] + $data['kids'];
            $person_ids = $data['person_id'];
            unset($person_ids[0]);
            if (count($data['person_id']) == 1 && $number_persons > 1) {
                $person_ids = $this->createFellows($number_persons, $booker);

                if (is_wp_error($person_ids)) {
                    return $person_ids;
                }
            }

            $reservation_data = array(
                'person_id' => $booker_id,
                'confirmation' => $data['confirmation'],
                'adults' => $data['adults'],
                'kids' => $data['kids'],
            );

            $reservation_check = $wpdb->insert($this->table_reservation, $reservation_data, array('%d', '%d', '%d', '%d'));
            if (!$reservation_check) {
                return new WP_Error('joeee_booking_reservation_error', esc_html__('There occured an error by saving the reservation.', 'joeee-booking'), array('status' => 400));
            }
            $reservation_id = $wpdb->insert_id;
            $booked_from = $data['booked_from'];
            $booked_to = $data['booked_to'];

            foreach ($data['room_id'] as $room) {
                $room_price = $wpdb->get_var("SELECT price FROM $this->table_room WHERE id = $room");
                $room_booked_data = array(
                    'room_id' => $room,
                    'reservation_id' => $reservation_id,
                    'booked_from' => $booked_from,
                    'booked_to' => $booked_to,
                    'price' => $room_price,
                );

                $room_booked_check = $wpdb->insert($this->table_room_booked, $room_booked_data, array('%d', '%d', '%s', '%s', '%f'));

                if (!$room_booked_check) {
                    $this->resetDatabaseAfterError($reservation_id);
                    return new WP_Error('joeee_booking_reservation_error', esc_html__('There occured an error by saving the reserved room. Please try again!', 'joeee-booking'), array('status' => 400));
                }
            }

            if (isset($person_ids) && $number_persons > 1) {
                foreach ($person_ids as $fellow) {
                    $fellow_check = $wpdb->insert($this->table_fellow, array('reservation_id' => $reservation_id, 'person_id' => $fellow), array('%d', '%d'));
                    if (!$fellow_check) {
                        $this->resetDatabaseAfterError($reservation_id);
                        return new WP_Error('joeee_booking_reservation_error', esc_html__('There occured errors by creating the fellow travelers reservations. Please try again!', 'joeee-booking'), array('status' => 400));
                    }
                }
            }
            $extras = $data['extras'];

            if (isset($extras)) {
                $extras_check = $this->createExtras($extras, $reservation_id);

                if (is_wp_error($extras_check)) {
                    $this->resetDatabaseAfterError($reservation_id);
                    return $extras_check;
                }
            }

            return $data;
        }

        public function getFellowIds($reservation_id)
        {
            global $wpdb;

            $sql = "SELECT * FROM $this->table_fellow WHERE reservation_id = $reservation_id";

            $sql_result = $wpdb->get_results($sql, ARRAY_A);
            $result = array();
            foreach ($sql_result as $fellow) {
                array_push($result, $fellow['person_id']);
            }

            return $result;
        }

        public function modifyReservation($data)
        {
            global $wpdb;

            $reservation_id = $data['id'];
            $booked_from = $data['booked_from'];
            $booked_to = $data['booked_to'];
            if (isset($data['adults'])) {
                $adults = $data['adults'];
            }
            if (isset($data['kids'])) {
                $kids = $data['kids'];
            }
            $room_id = $data['room_id'];
            if (isset($data['confirmation'])) {
                $confirmation = $data['confirmation'];
            }
            if (isset($data['extras'])) {

                $extras = $data['extras'];
            }
            if (isset($data['person_id'])) {
                $person_id = $data['person_id'][0];
            }

            if (isset($adults)) {
                $old_reservation_sql = $this->getRoomReservation($reservation_id, $room_id)[0];

                $persons = $adults + $kids;

                $kids_old = $old_reservation_sql['kids'];
                $adults_old = $old_reservation_sql['adults'];

                $persons_old = $kids_old + $adults_old;

                // This if clause creates the new guests if the # of persons is raised.
                if ($persons > $persons_old) {
                    $User = new User();

                    $booker_object = $User->getUser($person_id)[0];

                    $booker = array();
                    $booker['last_name'] = $booker_object->last_name;
                    $booker['nationality_id'] = $booker_object->nationality_id;

                    $fellow_persons_new = $persons - $persons_old;

                    $fellow_result = $this->createFellows($fellow_persons_new + 1, $booker);

                    if (is_wp_error($fellow_result)) {
                        return $fellow_result;
                    }
                    foreach ($fellow_result as $fellow) {
                        $fellow_check = $wpdb->insert($this->table_fellow, array('reservation_id' => $reservation_id, 'person_id' => $fellow), array('%d', '%d'));
                        if (!$fellow_check) {
                            return new WP_Error('joeee_booking_reservation_error', esc_html__('There occured errors by creating the new fellow travelers reservations. Please try again!', 'joeee-booking'), array('status' => 400));
                        }
                    }
                }

                // This if clause deletes the reservation of persons if the person number is lowered.
                if ($persons < $persons_old) {
                    $fellow_remove = $persons_old - $persons;

                    $fellow_ids = $this->getFellowIds($reservation_id);

                    for ($i = 0; $i < $fellow_remove; $i++) {
                        $remove_data = array(
                            'reservation_id' => $reservation_id,
                            'person_id' => $fellow_ids[$i],
                        );
                        $fellow_remove_result = $wpdb->delete($this->table_fellow, $remove_data, array('%d', '%d'));

                        if ($fellow_remove_result === false) {
                            return new WP_Error('joeee-booking-reservation', __('There occured errors during the fellow deletion.', 'joeee-booking'), array('status' => 400));
                        }
                    }
                }

                $res_id = array(
                    'id' => $reservation_id,
                );

                $reservation_modify = array(
                    'confirmation' => $confirmation,
                    'adults' => $adults,
                    'kids' => $kids,
                );

                $reservation_modify_result = $wpdb->update($this->table_reservation, $reservation_modify, $res_id, array('%d', '%d', '%d'));

                if ($reservation_modify_result === false) {
                    return new WP_Error('joeee-booking-reservation', __('An error occured during the reservation table modification.', 'joeee-booking'), array('status' => 400));
                }
            }

            $room_booked_modify = array(
                'booked_from' => $booked_from,
                'booked_to' => $booked_to,
            );

            $room_booked_modify_where = array(
                'reservation_id' => $reservation_id,
                'room_id' => $room_id,
            );

            if (isset($data['new_room_id'])) {
                $new_room_id = $data['new_room_id'];
                $room_booked_modify['room_id'] = $new_room_id;
            }

            $room_booked_modify_result = $wpdb->update($this->table_room_booked, $room_booked_modify, $room_booked_modify_where);

            if ($room_booked_modify_result === false) {
                return new WP_Error('joeee-booking-reservation', __('An error occured during the room booked table modification.', 'joeee-booking'), array('status' => 400));
            }

            if (isset($extras)) {
                $extras_check = $this->createExtras($extras, $reservation_id);
                if (is_wp_error($extras_check)) {
                    return $extras_check;
                }
            }

            return $data;
        }

        public function deleteReservation($reservation_id)
        {
        }

        protected function getReservationExtras($reservation_id)
        {
            global $wpdb;
            $extras = array();
            $sql = "SELECT extra_id, count FROM $this->table_reservation_extra WHERE reservation_id = $reservation_id";
            $query_result = $wpdb->get_results($sql, ARRAY_A);

            foreach ($query_result as $extra) {
                $extras[$extra['extra_id']] = $extra['count'];
            }

            return $extras;
        }

        public function getRoomReservation($reservation_id, $room_id)
        {
            global $wpdb;
            $sql = "SELECT p.id, u.user_email, p.first_name, p.last_name, p.gender, p.birth, p.nationality_id, a.tin, a.street, a.zip, a.city, a.state_id, rb.room_id, rb.reservation_id, rb.booked_from, rb.booked_to, r.confirmation, r.adults, r.kids FROM $this->table_reservation r
            JOIN $this->table_room_booked rb on rb.reservation_id = r.id
            JOIN $this->table_person p on p.id = r.person_id
            JOIN $this->table_address a on a.id = p.id
            LEFT JOIN $this->table_users u on u.ID = p.user_id
            WHERE r.id = $reservation_id AND rb.room_id = $room_id";

            $query_result = $wpdb->get_results($sql, ARRAY_A);
            if (!$query_result) {
                return new WP_Error('joeee_booking_reservation_error', esc_html__('There is no room or reservation with the given ids! Please try again!', 'joeee-booking'));
            }
            $extras = $this->getReservationExtras($reservation_id);

            if (isset($extras)) {
                $query_result['extras'] = $extras;
            }
            return $query_result;
        }

        public function getReservation($id)
        {
            global $wpdb;
            $sql = "SELECT p.id, u.user_email, p.first_name, p.last_name, p.gender, p.birth, p.nationality_id, a.tin, a.street, a.zip, a.city, a.state_id, rb.room_id, rb.reservation_id, rb.booked_from, rb.booked_to FROM $this->table_reservation r
            JOIN $this->table_room_booked rb on rb.reservation_id = r.id
            JOIN $this->table_person p on p.id = r.person_id
            JOIN $this->table_address a on a.id = p.id
            JOIN $this->table_users u on u.ID = p.user_id
            WHERE r.id = $id";

            $query_result = $wpdb->get_results($sql);
            return $query_result;
        }

        public function getReservations()
        {
            global $wpdb;

            $sql = "SELECT rb.reservation_id, rb.room_id, rb.booked_from, rb.booked_to, r.confirmation, p.first_name, p.last_name FROM $this->table_room_booked rb
            JOIN $this->table_reservation r on r.id = rb.reservation_id
            JOIN $this->table_person p on p.id = r.person_id
            WHERE booked_from >= MAKEDATE(YEAR(CURRENT_DATE()),DAYOFYEAR(CURRENT_DATE())-DAYOFMONTH(CURRENT_DATE())+1);";

            $query_result = $wpdb->get_results($sql);
            $result = array();
            foreach ($query_result as $reservation) {
                $confirm = function (int $argument) {
                    switch ($argument) {
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
                    'id' => $reservation->reservation_id,
                    'resourceId' => $reservation->room_id,
                    'title' => $reservation->first_name . ' ' . $reservation->last_name,
                    'start' => $reservation->booked_from,
                    'end' => $reservation->booked_to,
                    'color' => $confirm($reservation->confirmation),
                );
            }

            return $result;
        }
    }
}

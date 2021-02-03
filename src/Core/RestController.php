<?php

namespace Joeee_Booking\Core;

use Joeee_Booking\Core\Extras as Extras;
use Joeee_Booking\Core\InternationalizationI18n as Internationalization;
use Joeee_Booking\Core\Reservation as Reservation;
use Joeee_Booking\Core\Room as Room;
use Joeee_Booking\Core\User as User;
use \WP_Error;
use \WP_REST_Controller;
use \WP_REST_Server;

// Abort if this file is called directly.
if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists(RestController::class)) {
    /**
     * The basic information about this plugin, like its texts (text domain and display name) and file locations.
     */
    class RestController extends WP_REST_Controller
    {

        public $namespace;
        public $resource_user;
        /**
         * Declares our endpoint names.
         */
        public function __construct()
        {
            $this->namespace = 'joeee-booking/v1';
            $this->resource_user = 'user';
        }

        /**
         * Registers our REST endpoints.
         */
        public function registerRoutes()
        {
            /**
             * Registers countries i18n route
             */

            register_rest_route($this->namespace, '/country', array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'getCountryList'),
                    'args' => array(),
                ),
            ));
            /**
             * Registers users specific routes.
             */
            register_rest_route($this->namespace, '/user', array(
                array(
                    'methods' => WP_REST_Server::CREATABLE,
                    'callback' => array($this, 'createUser'),
                    'args' => array(
                        'email' => array(
                            'type' => 'string',
                            'format' => 'email',
                        ),
                        'first_name' => array(
                            'type' => 'string',
                            'sanitize_callback' => 'sanitize_text_field',
                        ),
                        'last_name' => array(
                            'type' => 'string',
                            'sanitize_callback' => 'sanitize_text_field',
                        ),
                        'gender' => array(
                            'type' => 'number',
                            'enum' => array(1, 2, 3),
                        ),
                        'birthday' => array(
                            'type' => 'string',
                            'format' => 'date-time',
                        ),
                        'nationality' => array(
                            'type' => 'string',
                            'sanitize_callback' => 'sanitize_text_field',
                        ),
                        'tin' => array(
                            'type' => 'string',
                            'sanitize_callback' => 'sanitize_text_field',
                        ),
                        'street' => array(
                            'type' => 'string',
                            'sanitize_callback' => 'sanitize_text_field',
                        ),
                        'zip' => array(
                            'type' => 'string',
                            'sanitize_callback' => 'sanitize_text_field',
                        ),
                        'city' => array(
                            'type' => 'string',
                            'sanitize_callback' => 'sanitize_text_field',
                        ),
                        'country' => array(
                            'type' => 'string',
                            'sanitize_callback' => 'sanitize_text_field',
                        ),

                    ),
                ),
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'getUsers'),
                    'args' => array(),
                ),
            ));

            register_rest_route($this->namespace, '/user/(?P<id>[\d]+)', array(
                array(
                    'methods' => WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'updateUser'),
                    'permission_callback' => array($this, 'checkUsersPermission'),
                    'args' => array(
                        'id' => array(
                            'type' => 'number',
                            'required' => true,
                        ),
                        'email' => array(
                            'type' => 'string',
                            'format' => 'email',
                        ),
                        'first_name' => array(
                            'type' => 'string',
                            'sanitize_callback' => 'sanitize_text_field',
                        ),
                        'last_name' => array(
                            'type' => 'string',
                            'sanitize_callback' => 'sanitize_text_field',
                        ),
                        'gender' => array(
                            'type' => 'number',
                            'enum' => array(1, 2, 3),
                        ),
                        'birthday' => array(
                            'type' => 'string',
                            'format' => 'date-time',
                        ),
                        'nationality' => array(
                            'type' => 'string',
                            'sanitize_callback' => 'sanitize_text_field',
                        ),
                        'tin' => array(
                            'type' => 'string',
                            'sanitize_callback' => 'sanitize_text_field',
                        ),
                        'street' => array(
                            'type' => 'string',
                            'sanitize_callback' => 'sanitize_text_field',
                        ),
                        'zip' => array(
                            'type' => 'string',
                            'sanitize_callback' => 'sanitize_text_field',
                        ),
                        'city' => array(
                            'type' => 'string',
                            'sanitize_callback' => 'sanitize_text_field',
                        ),
                        'country' => array(
                            'type' => 'string',
                            'sanitize_callback' => 'sanitize_text_field',
                        ),

                    ),
                ),
                'schema' => array($this, 'getUsersSchema'),
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'getUser'),
                    'args' => array(
                        'id' => array(
                            'validate_callback' => function ($param, $request, $key) {
                                is_numeric($param);
                            },
                        ),
                    ),
                ),
            ));

            register_rest_route($this->namespace, '/user/email', array(
                array(
                    'methods' => 'POST',
                    'callback' => array($this, 'getUserEmails'),
                    'args' => array(
                        'term' => array(
                            'type' => 'string',
                            'sanitize_callback' => 'sanitize_text_field',
                            'required' => true,
                        ),
                    ),
                ),
            ));

            register_rest_route($this->namespace, '/user/byemail', array(
                'methods' => 'POST',
                'callback' => array($this, 'getUserByEmail'),
                'args' => array(
                    'email' => array(
                        'type' => 'string',
                        'format' => 'email',
                    ),
                ),
            ));

            register_rest_route($this->namespace, 'user/login', array(
                'methods' => 'POST',
                'callback' => array($this, 'userLogin'),
                'args' => array(
                    'user_login' => array(
                        'type' => 'string',
                        'required' => true,
                    ),
                    'user_password' => array(
                        'type' => 'string',
                        'required' => true,
                    ),
                ),
                'show_in_index' => false,
            ));

            /**
             * Registers room specific routes.
             */
            register_rest_route($this->namespace, '/room', array(
                array(
                    'methods' => WP_REST_Server::CREATABLE,
                    'callback' => array($this, 'createRoom'),
                    // 'permission_callback' => array($this, 'checkUsersPermissionAdmin'),
                    'args' => array(
                        'id' => array(
                            'type' => 'number',
                        ),
                        'number' => array(
                            'type' => 'string',
                            'sanitize_callback' => 'sanitize_text_field',
                            'required' => true,
                        ),
                        'adults' => array(
                            'type' => 'number',
                            'required' => true,
                        ),
                        'kids' => array(
                            'type' => 'number',
                        ),
                        'floor' => array(
                            'type' => 'number',
                            'required' => true,
                        ),
                        'price' => array(
                            'type' => 'number',
                            'required' => true,
                        ),
                        'single_room_supplement' => array(
                            'type' => 'number',
                            'required' => true,
                        ),
                        'description' => array(
                            'type' => 'string',
                            'sanitize_callback' => 'sanitize_text_field',
                        ),
                        'active' => array(
                            'type' => 'boolean',
                        ),
                    ),
                ),
                'schema' => array($this, 'getRoomsSchema'),

                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'getRooms'),
                    'args' => array(),
                ),
            ));

            register_rest_route($this->namespace, '/room/(?P<id>[\d]+)', array(
                array(
                    'methods' => WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'updateRoom'),
                    // 'permission_callback' => array($this, 'checkUsersPermissionAdmin'),
                    'args' => array(
                        'id' => array(
                            'type' => 'number',
                        ),
                        'number' => array(
                            'type' => 'string',
                            'sanitize_callback' => 'sanitize_text_field',
                            'required' => true,
                        ),
                        'adults' => array(
                            'type' => 'number',
                            'required' => true,
                        ),
                        'kids' => array(
                            'type' => 'number',
                        ),
                        'floor' => array(
                            'type' => 'number',
                            'required' => true,
                        ),
                        'price' => array(
                            'type' => 'number',
                            'required' => true,
                        ),
                        'single_room_supplement' => array(
                            'type' => 'number',
                            'required' => true,
                        ),
                        'description' => array(
                            'type' => 'string',
                            'sanitize_callback' => 'sanitize_text_field',
                        ),
                        'active' => array(
                            'type' => 'boolean',
                        ),
                    ),
                ),
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'getRoom'),
                    'args' => array(
                        'id' => array(
                            'type' => 'number',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => WP_REST_Server::DELETABLE,
                    'callback' => array($this, 'deleteRoom'),
                    'permission_callback' => array($this, 'checkUsersPermissionAdmin'),
                    'args' => array(
                        'id' => array(
                            'type' => 'number',
                            'required' => true,
                        ),
                    ),
                ),
            ));

            /**
             * Registers reservation specific routes
             */
            register_rest_route($this->namespace, '/reservation', array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'getReservations'),
                    'args' => array(),
                ),
                array(
                    'methods' => WP_REST_Server::CREATABLE,
                    'callback' => array($this, 'createReservation'),
                    'args' => array(
                        'person_id' => array(
                            'type' => 'array',
                            'items' => array(
                                'type' => 'number',
                            ),
                            'required' => true,
                        ),
                        'booked_from' => array(
                            'type' => 'string',
                            'format' => 'date-time',
                            'required' => true,
                        ),
                        'booked_to' => array(
                            'type' => 'string',
                            'format' => 'date-time',
                            'required' => true,
                        ),
                        'price' => array(
                            'type' => 'number',
                        ),
                        'confirmation' => array(
                            'type' => 'number',
                            'enum' => array(
                                1,
                                2,
                                3,
                            ),
                        ),
                        'adults' => array(
                            'type' => 'number',
                        ),
                        'kids' => array(
                            'type' => 'number',
                        ),
                        'extras' => array(
                            'type' => 'object',
                        ),
                        'room_data' => array(
                            'type' => 'array',
                            // 'items' => array(
                            //     'type' => 'number',
                            // ),
                            'required' => true,
                        ),
                    ),
                ),
            ));

            register_rest_route($this->namespace, '/reservation/user', array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'getReservationForLoggedInUser'),
                    'args' => array(),
                ),
            ));

            register_rest_route($this->namespace, '/reservation/(?P<id>[\d]+)', array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'getReservation'),
                    'args' => array(
                        'id' => array(
                            'type' => 'number',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'modifyReservation'),
                    'args' => array(
                        'id' => array(
                            'type' => 'number',
                            'required' => true,
                        ),
                        'person_id' => array(
                            'type' => 'array',
                            'items' => array(
                                'type' => 'number',
                            ),
                        ),
                        'booked_from' => array(
                            'type' => 'string',
                            'format' => 'date-time',
                            'required' => true,
                        ),
                        'booked_to' => array(
                            'type' => 'string',
                            'format' => 'date-time',
                            'required' => true,
                        ),
                        'price' => array(
                            'type' => 'number',
                        ),
                        'confirmation' => array(
                            'type' => 'number',
                            'enum' => array(
                                1,
                                2,
                                3,
                            ),
                        ),
                        'adults' => array(
                            'type' => 'number',
                        ),
                        'kids' => array(
                            'type' => 'number',
                        ),
                        'extras' => array(
                            'type' => 'object',
                        ),
                        'room_id' => array(
                            'type' => 'number',
                            'required' => true,
                        ),
                        'new_room_id' => array(
                            'type' => 'number',
                        ),
                    ),
                ),
            ));

            register_rest_route($this->namespace, '/reservation/room', array(
                array(
                    'methods' => 'POST',
                    'callback' => array($this, 'getRoomReservation'),
                    'args' => array(
                        'id' => array(
                            'type' => 'number',
                            'required' => true,
                        ),
                        'room_id' => array(
                            'type' => 'array',
                            'items' => array(
                                'type' => 'number',
                            ),
                            'required' => true,
                        ),
                    ),
                ),
            ));

            register_rest_route($this->namespace, '/extra', array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'getExtras'),
                    'args' => array(),
                ),
                array(
                    'methods' => WP_REST_Server::CREATABLE,
                    'callback' => array($this, 'createExtras'),
                    'args' => array(
                        'title' => array(
                            'type' => 'string',
                            'required' => true,
                            'sanitize_callback' => 'sanitize_text_field',
                        ),
                        'price' => array(
                            'type' => 'number',
                            'required' => true,
                        ),
                        'bookable' => array(
                            'type' => 'boolean',
                            'required' => true,
                        ),
                    ),
                ),
            ));

            register_rest_route($this->namespace, '/extra/(?P<id>[\d]+)', array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'getExtra'),
                    'args' => array(
                        'id' => array(
                            'type' => 'number',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => WP_REST_Server::DELETABLE,
                    'callback' => array($this, 'deleteExtra'),
                    'args' => array(
                        'id' => array(
                            'type' => 'number',
                            'required' => true,
                        ),
                    ),
                ),
                array(
                    'methods' => WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'editExtra'),
                    'args' => array(
                        'id' => array(
                            'type' => 'number',
                            'required' => true,
                        ),
                        'title' => array(
                            'type' => 'string',
                            'sanitize_callback' => 'sanitize_text_field',
                        ),
                        'price' => array(
                            'type' => 'number',
                        ),
                        'bookable' => array(
                            'type' => 'boolean',
                        ),
                    ),
                ),
            ));

            register_rest_route($this->namespace, '/room/availability', array(
                array(
                    'methods' => 'POST',
                    'callback' => array($this, 'getAvailability'),
                    'args' => array(
                        'from' => array(
                            'type' => 'string',
                            'format' => 'date-time',
                            'required' => true,
                        ),
                        'to' => array(
                            'type' => 'string',
                            'format' => 'date-time',
                            'required' => true,
                        ),
                        'persons' => array(
                            'type' => 'number',
                        ),
                        'rooms' => array(
                            'type' => 'number',
                        ),
                    ),
                ),
            ));
        }

        /**
         * i18n Country list
         */
        public function getCountryList()
        {
            $international = new Internationalization;
            return $international->countries();
        }

        /**
         * User specific functionality
         */
        public function userLogin($data)
        {
            $User = new User();
            $credentials = $data->get_json_params();
            $response = $User->login($credentials);

            return $response;
        }

        public function getUsers($request)
        {
            $User = new User();
            $response = $User->getUsers();
            return $response;
        }

        public function getUser($request)
        {
            $User = new User();
            $user_id = $request['id'];

            $response = $User->getUser($user_id);

            return $response;
        }

        public function getUserEmails($request)
        {
            $User = new User();
            $result = $User->getUserEmails($request);
            return $result;
        }

        public function getUserByEmail($request)
        {
            $User = new User();
            $result = $User->getUserByEmail($request);
            return $result;
        }

        public function createUser($request)
        {
            $User = new User();
            $data = $request->get_json_params();
            $response = $User->createUser($data);

            return $response;
        }

        public function updateUser($request)
        {
            $User = new User();

            $data = $request->get_json_params();
            $data['id'] = (int) $request['id'];
            $response = $User->updateUser($data);

            return $response;
        }
        public function registerUser($request)
        {
            $response = array();
            array_push($response, $request->get_json_params());
            return $response;
        }

        /**
         * Room specific functionality.
         */
        public function createRoom($request)
        {
            $room = new Room();
            $data = $request->get_json_params();

            $response = $room->createRoom($data);

            return $response;
        }

        public function getRoom($request)
        {
            $room = new Room();
            $data = $request['id'];

            $response = $room->getRoom($data);

            return $response;
        }

        public function getRooms($request)
        {
            $room = new Room();

            $response = $room->getRooms();
            return $response;
        }

        public function deleteRoom($request)
        {
            $room = new Room();
            $id = $request['id'];

            $response = $room->deleteRoom($id);

            return $response;
        }

        public function updateRoom($request)
        {
            $room = new Room();
            $data = $request->get_json_params();
            $data['id'] = (int) $request['id'];

            $response = $room->updateRoom($data);

            return $response;
        }

        /**
         * Reservation specific functionality
         */

        public function createReservation($request)
        {
            $Reservation = new Reservation();
            $data = $request->get_json_params();
            $result = $Reservation->createReservation($data);
            return $result;
        }

        public function modifyReservation($request)
        {
            $Reservation = new Reservation();

            $result = $Reservation->modifyReservation($request);

            return $result;
        }

        public function getReservations()
        {
            $Reservation = new Reservation();

            $result = $Reservation->getReservations();

            return $result;
        }

        public function getReservationForLoggedInUser()
        {
            $Reservation = new Reservation();
            $user_id = get_current_user_id();

            $result = $Reservation->getUsersReservations($user_id);
            return $result;
        }

        public function getReservation($request)
        {
            $Reservation = new Reservation();

            $result = $Reservation->getReservation($request['id']);
            return $result;
        }

        public function getRoomReservation($request)
        {
            $Reservation = new Reservation();

            $result = $Reservation->getRoomReservation($request['id'], $request['room_id'][0]);

            return $result;
        }

        /**
         * Extra specific functionality
         */
        public function getExtras($request)
        {
            $Extra = new Extras();
            return $Extra->getExtras();
        }

        public function getExtra($request)
        {
            $Extra = new Extras();
            return $Extra->getExtra($request['id']);
        }

        public function createExtras($request)
        {
            $Extra = new Extras();
            $data = $request->get_json_params();
            $result = $Extra->createExtra($data);

            return $result;
        }

        public function deleteExtra($request)
        {
            $Extra = new Extras();

            $result = $Extra->deleteExtra($request['id']);

            return $result;
        }

        public function editExtra($request)
        {
            $data = $request->get_json_params();
            $data['id'] = (int) $request['id'];
            $Extra = new Extras();

            $result = $Extra->editExtra($data);

            return $result;
        }

        /**
         * Room Availability functionality
         */

        public function getAvailability($request)
        {
            $Room = new Room();
            $data = $request->get_json_params();

            $result = $Room->availability($data);
            return $result;
        }

        /**
         * @TODO Set the correct user permissions in build.
         */
        public function checkUsersPermission()
        {
            if (!current_user_can('read')) {
                return new WP_Error('rest_forbidden', esc_html__("You aren't allowed to go this way (read).", 'joeee-booking'));
            }
            return true;
        }

        public function checkUsersPermissionAdmin()
        {
            if (!current_user_can('edit_others_pages')) {
                return new WP_Error('rest_forbidden', esc_html__("You aren't allowed to go this way.", 'joeee-booking'));
            }
            return true;
        }

        /**
         * Get our schema for users.
         */
        public function getUsersSchema()
        {
            $schema = array(
                // This tells the spec of JSON Schema we are using which is draft 4.
                '$schema' => 'http://json-schema.org/draft-04/schema#',
                // The title property marks the identity of the resource.
                'title' => 'user',
                'type' => 'object',
                // In JSON Schema you can specify object properties in the properties attribute.
                'properties' => array(
                    'id' => array(
                        'description' => esc_html__('Unique identifier for the user.', 'joeee-booking'),
                        'type' => 'integer',
                        'context' => array('view', 'edit', 'embed'),
                        'readonly' => true,
                    ),
                    'user_id' => array(
                        'description' => esc_html__('The id of the wp user object.', 'joeee-booking'),
                        'type' => 'integer',
                    ),
                    'email' => array(
                        'description' => esc_html__('The email for the user.', 'joeee-booking'),
                        'type' => 'string',
                        'format' => 'email',
                        'context' => array('view', 'edit'),
                    ),
                    'first_name' => array(
                        'description' => esc_html__('The users first name.', 'joeee-booking'),
                        'type' => 'string',
                        'context' => array('view', 'edit', 'embed'),
                    ),
                    'last_name' => array(
                        'description' => esc_html__('The users last or firm name.', 'joeee-booking'),
                        'type' => 'string',
                        'context' => array('view', 'edit', 'embed'),
                    ),
                    'birthday' => array(
                        'description' => esc_html__('The users birthday.', 'joeee-booking'),
                        'type' => 'string',
                        'format' => 'date',
                        'context' => array('view', 'edit'),
                    ),
                    'nationality' => array(
                        'description' => esc_html__('The users nationality.', 'joeee-booking'),
                        'type' => 'integer',
                        'context' => array('view', 'edit'),
                    ),
                    'tin' => array(
                        'description' => esc_html__('The firms tax identification number', 'joeee-booking'),
                        'type' => 'string',
                        'context' => array('view', 'edit', 'embed'),
                    ),
                    'street' => array(
                        'description' => esc_html__('The users street name and number.', 'joeee-booking'),
                        'type' => 'string',
                        'context' => array('view, edit'),
                    ),
                    'zip' => array(
                        'description' => esc_html__('The users zip code.', 'joeee-booking'),
                        'type' => 'integer',
                        'context' => array('view', 'edit', 'embed'),
                    ),
                    'city' => array(
                        'description' => esc_html__('The users city.', 'joeee-booking'),
                        'type' => 'string',
                        'context' => array('view', 'edit', 'embed'),
                    ),
                    'country' => array(
                        'description' => esc_html__('The users country id.', 'joeee-booking'),
                        'type' => 'integer',
                        'context' => array('view', 'edit', 'embed'),
                    ),
                ),
            );

            return $schema;
        }

        public function getRoomsSchema()
        {
            $schema = array(
                // This tells the spec of JSON Schema we are using which is draft 4.
                '$schema' => 'http://json-schema.org/draft-04/schema#',
                // The title property marks the identity of the resource.
                'title' => 'room',
                'type' => 'object',
                // In JSON Schema you can specify object properties in the properties attribute.
                'properties' => array(
                    'id' => array(
                        'description' => esc_html__('The id of the room object.', 'joeee-booking'),
                        'type' => 'integer',
                    ),
                    'number' => array(
                        'description' => esc_html__('The room number.', 'joeee-booking'),
                        'type' => 'string',
                        'context' => array('view', 'edit'),
                    ),
                    'adults' => array(
                        'description' => esc_html__('The rooms adult beds.', 'joeee-booking'),
                        'type' => 'integer',
                        'context' => array('view', 'edit', 'embed'),
                    ),
                    'kids' => array(
                        'description' => esc_html__('The rooms kid beds', 'joeee-booking'),
                        'type' => 'integer',
                        'context' => array('view', 'edit', 'embed'),
                    ),
                    'floor' => array(
                        'description' => esc_html__('The rooms floor number.', 'joeee-booking'),
                        'type' => 'integer',
                        'context' => array('view', 'edit', 'embed'),
                    ),
                    'price' => array(
                        'description' => esc_html__('The room price.', 'joeee-booking'),
                        'type' => 'number',
                        'context' => array('view', 'edit', 'embed'),
                    ),
                    'description' => array(
                        'description' => esc_html__('The room description.', 'joeee-booking'),
                        'type' => 'string',
                        'context' => array('view', 'edit', 'embed'),
                    ),
                    'active' => array(
                        'description' => esc_html__('Info if the room can be booked or not.', 'joeee-booking'),
                        'type' => 'boolean',
                        'context' => array('view', 'edit', 'embed'),
                    ),
                ),
            );

            return $schema;
        }
    }
}

<?php

namespace Joeee_Booking;

use Joeee_Booking\Room as Room;


// Abort if this file is called directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( Rest_Controller::class ) ) {
	/**
	 * The basic information about this plugin, like its texts (text domain and display name) and file locations.
	 */
	class Rest_Controller {

        public $namespace;
        public $resource_user;
        /**
         * Declares our endpoint names.
         */
        public function __construct() {
            $this->namespace = 'joeee-booking/v1/';
            $this->resource_user = 'user'; 
        }


        /**
         * Registers our REST endpoints.
         */
        public function register_routes() {
            /**
             * Registers users specific routes.
             */
            register_rest_route( $this->namespace . 'user', '/get', array(
                array(
                    'methods'   => 'POST',
                    'callback'  => array( $this, 'get_users' ),
                    'permission_callback' => array($this, 'check_users_permission'),
                ),
                'schema' => array( $this, 'get_users_schema' ),
            ));
            register_rest_route( $this->namespace . 'user', '/create', array(
                array(
                    'methods'   => 'POST',
                    'callback'  => array( $this, 'create_user' ),
                    'permission_callback' => array($this, 'check_users_permission'),
                ),
                'schema' => array( $this, 'get_users_schema' ),
            ));
            register_rest_route( $this->namespace . 'user', '/update', array(
                array(
                    'methods'   => 'POST',
                    'callback'  => array( $this, 'update_user' ),
                    'permission_callback' => array($this, 'check_users_permission'),
                ),
                'schema' => array( $this, 'get_users_schema' ),
            ));
            register_rest_route( $this->namespace . 'user', '/register', array(
                array(
                    'methods'   => 'POST',
                    'callback'  => array( $this, 'register_user' ),
                    'permission_callback' => array($this, 'check_users_permission'),
                ),
                'schema' => array( $this, 'get_users_schema' ),
            ));

            /**
             * Registers room specific routes.
             */
            register_rest_route( $this->namespace . 'room', '/create', array(
                array(
                    'methods'   => 'POST',
                    'callback'  => array( $this, 'create_room' ),
                    'permission_callback' => array($this, 'check_users_permission'),
                ),
                'schema' => array( $this, 'get_rooms_schema' ),
            ));

            register_rest_route( $this->namespace . 'room', '/get', array(
                array(
                    'methods'   => 'POST',
                    'callback'  => array( $this, 'get_room' ),
                    'permission_callback' => array($this, 'check_users_permission'),
                ),
                'schema' => array( $this, 'get_rooms_schema' ),
            ));

            register_rest_route( $this->namespace . 'room', '/update', array(
                array(
                    'methods'   => 'POST',
                    'callback'  => array( $this, 'update_room' ),
                    'permission_callback' => array($this, 'check_users_permission'),
                ),
                'schema' => array( $this, 'get_rooms_schema' ),
            ));

            register_rest_route( $this->namespace . 'room', '/delete', array(
                array(
                    'methods'   => 'POST',
                    'callback'  => array( $this, 'delete_room' ),
                    'permission_callback' => array($this, 'check_users_permission'),
                ),
                'schema' => array( $this, 'get_rooms_schema' ),
            ));
        }

        public function get_users( $request ) {
            $response = array();
            array_push($response, $request->get_json_params());
            return $response;
        }

        public function create_user( $request ) {
            $response = array();
            array_push($response, $request->get_json_params() );
            return $response;
        }

        public function update_user( $request ) {
            $response = array();
            array_push($response, $request->get_json_params() );
            return $response;
        }
        public function register_user( $request ) {
            $response = array();
            array_push($response, $request->get_json_params() );
            return $response;
        }

        /**
         * Room specific functionality.
         */
        public function create_room( $request ) {
            $room = new Room();
            $data = $request->get_json_params();
            
            
            $response = $room->create_room( $data );

            return $response;
        }



        public function get_room( $request ) {
            $room = new Room();
            $data = $request->get_json_params();

            $response = $room->get_room( $data );

            return $response;
        }

        public function delete_room( $request ) {
            $room = new Room();
            $data = $request->get_json_params();

            $response = $room->delete_room( $data );

            return $response;
        }

        public function update_room( $request ) {
            $room = new Room();
            $data = $request->get_json_params();

            $response = $room->update_room( $data );

            return $response;
        }

        
        /**
         * @TODO Set the correct user permissions in build. 
         */
        public function check_users_permission() {
            if ( !current_user_can( 'read' ) ) {
                return new WP_Error( 'rest_forbidden', esc_html__( "You aren't allowed to go this way.", 'joeee-booking' ));
            }
            return true;
        }


        /**
         * Get our schema for users.
         */
        public function get_users_schema() {
            $schema = array(
                // This tells the spec of JSON Schema we are using which is draft 4.
                '$schema'              => 'http://json-schema.org/draft-04/schema#',
                // The title property marks the identity of the resource.
                'title'                => 'user',
                'type'                 => 'object',
                // In JSON Schema you can specify object properties in the properties attribute.
                'properties'           => array(
                    'id' => array(
                        'description'  => esc_html__( 'Unique identifier for the object.', 'joeee-booking' ),
                        'type'         => 'integer',
                        'context'      => array( 'view', 'edit', 'embed' ),
                        'readonly'     => true,
                    ),
                    'user_id' => array(
                        'description'  => esc_html__( 'The id of the user object.', 'joeee-booking' ),
                        'type'         => 'integer',
                    ),
                    'email' => array(
                        'description'  => esc_html__( 'The email for the user.', 'joeee-booking' ),
                        'type'         => 'string',
                        'format'       => 'email',
                        'context'      => array('view', 'edit'),
                    ),
                    'first_name' => array(
                        'description'  => esc_html__( 'The users first name.', 'joeee-booking' ),
                        'type'         => 'string',
                        'context'      => array('view', 'edit', 'embed'),
                    ),
                    'last_name' => array(
                        'description'  => esc_html__( 'The users last or firm name.', 'joeee-booking' ),
                        'type'         => 'string',
                        'context'      => array('view', 'edit', 'embed'),
                    ),
                    'birthday' => array(
                        'description'  => esc_html__( 'The users birthday.', 'joeee-booking' ),
                        'type'         => 'string',
                        'format'       => 'date',
                        'context'      => array('view', 'edit'),
                    ),
                    'address' => array(
                        'description'  => esc_html__( 'The address object for the user.', 'joeee-booking' ),
                        'type'         => 'object',
                        'properties'   => array(
                            'tin' => array(
                            'description'  => esc_html__( 'The firms tax identification number', 'joeee-booking' ),
                            'type'         => 'string',
                            'context'      => array('view', 'edit', 'embed'),
                            ),
                            'street'        => array(
                            'description'       => esc_html__( 'The users street name and number.', 'joeee-booking'),
                            'type'              => 'string',
                            'context'           => array('view, edit')
                            ),
                            'zip' => array(
                            'description'  => esc_html__( 'The users zip code.', 'joeee-booking' ),
                            'type'         => 'integer',
                            'context'      => array('view', 'edit', 'embed'),
                            ),
                            'city' => array(
                                'description'  => esc_html__( 'The users city.', 'joeee-booking' ),
                                'type'         => 'string',
                                'context'      => array('view', 'edit', 'embed'),
                                ),
                            'country' => array(
                                'description'  => esc_html__( 'The users country id.', 'joeee-booking' ),
                                'type'         => 'integer',
                                'context'      => array('view', 'edit', 'embed'),
                            ),
                        ),
                        
                    ),
                ),
            );
        
            return $schema;
        }

        public function get_rooms_schema() {
            $schema = array(
                // This tells the spec of JSON Schema we are using which is draft 4.
                '$schema'              => 'http://json-schema.org/draft-04/schema#',
                // The title property marks the identity of the resource.
                'title'                => 'room',
                'type'                 => 'object',
                // In JSON Schema you can specify object properties in the properties attribute.
                'properties'           => array(
                        'id' => array(
                        'description'  => esc_html__( 'The id of the room object.', 'joeee-booking' ),
                        'type'         => 'integer',
                    ),
                    'number' => array(
                        'description'  => esc_html__( 'The room number.', 'joeee-booking' ),
                        'type'         => 'string',
                        'context'      => array('view', 'edit'),
                    ),
                    'capacity' => array(
                        'description'  => esc_html__( 'The rooms maximum capacity', 'joeee-booking' ),
                        'type'         => 'integer',
                        'context'      => array('view', 'edit', 'embed'),
                    ),
                    'floor' => array(
                        'description'  => esc_html__( 'The rooms floor number.', 'joeee-booking' ),
                        'type'         => 'integer',
                        'context'      => array('view', 'edit', 'embed'),
                    ),
                    'price' => array(
                        'description'  => esc_html__( 'The room price.', 'joeee-booking' ),
                        'type'         => 'number',
                        'context'      => array('view', 'edit', 'embed'),
                    ),
                    'active' => array(
                        'description'  => esc_html__( 'Info if the room can be booked or not.', 'joeee-booking' ),
                        'type'         => 'boolean',
                        'context'      => array('view', 'edit', 'embed'),
                    ),
                ),
            );
        
            return $schema;
        }
    }
}
<?php

namespace Joeee_Booking;

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
            $this->namespace = '/joeee-booking/v1';
            $this->resource_user = 'user'; 
        }


        /**
         * Registers our REST endpoints.
         */
        public function register_routes() {
            register_rest_route( 'joeee-booking/v1/user', '/get', array(
                array(
                    'methods'   => 'POST',
                    'callback'  => array( $this, 'get_users' ),
                    'permission_callback' => array($this, 'check_users_permission'),
                ),
                'schema' => array( $this, 'get_users_schema' ),
            ));
            register_rest_route( 'joeee-booking/v1/user', '/create', array(
                array(
                    'methods'   => 'POST',
                    'callback'  => array( $this, 'create_user' ),
                    'permission_callback' => array($this, 'check_users_permission'),
                ),
                'schema' => array( $this, 'get_users_schema' ),
            ));
            register_rest_route( 'joeee-booking/v1/user', '/update', array(
                array(
                    'methods'   => 'POST',
                    'callback'  => array( $this, 'update_user' ),
                    'permission_callback' => array($this, 'check_users_permission'),
                ),
                'schema' => array( $this, 'get_users_schema' ),
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
        /**
         * @TODO Set the correct user permissions in build. 
         */
        public function check_users_permission() {
            if ( current_user_can( 'read' ) ) {
                return new WP_Error( 'rest_forbidden', esc_html__( "You aren't allowed to see the users.", 'joeee-booking' ));
            }
            return true;
        }


        /**
         * Get our sample schema for users.
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
    }
}
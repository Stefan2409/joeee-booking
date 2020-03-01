<?php

namespace Joeee_Booking;

use \WP_Error;
use \WP_REST_Controller;
use \WP_REST_Server;
use Joeee_Booking\Core\Room as Room;
use Joeee_Booking\Core\User as User;


// Abort if this file is called directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( Rest_Controller::class ) ) {
	/**
	 * The basic information about this plugin, like its texts (text domain and display name) and file locations.
	 */
	class Rest_Controller extends WP_REST_Controller {

        public $namespace;
        public $resource_user;
        /**
         * Declares our endpoint names.
         */
        public function __construct() {
            $this->namespace = 'joeee-booking/v1';
            $this->resource_user = 'user'; 
        }


        /**
         * Registers our REST endpoints.
         */
        public function register_routes() {
            /**
             * Registers users specific routes.
             */
            register_rest_route( $this->namespace, '/user', array(
                array(
                    'methods'   => WP_REST_Server::CREATABLE,
                    'callback'  => array( $this, 'create_user' ),
                    'permission_callback' => array($this, 'check_users_permission'),
                    'args'      => array(
                        'id'    => array(
                            'validate_callback' => function( $param, $request, $key ) {
                                return $param == "null";
                            },
                        ),
                        'user_id' => array(
                            'validate_callback' => function( $param, $request, $key ) {
                                if( !($param != "null") || !is_numeric( $param ) ) {
                                    return false;
                                }
                                return true;
                            },
                        ),
                        'email' => array(
                            'validate_callback' => function( $param, $request, $key ) {
                                return is_string( $param );
                            },
                            'sanitize_callback' => 'sanitize_email',
                        ),
                        'first_name' => array(
                            'validate_callback' => function( $param, $request, $key ) {
                                return is_string( $param );
                            },
                            'sanitize_callback' => 'sanitize_text_field',
                        ),
                        'last_name' => array(
                            'validate_callback' => function( $param, $request, $key ) {
                                
                                return is_string( $param );
                            },
                            'sanitize_callback' => 'sanitize_text_field', 
                        ),
                        'birthday' => array(
                            'validate_callback' => function( $param, $request, $key ) {
                                return is_string( $param );
                            }
                        ),
                        'nationality' => array(
                            'validate_callback' => function( $param, $request, $key ) {
                                if( !($param != "null") || !is_numeric( $param ) ) {
                                    return false;
                                }
                                return true;
                            }
                        ),
                        'tin' => array(
                            'validate_callback' => function( $param, $request, $key ) {
                                return is_string( $param );
                            },
                            'sanitize_callback' => 'sanitize_text_field', 
                        ),
                        'street' => array(
                            'validate_callback' => function( $param, $request, $key ) {
                                return is_string( $param );
                            },
                            'sanitize_callback' => 'sanitize_text_field', 
                        ),
                        'zip' => array(
                            'validate_callback' => function( $param, $request, $key ) {
                                return is_string( $param );
                            },
                            'sanitize_callback' => 'sanitize_text_field', 
                        ),
                        'city' => array(
                            'validate_callback' => function( $param, $request, $key ) {
                                return is_string( $param );
                            },
                            'sanitize_callback' => 'sanitize_text_field', 
                        ),
                        'country' => array(
                            'validate_callback' => function( $param, $request, $key ) {
                                if( !($param != "null") || !is_numeric( $param ) ) {
                                    return false;
                                }
                                return true;
                            }
                        ),

                    ),
                ),
                array(
                    'methods'   => WP_REST_Server::READABLE,
                    'callback'  => array ($this, 'get_users' ),
                    'args'      => array(),   
                )));

                register_rest_route( $this->namespace, '/user/(?P<id>[\d]+)', array(
                    array(
                        'methods'   => WP_REST_Server::EDITABLE,
                        'callback'  => array( $this, 'update_user' ),
                        'permission_callback' => array($this, 'check_users_permission'),
                        'args'      => array(
                            'email' => array(
                                'validate_callback' => function( $param, $request, $key ) {
                                    return is_string( $param );
                                },
                                'sanitize_callback' => 'sanitize_email',
                            ),
                            'first_name' => array(
                                'validate_callback' => function( $param, $request, $key ) {
                                    return is_string( $param );
                                },
                                'sanitize_callback' => 'sanitize_text_field',
                            ),
                            'last_name' => array(
                                'validate_callback' => function( $param, $request, $key ) {
                                    
                                    return is_string( $param );
                                },
                                'sanitize_callback' => 'sanitize_text_field', 
                            ),
                            'birthday' => array(
                                'validate_callback' => function( $param, $request, $key ) {
                                    return is_string( $param );
                                }
                            ),
                            'nationality' => array(
                                'validate_callback' => function( $param, $request, $key ) {
                                    if( !($param != "null") || !is_numeric( $param ) ) {
                                        return false;
                                    }
                                    return true;
                                }
                            ),
                            'tin' => array(
                                'validate_callback' => function( $param, $request, $key ) {
                                    return is_string( $param );
                                },
                                'sanitize_callback' => 'sanitize_text_field', 
                            ),
                            'street' => array(
                                'validate_callback' => function( $param, $request, $key ) {
                                    return is_string( $param );
                                },
                                'sanitize_callback' => 'sanitize_text_field', 
                            ),
                            'zip' => array(
                                'validate_callback' => function( $param, $request, $key ) {
                                    return is_string( $param );
                                },
                                'sanitize_callback' => 'sanitize_text_field', 
                            ),
                            'city' => array(
                                'validate_callback' => function( $param, $request, $key ) {
                                    return is_string( $param );
                                },
                                'sanitize_callback' => 'sanitize_text_field', 
                            ),
                            'country' => array(
                                'validate_callback' => function( $param, $request, $key ) {
                                    if( !($param != "null") || !is_numeric( $param ) ) {
                                        return false;
                                    }
                                    return true;
                                }
                            ),
    
                        ),
                    ),
                    array(
                        'methods'   => WP_REST_Server::READABLE,
                        'callback'  => array ($this, 'get_user' ),
                        'args'      => array(
                            'id'    => array(
                                'validate_callback' => function( $param, $request, $key ) {
                                    is_numeric( $param );
                                }
                            ),
                        ),   
                    )));

            
            /**
             * Registers room specific routes.
             */
            register_rest_route( $this->namespace, '/room', array(
                array(
                    'methods'   => WP_REST_Server::CREATABLE,
                    'callback'  => array( $this, 'create_room' ),
                    'permission_callback' => array($this, 'check_users_permission_admin'),
                    'args'      => array(
                        'id'    => array(
                            'validate_callback' => function( $param, $request, $key ) {
                                return is_null( $param );
                            }
                        ),
                        'number' => array(
                            'sanitize_callback' => 'sanitize_text_field',
                        ),
                        'capacity' => array(
                            'validate_callback' => function( $param, $request, $key ) {
                                return is_numeric( $param );
                            }
                        ),
                        'floor' => array(
                            'validate_callback' => function( $param, $request, $key ) {
                                return is_numeric( $param );
                            }
                        ),
                        'price' => array(
                            'validate_callback' => function( $param, $request, $key ) {
                                
                                return is_numeric( $param );
                            } 
                        ),
                        'active' => array(
                            'validate_callback' => function( $param, $request, $key ) {
                                return is_bool( $param );
                            }
                        ),
                    ),
                ),
                'schema' => array( $this, 'get_rooms_schema' ),
                
                array(
                    'methods'   => WP_REST_Server::READABLE,
                    'callback'  => array ($this, 'get_rooms' ),
                    'args'      => array(),   
                )));

            register_rest_route( $this->namespace, '/room/(?P<id>[\d]+)', array(
                array(
                    'methods'   => WP_REST_Server::EDITABLE,
                    'callback'  => array( $this, 'update_room'),
                    'permission_callback' => array( $this, 'check_users_permission_admin' ),
                    'args'      => array(
                        'id'    => array(
                            'validate_callback' => function( $param, $request, $key ) {
                                return is_numeric( $param );
                            }
                        ),
                        'number' => array(
                            'validate_callback' => function( $param, $request, $key ) {
                                return is_string( $param );
                            },
                            'sanitize_callback' => 'sanitize_text_field',
                        ),
                        'capacity' => array(
                            'validate_callback' => function( $param, $request, $key ) {
                                return is_numeric( $param );
                            }
                        ),
                        'floor' => array(
                            'validate_callback' => function( $param, $request, $key ) {
                                return is_numeric( $param );
                            }
                        ),
                        'price' => array(
                            'validate_callback' => function( $param, $request, $key ) {
                                //$param = preg_replace( ',', '.', $param );
                                return is_numeric( $param );
                            } 
                        ),
                        'active' => array(
                            'validate_callback' => function( $param, $request, $key ) {
                                return is_bool( $param );
                            }
                        ),
                    ),
                ),
                array(
                    'methods'   => WP_REST_Server::READABLE,
                    'callback'  => array( $this, 'get_room' ),
                    'args'      => array(
                        'id'    => array(
                            'validate_callback' => function( $param, $request, $key ) {
                                is_numeric( $param );
                            }
                        )
                    ),
                ),
                array(
                    'methods'   => WP_REST_Server::DELETABLE,
                    'callback'  => array($this, 'delete_room'),
                    'permission_callback' => array( $this, 'check_users_permission_admin' ),
                    'args'      => array(
                        'id'    => array(
                            'validate_callback' => function( $param, $request, $key ) {
                                is_numeric( $param );
                            }
                        ),
                    ),
                ),
            ));


        }

        public function get_users( $request ) {
            $User = new User();
            $response = $User->get_users();
            return $response;
        }

        public function get_user( $request ) {
            $User = new User();
            $user_id = $request['id'];

            $response = $User->get_user( $user_id );

            return $response;
        }

        public function create_user( $request ) {
            $User = new User();
            $data = $request->get_json_params();
            $response = $User->create_user( $data );

            return $response;
        }

        public function update_user( $request ) {
            $User = new User();

            $data = $request->get_json_params();
            $data['id'] = (int)$request['id'];
            $response = $User->update_user( $data );

            
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
            $data = $request['id'];

            $response = $room->get_room( $data );

            return $response;
        }

        public function get_rooms( $request ) {
            $room = new Room();

            $response = $room->get_rooms();
            return $response;

        }

        public function delete_room( $request ) {
            $room = new Room();
            $id = $request['id'];

            $response = $room->delete_room( $id );

            return $response;
        }

        public function update_room( $request ) {
            $room = new Room();
            $data = $request->get_json_params();
            $data['id'] = (int)$request['id'];

            $response = $room->update_room( $data );

            return $response;
        }

        
        /**
         * @TODO Set the correct user permissions in build. 
         */
        public function check_users_permission() {
            if ( current_user_can( 'read' ) ) {
                return new WP_Error( 'rest_forbidden', esc_html__( "You aren't allowed to go this way.", 'joeee-booking' ));
            }
            return true;
        }

        public function check_users_permission_admin() {
            if ( !current_user_can( 'edit_others_pages' ) ) {
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
                    'nationality' => array(
                        'description'  => esc_html__( 'The users nationality.', 'joeee-booking' ),
                        'type'         => 'integer',
                        'context'      => array('view', 'edit'),
                    ),
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
<?php
/**
 * Class Activator_Test
 *
 * @package Joeee_Booking
 */

/**
 * Activators test case.
 */


class Activator_Test extends WP_UnitTestCase {
    
    
    // 
    // public $table_address = $wpdb->prefix . "joeee_address";
    // public $table_fellow = $wpdb->prefix . "joeee_fellow_traveler";
    // public $table_country = $wpdb->prefix . "joeee_country";
    // public $table_room = $wpdb->prefix . "joeee_room";
    // public $table_reservation = $wpdb->prefix . "joeee_reservation";
    // public $table_booked = $wpdb->prefix . "joeee_room_booked";
    
    public function setUp() {
        parent::setUp();
        global $wpdb;

        wp_set_current_user( self::factory()->user->create( [
            'role' => 'administrator',
        ] ) );
        set_current_screen( 'edit-post' );
        
    }

    public function test_if_db_users_exists() {
        global $wpdb;
        $table_users = $wpdb->prefix . "users";
        $this->assertEquals($wpdb->get_var("SHOW TABLES LIKE '$table_users'"), $table_users);
    }

    public function test_if_db_person_exists() {
        global $wpdb;
        $table_person = $wpdb->prefix . "joeee_person";
        $this->assertEquals($wpdb->get_var("SHOW TABLES LIKE '$table_person'"), $table_person);
    }
}
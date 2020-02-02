<?php
/**
 * Class Calendar_Menu
 *
 * @package Joeee_Booking
 */

/**
 * Calendar Menu test case.
 */



class Calendar_Menu_Test extends WP_UnitTestCase {

    public function setUp() {
        parent::setUp();
     

        wp_set_current_user( self::factory()->user->create( [
            'role' => 'administrator',
        ] ) );
        set_current_screen( 'edit-post' );
        
    }

    public function test_if_is_admin() {
     $user_role = current_user_can( 'manage_options' );
     $this->assertEquals(true, $user_role);
    }
    
    public function test_calendar_menu() {

        echo menu_page_url('joeee-booking-calendar', false);
        $this->assertNotEmpty( menu_page_url( 'joeee-booking-calendar', false ) );
        
        
    }
}
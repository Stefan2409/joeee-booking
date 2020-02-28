<?php
/**
 * Class Activator_Test
 *
 * @package Joeee_Booking
 */

/**
 * Activators test case.
 */
use Joeee_Booking\Core\Activator as Activator;

class Activator_Test extends WP_UnitTestCase {
    
    
    // 
    // 

    
    public function setUp() {
    
        parent::setUp();

        $this->class_instance = new Activator();
        
        
    }

    public function test_if_db_person_exists() {
        $this->class_instance->activate();
        global $wpdb;
        $userid = $this->factory()->user->create([
            'user_email' => 'testuser@example.com',
            'user_pass' => '12345',
            'user_login' => 'hello',
            'user_role' => 4,
            'role' => 4
                ]);


        $table_person = $wpdb->prefix . "joeee_person";
        $table_address = $wpdb->prefix . "joeee_address";

        $address_table_exists = $wpdb->insert(
            $table_address,
            array(
                'user_id' => $userid,
                'street' => 'Hörnesgasse 19234',
                'zip' => 2345,
                'city' => 'Hong Kong',
                'state_id' => 1,    
            )
            );
        
        $exists = $wpdb->insert(
            $table_person,
            array(
                'user_id' => $userid,
                'first_name' => 'Testuser',
                'last_name' => 'Test Last Name',
                'gender' => 0,
                'address_id' => 1,
                'birth' => '1984-04-05',
                'nationality_id' => 2
            ),
            array('%d', '%s', '%s', '%d', '%d', '%s', '%d')
        );
        $this->assertEquals(1, $exists);

    }

    public function tearDown() {
        global $wpdb;
        $table_person = $wpdb->prefix . "joeee_person";
        $table_address = $wpdb->prefix . "joeee_address";
        $table_fellow = $wpdb->prefix . "joeee_fellow_traveler";
        $table_country = $wpdb->prefix . "joeee_country";
        $table_room = $wpdb->prefix . "joeee_room";
        $table_reservation = $wpdb->prefix . "joeee_reservation";
        $table_booked = $wpdb->prefix . "joeee_room_booked";

        $person_fk = [];
        for($i = 1; $i <= 3; $i++) {
            array_push( $person_fk, $table_person . "_ibfk_" . $i);
        }

        $fellow_fk = [];
        for($i = 1; $i <= 2; $i++) {
            array_push( $fellow_fk, $table_fellow . "_ibfk_" . $i);
        }


        foreach( $person_fk as $pers_fk ) {
            $wpdb->query("ALTER TABLE $table_person DROP FOREIGN KEY $pers_fk");
        }
        foreach( $fellow_fk as $fell_fk ) {
            $wpdb->query("ALTER TABLE $table_fellow DROP FOREIGN KEY $fell_fk");
        }
        $address_fk = $table_address . "_ibfk_1";
        $reservation_fk = $table_reservation . "_ibfk_1";
        $booked_fk = $table_booked . "_ibfk_1";

        $wpdb->query("ALTER TABLE $table_address DROP FOREIGN KEY $address_fk");
        $wpdb->query("ALTER TABLE $table_reservation DROP FOREIGN KEY $reservation_fk");
        $wpdb->query("ALTER TABLE $table_booked DROP FOREIGN KEY $booked_fk");


        $tables = [ $table_fellow, $table_reservation, $table_person, $table_booked, $table_address, $table_room, $table_country ];

        foreach($tables as $table) {
            $wpdb->query("DROP TABLE IF EXISTS $table");
        }
    } 
}
<?php
/**
 * Class Activator_Test
 *
 * @package Joeee_Booking
 */

/**
 * Rooms test case.
 */
use Joeee_Booking\Core\Activator as Activator;
use Joeee_Booking\Core\Room as Room;

class Rooms_Test extends WP_UnitTestCase
{
    protected $room_creation_data = [
        "id" => null,
        "number" => "107",
        "floor" => 1,
        "capacity" => 2,
        "price" => 36.5,
        "active" => true,
    ];

    protected $room_modify_data = [
        "id" => 1,
        "number" => "107",
        "floor" => 1,
        "capacity" => 2,
        "price" => 34.5,
        "active" => true,
    ];

    public function setUp()
    {

        parent::setUp();

        $this->class_instance = new Activator();
    }

    public function test_room_creation()
    {
        $this->class_instance->activate();
        $room = new Room();

        $id = $room->create_room($this->room_creation_data);
        $this->assertEquals(true, $id);
    }

    public function test_room_update()
    {
        $this->class_instance->activate();
        $room = new Room();

        $room_id = $room->create_room($this->room_creation_data);
        $id = $room->update_room($this->room_modify_data);

        $this->assertEquals(true, $room_id);
        $this->assertEquals(array("success" => "Room updated."), $id);
    }

    public function test_get_rooms()
    {
        $this->class_instance->activate();
        $room = new Room();

        $room_id = $room->create_room($this->room_creation_data);
        $this->assertEquals(1, $room_id);

        $rooms = $room->get_rooms();
        $this->assertEquals(array(array(
            'id' => 1,
            'title' => "107",
            'capacity' => 2,
        )), $rooms);
    }

    public function test_get_room()
    {
        $this->class_instance->activate();
        $room = new Room();

        $room_id = $room->create_room($this->room_creation_data);
        $this->assertEquals(1, $room_id);

        $expected = $this->room_creation_data;

        $expected['id'] = 1;
        $expected['active'] = 1;

        $rooms = $room->get_room(1);
        $this->assertEquals($expected, $rooms);
    }

    public function test_get_room_empty()
    {
        $this->class_instance->activate();
        $room = new Room();

        $rooms = $room->get_room(1);
        $this->assertEquals(true, is_wp_error($rooms));

        $this->assertEquals('There is no room with your given ID!', $rooms->get_error_message());
    }

    public function test_get_room_without_id()
    {
        $this->class_instance->activate();
        $room = new Room();

        $rooms = $room->get_room();
        $this->assertEquals(true, is_wp_error($rooms));

        $this->assertEquals('A valid ID is required!', $rooms->get_error_message());
    }

    public function tearDown()
    {
        global $wpdb;
        $table_person = $wpdb->prefix . "joeee_person";
        $table_address = $wpdb->prefix . "joeee_address";
        $table_fellow = $wpdb->prefix . "joeee_fellow_traveler";
        $table_country = $wpdb->prefix . "joeee_country";
        $table_room = $wpdb->prefix . "joeee_room";
        $table_reservation = $wpdb->prefix . "joeee_reservation";
        $table_booked = $wpdb->prefix . "joeee_room_booked";

        $person_fk = [];
        for ($i = 1; $i <= 3; $i++) {
            array_push($person_fk, $table_person . "_ibfk_" . $i);
        }

        $fellow_fk = [];
        for ($i = 1; $i <= 2; $i++) {
            array_push($fellow_fk, $table_fellow . "_ibfk_" . $i);
        }

        foreach ($person_fk as $pers_fk) {
            $wpdb->query("ALTER TABLE $table_person DROP FOREIGN KEY $pers_fk");
        }
        foreach ($fellow_fk as $fell_fk) {
            $wpdb->query("ALTER TABLE $table_fellow DROP FOREIGN KEY $fell_fk");
        }
        $address_fk = $table_address . "_ibfk_1";
        $reservation_fk = $table_reservation . "_ibfk_1";
        $booked_fk = $table_booked . "_ibfk_1";

        $wpdb->query("ALTER TABLE $table_address DROP FOREIGN KEY $address_fk");
        $wpdb->query("ALTER TABLE $table_reservation DROP FOREIGN KEY $reservation_fk");
        $wpdb->query("ALTER TABLE $table_booked DROP FOREIGN KEY $booked_fk");

        $tables = [$table_fellow, $table_reservation, $table_person, $table_booked, $table_address, $table_room, $table_country];

        foreach ($tables as $table) {
            $wpdb->query("DROP TABLE IF EXISTS $table");
        }
    }
}

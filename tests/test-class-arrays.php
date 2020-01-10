<?php
/**
 * Class Arrays_Test
 *
 * @package Joeee_Booking
 */

/**
 * Arrays test case.
 */
use Joeee_Booking\Common\Utilities\Arrays as Arrays;



class Arrays_Test extends WP_UnitTestCase {

    public function setUp() {
        parent::setUp();

        $this->class_instance = new Arrays();
    }
    
    public function test_flatten_multidim_array() {
        $output_array = ["test", "hallo", "Hello", "Geht"];
        $array_input = ["test", ["hallo", "Hello"], "Geht"];

        $array_out = $this->class_instance->flatten_array($array_input);

        $this->assertEquals($output_array, $$array_out);
    }

    public function test_sanitize_multiple_values() {
        $array_input = ["Stefan", "Roland", "Christian", "Thomas"];
        $array_allowed = ["Thomas", "Stefan"];

        $array_out = $this->class_instance->test_sanitize_multiple_values($array_input, $array_allowed);

        $this->assertEquals(["Thomas", "Stefan"], $array_out);


    }

    public function test_sanitize_multiple_values_json() {
        $input_string = "Stefan, Thomas, Roland, Christian";
        $array_allowed = ["Thomas", "Stefan"];

        

        $array_out = $this->class_instance->test_sanitize_multiple_values($input_string, $array_allowed);

        $this->assertEquals(json_encode($array_allowed), $array_out);



}
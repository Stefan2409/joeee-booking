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

class Arrays_Test extends WP_UnitTestCase
{

    public function setUp()
    {
        parent::setUp();

        $this->class_instance = new Arrays();
    }

    public function test_flatten_multidim_array()
    {
        $output_array = ["test", "hallo", "Hello", "Geht"];
        $array_input = ["test", ["hallo", "Hello"], "Geht"];

        $array_out = $this->class_instance->flattenArray($array_input);

        $this->assertEquals($output_array, $array_out);
    }
}

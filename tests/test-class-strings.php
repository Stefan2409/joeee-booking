<?php
/**
 * Class Strings_Test
 *
 * @package Joeee_Booking
 */

/**
 * STrings test case.
 */
use Joeee_Booking\Common\Utilities\Strings as Strings;

class Strings_Test extends WP_UnitTestCase
{
    /**
     * Tests the methods of the Strings class
     */

    public function setUp()
    {
        parent::setUp();

        $this->class_instance = new Strings();
    }

    public function test_string_ends_with()
    {
        $input_string = "Hello, World! Are we still waiting?";
        $search_string = "we still waiting?";

        $function_return = $this->class_instance->string_ends_with($input_string, $search_string);

        $this->assertTrue($function_return);
    }

    public function test_string_ends_with_too_long__search_string()
    {
        $input_string = "Hello, World! Are we still waiting?";
        $search_string = "Hello, World! Are we still waiting? No?";

        $function_return = $this->class_instance->string_ends_with($input_string, $search_string);

        $this->assertFalse($function_return);
    }

    public function test_string_ends_with_not_a_string()
    {
        $input_string = "Hello, World! Are we still waiting?";
        $search_string = 13;

        $function_return = $this->class_instance->string_ends_with($input_string, $search_string);

        $this->assertFalse($function_return);
    }
}

<?php
/**
 * Class Links_Test
 *
 * @package Joeee_Booking
 */

/**
 * Links test case.
 */
use Joeee_Booking\Common\Utilities\Links as Links;

class Links_Test extends WP_UnitTestCase
{

    public function setUp()
    {
        parent::setUp();

        $this->class_instance = new Links();
    }

    public function test_get_current_url()
    {
        $link = $this->class_instance->get_current_url();

        $this->assertEquals("http://example.org", $link);
    }
}

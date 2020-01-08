<?php
/**
 * Class SampleTest
 *
 * @package Joeee_Booking
 */

/**
 * Sample test case.
 */
use Joeee_Booking\Common\Utilities\Numbers as Numbers;

class Numbers_VerifyTest extends WP_UnitTestCase {

	/**
	 * A single example test.
	 */
    var $input_number = 34.55;
    var $output_number_pl0 = 35;
    var $output_number_pl1 = 34.60;
    var $output_number_pl2 = 34.55;

    public function setUp() {
        parent::setUp();

        $this->class_instance = new Numbers();
    }
	public function test_round_up() {
        $rounded = $this->class_instance->round_up($this->input_number);

        $this->assertEquals($this->output_number_pl0, $rounded);
		
	}
}

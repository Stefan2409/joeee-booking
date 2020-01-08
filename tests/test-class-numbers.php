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
    var $negative_number = -23.513;
    var $output_negative_number = -23;
    var $output_negative_number_pl1 = -23.5;
    var $output_negative_number_pl2 = -23.51;

    public function setUp() {
        parent::setUp();

        $this->class_instance = new Numbers();
    }
	public function test_round_up() {
        $rounded = $this->class_instance->round_up($this->input_number);

        $this->assertEquals($this->output_number_pl0, $rounded);
		
    }
    
    public function test_round_up_pl1() {
        $rounded = $this->class_instance->round_up($this->input_number, 1);

        $this->assertEquals($this->output_number_pl1, $rounded);
		
    }
    
    public function test_round_up_pl2() {
        $rounded = $this->class_instance->round_up($this->input_number, 2);

        $this->assertEquals($this->output_number_pl2, $rounded);
		
    }
    
    public function test_round_up_negative() {
        $rounded = $this->class_instance->round_up($this->negative_number);

        $this->assertEquals($this->output_negative_number, $rounded);
		
    }
    
    public function test_round_up_negative_pl1() {
        $rounded = $this->class_instance->round_up($this->negative_number, 1);

        $this->assertEquals($this->output_negative_number_pl1, $rounded);
		
    }
    
    public function test_round_up_negative_pl2() {
        $rounded = $this->class_instance->round_up($this->negative_number, 2);

        $this->assertEquals($this->output_negative_number_pl2, $rounded);
		
	}
}

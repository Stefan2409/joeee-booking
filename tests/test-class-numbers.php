<?php
/**
 * Class Numbers_Test
 *
 * @package Joeee_Booking
 */

/**
 * Numbers test case.
 */
use Joeee_Booking\Common\Utilities\Numbers as Numbers;

class Numbers_Test extends WP_UnitTestCase
{

    /**
     * Tests the methods of the Numbers class
     */
    public $input_number = 34.55;
    public $output_number_pl0 = 35;
    public $output_number_pl1 = 34.60;
    public $output_number_pl2 = 34.55;
    public $negative_number = -23.513;
    public $output_negative_number = -23;
    public $output_negative_number_pl1 = -23.5;
    public $output_negative_number_pl2 = -23.51;
    public $interval = 15;
    public $output_round_up_to_next = 45;

    public function setUp()
    {
        parent::setUp();

        $this->class_instance = new Numbers();
    }
    public function test_round_up()
    {
        $rounded = $this->class_instance->round_up($this->input_number);

        $this->assertEquals($this->output_number_pl0, $rounded);
    }

    public function test_round_up_pl1()
    {
        $rounded = $this->class_instance->round_up($this->input_number, 1);

        $this->assertEquals($this->output_number_pl1, $rounded);
    }

    public function test_round_up_pl2()
    {
        $rounded = $this->class_instance->round_up($this->input_number, 2);

        $this->assertEquals($this->output_number_pl2, $rounded);
    }

    public function test_round_up_negative()
    {
        $rounded = $this->class_instance->round_up($this->negative_number);

        $this->assertEquals($this->output_negative_number, $rounded);
    }

    public function test_round_up_negative_pl1()
    {
        $rounded = $this->class_instance->round_up($this->negative_number, 1);

        $this->assertEquals($this->output_negative_number_pl1, $rounded);
    }

    public function test_round_up_negative_pl2()
    {
        $rounded = $this->class_instance->round_up($this->negative_number, 2);

        $this->assertEquals($this->output_negative_number_pl2, $rounded);
    }

    public function test_round_up_to_next()
    {
        $rounded = $this->class_instance->round_up_to_next($this->input_number, $this->interval);

        $this->assertEquals($this->output_round_up_to_next, $rounded);
    }
}

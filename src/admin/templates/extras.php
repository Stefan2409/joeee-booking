<?php
// Abort if this file is called directly.
if (!defined('ABSPATH')) {
    exit;
}
global $wpdb;

$extras = array();
$table_extra = $wpdb->prefix . "joeee_extra";

$extra_query = "SELECT * FROM $table_extra";
$extra_result = $wpdb->get_results($extra_query);

if (isset($extra_result)) {
    $extras = $extra_result;
}
?>

<h1>Reservation Extras</h1>
<p><?php _e("Here you can define bookable extras for your rooms and if it's possible to book them from the frontend or not. (The price is per person per day!)", "joeee-booking");?></p>


<div class="joeee-booking-extras-content">
    <div class="joeee-booking-extras-content-window">
    <form action="" id="joeee-booking-extras-form">
        <table class="joeeee-booking-extras-table" id="joeee-booking-extras-table-dynamic">
            <tr>
                <td><h3>Extra</h3></td>
                <td><h3>Price</h3></td>
                <td><h3>Bookable</h3></td>
                <td></td>
            </tr>
            <?php foreach ($extras as $extra) {?>
            <tr>
                <td><input type="text" name="joeee-booking-extra-title" id="<?php echo 'joeee-booking-extra-title-id-' . $extra->id; ?>" value="<?php echo $extra->title; ?>"></td>
                <td><input type="text" name="joeee-booking-extra-price" id="<?php echo 'joeee-booking-extra-price-id-' . $extra->id; ?>" value="<?php echo $extra->price; ?>"></td>
                <td><input type="checkbox" name="joeee-booking-extra-bookable" id="<?php echo 'joeee-booking-extra-bookable-id-' . $extra->id; ?>" <?php if ($extra->bookable == 1) {echo "checked='checked'";}?> ></td>
                <td><button type="button" name="joeee-booking-extras-delete" class="button-delete" id="<?php echo 'joeee-booking-delete-id' . $extra->id; ?>">X</button><?php ?></td>
            </tr>
            <?php }?>
            <tr id="joeee-booking-extras-row0">
                <td><input type="text" name="name[]" placeholder="<?php esc_attr_e('Enter your extra', 'joeee-booking')?>" class="joeee-booking-form--extras-control"></td>
                <td><input type="text" name="price[]" placeholder="<?php esc_attr_e('Price', 'joeee-booking')?>" class="joeee-booking-form--extras-control"></td>
                <td><input type="checkbox" name="bookingonline" id="joeee-booking-extras-0" value="on"></td>
                <td><button type="button" name="joeee-booking-extras-add" id="joeee-booking-extras-add" class="button-primary"><?php _e("Add extra", "joeee-booking")?></button></td>
            </tr>
        </table>
        <input type="button" name="joeee-booking-extras-submit" id="joeee-booking-extras-submit" class="joeee-booking-submit-btn button-submit" value="<?php esc_attr_e('Save', 'joeee-booking')?>">
        <button name="joeee-booking-extra-cancel-btn" class="button-cancel" id="joeee-booking-extras-cancel-btn">Cancel</button>
    </form>
    </div>
</div>








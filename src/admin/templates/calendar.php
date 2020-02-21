<?php

?>

<div class="wrap">
    <h1><?php _e("Jö's Booking Calendar", 'joeee-booking'); ?></h1>
    <div id="joeeeBookingCalendar"></div>

</div>


<!-- Modal Section -->
<div class="joeee-booking-room-bg-modal">
    <div class="joeee-booking-room-modal-form-content">
        <div class="joeee-booking-room-close">+</div>
        <div class="joeee-booking-room-header">
            <h2>Rooms</h2>
        </div>
        <form id="joeee-roombooking-room-form" action="">
            <div class="joeee-booking-room-form-control">
                <input type="text" placeholder="Room Number" id="joeee-booking-room-roomnumber">
                <i class="dashicons dashicons-yes-alt"></i>
                <i class="dashicons dashicons-warning"></i>
                <small>Error message</small>
            </div>
            <div class="joeee-booking-room-form-control">
                <input type="text" placeholder="Floor Number" id="joeee-booking-room-floornumber">
                <i class="dashicons dashicons-yes-alt"></i>
                <i class="dashicons dashicons-warning"></i>
                <small>Error message</small>
            </div>
                <div class="joeee-booking-room-form-control">
                <input type="text" placeholder="Capacity" id="joeee-booking-room-capacity">
                <i class="dashicons dashicons-yes-alt"></i>
                <i class="dashicons dashicons-warning"></i>
                <small>Error message</small>
            </div>
            <div class="joeee-booking-room-form-control">
                <input type="text" placeholder="Price" id="joeee-booking-room-price">
                <i class="dashicons dashicons-yes-alt"></i>
                <i class="dashicons dashicons-warning"></i>
                <small>Error message</small>
            </div>
            <div class="joeee-booking-room-form-check">
                <input type="checkbox" name="joeee-booking-room-active" id="joeee-booking-room-active">
                <label for="room-active">Active</label>
            </div>
            <input type="submit" value="Save" id="joeee-booking-room-submit">
            <button class="joeee-booking-room-cancel-btn">Cancel</button>
        </form>
        <p class="joeee-booking-room-success">Success message</p>
        <p class="joeee-booking-room-error">Error message</p>

    </div>
</div>
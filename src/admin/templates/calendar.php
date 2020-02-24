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
            <h2><?php esc_html_e('Rooms', 'joeeee-booking') ?></h2>
        </div>
        <form id="joeee-roombooking-room-form" action="">
            <div class="joeee-booking-room-id">
                <input type="hidden" name="roomID" id="joeee-booking-room-id" value="null">
            </div>
            <div class="joeee-booking-room-form-control">
                <input type="text" placeholder="<?php esc_attr_e('Room Number', 'joeee-booking') ?>" id="joeee-booking-room-roomnumber">
                <i class="dashicons dashicons-yes-alt"></i>
                <i class="dashicons dashicons-warning"></i>
                <small>Error message</small>
            </div>
            <div class="joeee-booking-room-form-control">
                <input type="text" placeholder="<?php esc_attr_e('Floor Number', 'joeee-booking') ?>" id="joeee-booking-room-floornumber">
                <i class="dashicons dashicons-yes-alt"></i>
                <i class="dashicons dashicons-warning"></i>
                <small>Error message</small>
            </div>
                <div class="joeee-booking-room-form-control">
                <input type="text" placeholder="<?php esc_attr_e('Capacity', 'joeee-booking') ?>" id="joeee-booking-room-capacity">
                <i class="dashicons dashicons-yes-alt"></i>
                <i class="dashicons dashicons-warning"></i>
                <small>Error message</small>
            </div>
            <div class="joeee-booking-room-form-control">
                <input type="text" placeholder="<?php esc_attr_e('Price', 'joeee-booking') ?>" id="joeee-booking-room-price">
                <i class="dashicons dashicons-yes-alt"></i>
                <i class="dashicons dashicons-warning"></i>
                <small>Error message</small>
            </div>
            <div class="joeee-booking-room-form-check">
                <input type="checkbox" name="joeee-booking-room-active" id="joeee-booking-room-active">
                <label for="room-active"><?php _e("Active", "joeee-booking") ?></label>
            </div>
            <input type="submit" value="<?php esc_attr_e('Save', 'joeee-booking') ?>" id="joeee-booking-room-submit">
            <button class="joeee-booking-room-cancel-btn"><?php _e("Cancel", "joeee-booking") ?></button>
            <button class="joeee-booking-room-delete-btn"><?php _e("Delete room", "joeee-booking") ?></button>
        </form>
        <p class="joeee-booking-room-success">Success message</p>
        <p class="joeee-booking-room-error">Error message</p>

    </div>
</div>
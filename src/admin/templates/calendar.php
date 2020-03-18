<?php

// Abort if this file is called directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
    global $wpdb;
    $table_country = $wpdb->prefix . "joeee_country";

    $country_data = array();
    $db_query = "SELECT * FROM $table_country";

    $query_result = $wpdb->get_results( $db_query );

    if( isset($query_result) ){
        foreach( $query_result as $row ) {


            $country_data[] = array(
                'id'        => $row->id,
                'en_name'     => $row->en_name,
                'de_name'     => $row->de_name,
            );
        }   
    }

    $table_extras = $wpdb->prefix . "joeee_extra";

    $extra_data = array();

    $extra_query = "SELECT id, title FROM $table_extras;";

    $extra_result = $wpdb->get_results( $extra_query );

    if( isset($extra_result) ) {
        foreach( $extra_result as $extra ) {
            $extra_data[] = array(
                'id'    => $extra->id,
                'title' => $extra->title,
            );
        }
    }


?>

<div class="wrap">
    <h1><?php _e("Jö's Booking Calendar", 'joeee-booking'); ?></h1>
    <div id="joeeeBookingCalendar"></div>

</div>


<!-- Modal Section -->
<div class="joeee-booking-room-bg-modal">
    <div class="joeee-booking-room-modal-cont">
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
                    <label for="joeee-booking-room-roomnumber"><?php esc_html_e('Room Number', 'joeee-booking') ?></label>
                    <input type="text" placeholder="<?php esc_attr_e('Room Number', 'joeee-booking') ?>" id="joeee-booking-room-roomnumber">
                    <i class="dashicons dashicons-yes-alt"></i>
                    <i class="dashicons dashicons-warning"></i>
                    <small>Error message</small>
                </div>
                <div class="joeee-booking-room-form-control">
                    <label for="joeee-booking-room-floornumber"><?php esc_html_e('Floor Number', 'joeee-booking') ?></label>
                    <input type="text" placeholder="<?php esc_attr_e('Floor Number', 'joeee-booking') ?>" id="joeee-booking-room-floornumber">
                    <i class="dashicons dashicons-yes-alt"></i>
                    <i class="dashicons dashicons-warning"></i>
                    <small>Error message</small>
                </div>
                <div class="joeee-booking-room-form-control">
                    <label for="joeee-booking-room-adults"><?php esc_html_e('Adults', 'joeee-booking') ?></label>
                    <input type="number" placeholder="<?php esc_attr_e('Adults', 'joeee-booking') ?>" id="joeee-booking-room-adults">
                    <i class="dashicons dashicons-yes-alt"></i>
                    <i class="dashicons dashicons-warning"></i>
                    <small>Error message</small>
                </div>
                <div class="joeee-booking-room-form-control">
                    <label for="joeee-booking-room-kids"><?php esc_html_e('Kids', 'joeee-booking') ?></label>
                    <input type="number" placeholder="<?php esc_attr_e('Kids', 'joeee-booking') ?>" id="joeee-booking-room-kids">
                    <i class="dashicons dashicons-yes-alt"></i>
                    <i class="dashicons dashicons-warning"></i>
                    <small>Error message</small>
                </div>
                <div class="joeee-booking-room-form-control">
                    <label for="joeee-booking-room-price"><?php esc_html_e('Price', 'joeee-booking') ?></label>
                    <input type="text" placeholder="<?php esc_attr_e('Price', 'joeee-booking') ?>" id="joeee-booking-room-price">
                    <i class="dashicons dashicons-yes-alt"></i>
                    <i class="dashicons dashicons-warning"></i>
                    <small>Error message</small>
                </div>
                <div class="joeee-booking-room-form-control">
                    <label for="joeee-booking-room-desc"><?php esc_html_e('Description', 'joeee-booking') ?></label>
                    <textarea name="joeee-booking-room-desc" id="joeee-booking-room-desc" cols="30" rows="10" form="joeee-roombooking-room-form"></textarea>
                    <i class="dashicons dashicons-yes-alt"></i>
                    <i class="dashicons dashicons-warning"></i>
                    <small>Error message</small>
                </div>
                <div class="joeee-booking-room-form-check">
                    <input type="checkbox" name="joeee-booking-room-active" id="joeee-booking-room-active" value="on">
                    <label for="room-active"><?php _e("Active", "joeee-booking") ?></label>
                </div>
                <input type="submit" value="<?php esc_attr_e('Save', 'joeee-booking') ?>" id="joeee-booking-room-submit" class="button-submit">
                <input type="submit" value="<?php esc_attr_e('Save', 'joeee-booking') ?>" id="joeee-booking-room-form-submit-modify" class="button-submit">
                <button class="joeee-booking-room-cancel-btn button-cancel"><?php _e("Cancel", "joeee-booking") ?></button>
                <button class="joeee-booking-room-delete-btn button-delete"><?php _e("Delete room", "joeee-booking") ?></button>
            </form>
            <p class="joeee-booking-room-success">Success message</p>
            <p class="joeee-booking-room-error">Error message</p>

        </div>
    </div>
</div>
<div class="joeee-booking-reservation-bg-modal">
    <div class="joeee-booking-reservation-modal-form-content">
        <div class="joeee-booking-reservation-modal-form-content-left">
            <div class="joeee-booking-reservation-header">
                <h2><?php esc_html_e('Reservations', 'joeeee-booking') ?></h2>
            </div>
            <form id="joeee-booking-reservation-form" action="">
                <div class="joeee-booking-reservation-id">
                    <input type="hidden" name="reservationID" id="joeee-booking-reservation-id" value="null">
                </div>
                <div class="joeee-booking-reservation-roomid">
                    <input type="hidden" name="reservationRoomID" id="joeee-booking-reservation-roomid" value="null">
                </div>
                <div class="joeee-booking-reservation-form-control">
                    <label for="joeee-booking-reservation-arrival"><?php esc_html_e('Arrival', 'joeee-booking') ?></label>
                    <input type="date" name="reservationArrival" id="joeee-booking-reservation-arrival">
                    <i class="dashicons dashicons-yes-alt"></i>
                    <i class="dashicons dashicons-warning"></i>
                    <small>Error message</small>
                </div>
                <div class="joeee-booking-reservation-form-control">
                    <label for="joeee-booking-reservation-departure"><?php esc_html_e('Departure', 'joeee-booking') ?></label>
                    <input type="date" name="reservationDeparture" placeholder="<?php esc_attr_e('Departure', 'joeee-booking') ?>" id="joeee-booking-reservation-departure">
                    <i class="dashicons dashicons-yes-alt"></i>
                    <i class="dashicons dashicons-warning"></i>
                    <small>Error message</small>
                </div>
                <div class="joeee-booking-reservation-form-control">
                    <label for="joeee-booking-reservation-persons"><?php esc_html_e('Adults', 'joeee-booking') ?></label>
                    <input type="number" name="reservationPersons" min="1" value="1" placeholder="<?php esc_attr_e('Adults', 'joeee-booking') ?>" id="joeee-booking-reservation-persons">
                    <i class="dashicons dashicons-yes-alt"></i>
                    <i class="dashicons dashicons-warning"></i>
                    <small>Error message</small>
                </div>
                <div class="joeee-booking-reservation-form-control">
                    <label for="joeee-booking-reservation-kids"><?php esc_html_e('Kids', 'joeee-booking') ?></label>
                    <input type="number" name="reservationKids" min="0" value="0" placeholder="<?php esc_attr_e('Kids', 'joeee-booking') ?>" id="joeee-booking-reservation-kids">
                    <i class="dashicons dashicons-yes-alt"></i>
                    <i class="dashicons dashicons-warning"></i>
                    <small>Error message</small>
                </div>
                    <?php foreach( $extra_data as $extra ) {
                        $title = $extra['title'];
                        $id = $extra['id'];
                        echo ' <div class="joeee-booking-reservation-form-control">';
                            echo '<label for="extra-id' . $id . '">' . $title . '</label>';
                            echo '<input type="number" min="0" value="0" name="' . $title . '" id="extra-id' . $id . '" >';
                        echo '</div>';
                    }
                    ?>
                <div class="joeee-booking-reservation-form-control">
                    <label for="joeee-booking-reservation-email"><?php esc_html_e('E-Mail', 'joeee-booking') ?></label>
                    <input type="email" name="reservationEmail" placeholder="<?php esc_attr_e('E-Mail', 'joeee-booking') ?>" id="joeee-booking-reservation-email">
                    <i class="dashicons dashicons-yes-alt"></i>
                    <i class="dashicons dashicons-warning"></i>
                    <small>Error message</small>
                </div>
                <div class="joeee-booking-reservation-form-control">
                    <label for="joeee-booking-reservation-firstname"><?php esc_html_e('First Name', 'joeee-booking') ?></label>
                    <input type="text" name="reservationFirstName" placeholder="<?php esc_attr_e('First Name', 'joeee-booking') ?>" id="joeee-booking-reservation-firstname">
                    <i class="dashicons dashicons-yes-alt"></i>
                    <i class="dashicons dashicons-warning"></i>
                    <small>Error message</small>
                </div>
                <div class="joeee-booking-reservation-form-control">
                    <label for="joeee-booking-reservation-lastname"><?php esc_html_e('Last Name', 'joeee-booking') ?></label>
                    <input type="text" name="reservationLastName" placeholder="<?php esc_attr_e('Last Name', 'joeee-booking') ?>" id="joeee-booking-reservation-lastname">
                    <i class="dashicons dashicons-yes-alt"></i>
                    <i class="dashicons dashicons-warning"></i>
                    <small>Error message</small>
                </div>
                <div class="joeee-booking-reservation-form-control">
                    <label for="joeee-booking-reservation-nationality"><?php esc_html_e('Nationality', 'joeee-booking') ?></label>
                    <select name="nationalityselect" id="joeee-booking-nationality-select">
                        <option disabled selected><?php esc_html_e('Please select country', 'joeee-booking')?></option>
                        <?php foreach( $country_data as $country ) {?>
                        <option value="<?php echo $country['id'] ?>"><?php echo $country['en_name'] ?></option>
                        <?php }?>
                    </select>
                </div>
            </div>
            <div class="joeee-booking-reservation-modal-form-content-right">
                    <div class="joeee-booking-reservation-close">+</div>
                    <div class="joeee-booking-reservation-header">
                        <h2></h2>
                    </div>
                    <div class="joeee-booking-reservation-form-control right">
                    <label for="joeee-booking-reservation-confirm"><?php esc_html_e('Gender', 'joeee-booking') ?></label>
                    <select name="genderselect" id="joeee-booking-reservation-confirm">
                    <option disabled selected><?php esc_html_e('Please select confirmation status')?></option>
                    <option value="1"><?php esc_html_e( 'Confirmed', 'joeee-booking' ) ?></option>
                    <option value="2"><?php esc_html_e( 'Pending', 'joeee-booking' ) ?></option>
                    <option value="3"><?php esc_html_e( 'Reject', 'joeee-booking' ) ?></option>
                    </select>
                    </div>
                    <div class="joeee-booking-reservation-form-control">
                    <label for="joeee-booking-reservation-gender"><?php esc_html_e('Gender', 'joeee-booking') ?></label>
                    <select name="genderselect" id="joeee-booking-reservation-gender">
                    <option disabled selected><?php esc_html_e('Please select a gender')?></option>
                    <option value="1"><?php esc_html_e( 'Male', 'joeee-booking' ) ?></option>
                    <option value="2"><?php esc_html_e( 'Female', 'joeee-booking' ) ?></option>
                    </select>
                    </div>
                    <div class="joeee-booking-reservation-form-control">
                        <label for="joeee-booking-reservation-birthday"><?php esc_html_e('Date of birth', 'joeee-booking') ?></label>
                        <input type="date" name="reservationBirthday" placeholder="<?php esc_attr_e('Date of birth', 'joeee-booking') ?>" id="joeee-booking-reservation-birthday">
                        <i class="dashicons dashicons-yes-alt"></i>
                        <i class="dashicons dashicons-warning"></i>
                        <small>Error message</small>
                    </div>
                    <div class="joeee-booking-reservation-form-control">
                        <label for="joeee-booking-reservation-tin"><?php esc_html_e('TIN', 'joeee-booking') ?></label>
                        <input type="text" name="reservationTIN" placeholder="<?php esc_attr_e('TIN', 'joeee-booking') ?>" id="joeee-booking-reservation-tin">
                        <i class="dashicons dashicons-yes-alt"></i>
                        <i class="dashicons dashicons-warning"></i>
                        <small>Error message</small>
                    </div>
                    <div class="joeee-booking-reservation-form-control">
                        <label for="joeee-booking-reservation-street"><?php esc_html_e('Street/House Nr.', 'joeee-booking') ?></label>
                        <input type="text" name="reservationStreet" placeholder="<?php esc_attr_e('Street/House Nr.', 'joeee-booking') ?>" id="joeee-booking-reservation-street">
                        <i class="dashicons dashicons-yes-alt"></i>
                        <i class="dashicons dashicons-warning"></i>
                        <small>Error message</small>
                    </div>
                    <div class="joeee-booking-reservation-form-control">
                        <label for="joeee-booking-reservation-zip"><?php esc_html_e('ZIP', 'joeee-booking') ?></label>
                        <input type="text" name="reservationZip" placeholder="<?php esc_attr_e('ZIP', 'joeee-booking') ?>" id="joeee-booking-reservation-zip">
                        <i class="dashicons dashicons-yes-alt"></i>
                        <i class="dashicons dashicons-warning"></i>
                        <small>Error message</small>
                    </div>
                    <div class="joeee-booking-reservation-form-control">
                        <label for="joeee-booking-reservation-city"><?php esc_html_e('City', 'joeee-booking') ?></label>
                        <input type="text" name="reservationCity" placeholder="<?php esc_attr_e('City', 'joeee-booking') ?>" id="joeee-booking-reservation-city">
                        <i class="dashicons dashicons-yes-alt"></i>
                        <i class="dashicons dashicons-warning"></i>
                        <small>Error message</small>
                    </div>
                    <div class="joeee-booking-reservation-form-control">
                        <label for="joeee-booking-reservation-country"><?php esc_html_e('Country', 'joeee-booking') ?></label>
                        <select name="countryselect" id="joeee-booking-country-select">
                            <option disabled selected><?php esc_html_e('Please select country')?></option>
                            <?php foreach( $country_data as $country ) {?>
                            <option value="<?php echo $country['id'] ?>"><?php echo $country['en_name'] ?></option>
                            <?php }?>
                        </select>
                    </div>
                    <table id="joeee-booking-reservation-free-rooms-table">
                    
                    </table>
                <input type="submit" value="<?php esc_attr_e('Save', 'joeee-booking') ?>" id="joeee-booking-reservation-submit" class="button-submit">
                <input type="submit" value="<?php esc_attr_e('Save', 'joeee-booking') ?>" id="joeee-booking-reservation-form-submit-modify" class="button-submit">
                <button class="joeee-booking-reservation-cancel-btn button-cancel"><?php _e("Cancel", "joeee-booking") ?></button>
                <button class="joeee-booking-reservation-delete-btn button-cancel"><?php _e("Delete reservation", "joeee-booking") ?></button>
            </form>
            <p class="joeee-booking-reservation-success">Success message</p>
            <p class="joeee-booking-reservation-error">Error message</p>
        </div>
    </div>
</div>
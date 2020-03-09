import $ from 'jquery';

const { __, _x, _n, _nx } = wp.i18n;

jQuery(document).ready(function() { 
    const EXTRASFORM = $('#joeee-booking-extras-form');
    const EXTRASADD = $('#joeee-booking-extras-add');
    const EXTRASCANCELBTN = $('#joeee-booking-extras-cancel-btn');
    const EXTRASSUBMIT = $('#joeee-booking-extras-submit');
    let i = 1;

	EXTRASADD.click( function() {
		i++;
		$('#joeee-booking-extras-table-dynamic').append('<tr id="joeee-booking-extras-row'+i+'"><td><input type="text" name="name[]" placeholder="Extra" class="joeee-booking-form--extras-control"></td><td><input type="text" name="price[]" placeholder="Price" class="joeee-booking-form--extras-control"></td><td><input type="checkbox" name="bookingonline" id="joeee-booking-extras-0" value="on"></td><td><button type="button" name="remove" id="'+i+'" class="button-delete btn-remove">X</button></td></tr>');
	});

	$(document).on('click', '.btn-remove', function() {
		let button_id = $(this).attr("id");
		$('#joeee-booking-extras-row'+button_id).remove();
    });
    
    EXTRASSUBMIT.click(function(ev) {
        ev.preventDefault();

        let data = EXTRASFORM.serializeArray();
        console.log(data);

    });

    EXTRASCANCELBTN.click( function(ev) {
        ev.preventDefault();
        $('#joeee-booking-extras-row0 input').val('');
        $('#joeee-booking-extras-0').prop("checked", false);
        location.reload();

    });

});
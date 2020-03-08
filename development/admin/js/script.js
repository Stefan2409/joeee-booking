	/**
	 * All of the code for your admin-facing JavaScript source
	 * should reside in the file "development/admin/js/script.js".
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared (import $ from 'jquery')for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 *
	 * The file is enqueued from src/admin/class-assets.php.
	 */
import $ from 'jquery';
// @TODO This is an example import. Remove for production
import './components/test';
import { Calendar } from '@fullcalendar/core';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import calendarInteraction from '@fullcalendar/interaction';
import Room from './components/Room';
// Constants for internationalization purposes
const { __, _x, _n, _nx } = wp.i18n;



jQuery(document).ready(function() {
	const ROOMFORM = $('#joeee-roombooking-room-form');
	const ROOMID = $('#joeee-booking-room-id');
	const ROOMNUMBER = $('#joeee-booking-room-roomnumber');
	const FLOORNUMBER = $('#joeee-booking-room-floornumber');
	const ROOMADULTS = $('#joeee-booking-room-adults');
	const ROOMKIDS = $('#joeee-booking-room-kids');
	const ROOMPRICE = $('#joeee-booking-room-price');
	const ROOMDESC = $('#joeee-booking-room-desc');
	const ROOMACTIVE = $('#joeee-booking-room-active');
	const ROOMSUBMITBTN = $('#joeee-booking-room-submit');
	const ROOMSUBMITMODIFY = $('#joeee-booking-room-form-submit-modify');
	const ROOMDELETEBTN = $('.joeee-booking-room-delete-btn');
	const ROOMCANCELBTN = $('.joeee-booking-room-cancel-btn');

	const RESCANCELBTN = $('.joeee-booking-reservation-cancel-btn');
	const RESBGMODAL = $(".joeee-booking-reservation-bg-modal");
	const RESROOMID = $('#joeee-booking-reservation-roomid');
	const RESARRIVAL = $("#joeee-booking-reservation-arrival");
	const RESDEPARTURE = $("#joeee-booking-reservation-departure");
	const RESPERSONS = $('#joeee-booking-reservation-persons');
	const RESEMAIL = $('#joeee-booking-reservation-email');
	const RESFIRSTNAME = $('#joeee-booking-reservation-firstname');
	const RESLASTNAME = $('#joeee-booking-reservation-lastname');
	const RESNATIONALITY = $('#joeee-booking-nationality-select');
	const RESGENDER = $('#joeee-booking-reservation-gender');
	const RESBIRTHDAY = $('#joeee-booking-reservation-birthday');
	const RESSTREET = $('#joeee-booking-reservation-street');
	const RESZIP = $('#joeee-booking-reservation-zip');
	const RESCITY = $('#joeee-booking-reservation-city');
	const RESCOUNTRY = $('#joeee-booking-country-select');
	const RESSUBMIT = $('#joeee-booking-reservation-submit');

	
	




	function cancel(ev, comesfrom) {
		ev.preventDefault();
		if( comesfrom === "room" ) {
			$('#joeee-roombooking-room-form').trigger('reset');
			$('.joeee-booking-room-bg-modal').css("display", "none");
		}
		if( comesfrom === "reservation" ) {
			$('#joeee-booking-reservation-form').trigger('reset');
			$('.joeee-booking-reservation-bg-modal').css("display", "none");
		}
		location.reload();
	}


	function emailIsValid (email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	function checkReservationFormInputs ( comesfrom ) {
		let formout = {};

		let arrival = RESARRIVAL.val();
		let departure = RESDEPARTURE.val();
		let persons = RESPERSONS.val();
		let email = RESEMAIL.val();
		let firstName = RESFIRSTNAME.val().trim();
		let lastName = RESLASTNAME.val().trim();
		let nationality = RESNATIONALITY.val();
		let gender = RESGENDER.val();
		let birthday = RESBIRTHDAY.val();
		let street = RESSTREET.val().trim();
		let zip = RESZIP.val().trim();
		let city = RESCITY.val().trim();
		let country = RESCOUNTRY.val();

		if( arrival === '' ) {
			setErrorFor( RESARRIVAL, __( 'The arrival date is required!', 'joeee-booking' ));
			return false;
		}
		else {
			setSuccessFor( RESARRIVAL );
			formout.booked_from = RESARRIVAL;
		}

		if( departure === '' ) {
			setErrorFor( RESDEPARTURE, __( 'The departure date is required!', 'joeee-booking' ));
			return false;
		}
		else {
			setSuccessFor( RESDEPARTURE );
			formout.booked_to = RESDEPARTURE;
		}
		

		if( isNaN( persons ) || persons === '' ) {
			setErrorFor(RESPERSONS, __( 'The persons field is required!', 'joeee-booking' ));
			return false;
		}
		else {
			setSuccessFor( RESPERSONS );
			formout.persons = persons;
		}

		if( email === "" || emailIsValid( email ) ) {
			formout.email = email;
			setSuccessFor( RESEMAIL );
		}
		else {
			setErrorFor(RESEMAIL, __( 'The E-Mail has a wrong format.', 'joeee-booking' ));
			return false;
		}

		if( typeof firstName === 'string' ) {
			setSuccessFor( RESFIRSTNAME );
			if( firstName !== "" ) {
				formout.first_name = firstName;
			}
		}
		else {
			setErrorFor( RESFIRSTNAME, __('The first name have to be in string format!', 'joeee-booking' ) );
			return false;
		}

		if ( lastName === "" || typeof lastName !== 'string' ) {
			setErrorFor( RESLASTNAME, __('The last name is required and has to be in string format', 'joeee-booking') );
			return false;
		}
		else {
			setSuccessFor( RESLASTNAME );
			formout.last_name = lastName;
		}

		formout.nationality = nationality;

		formout.gender = gender;
		
		if( birthday !== "" ) {
			setSuccessFor( RESBIRTHDAY );
			formout.birthday = birthday;
		}

		if( typeof street === 'string' ) {
			setSuccessFor( RESSTREET );
			formout.street = street;
		}
		else {
			setErrorFor( RESSTREET, __('The street has to be a string', 'joeee-booking') );
			return false;
		}

		if( typeof zip === 'string' || typeof zip === 'number' ) {
			setSuccessFor( RESZIP );
			formout.zip = zip;
		}
		else {
			setErrorFor( RESZIP, __('There is an error with your given zip.', 'joeee-booking' ));
			return false;
		}

		if( typeof city === 'string' ) {
			setSuccessFor( RESCITY );
			formout.city = city;
		}
		else {
			setErrorFor( RESCITY, __('The city has to be a string.', 'joeee-booking' ));
			return false;
		}

		formout.country = country;
		return formout;

	}

	function checkRoomFormInputs( comesfrom ) {
		let formout = {};

		let roomnumberValue = ROOMNUMBER.val().trim();
		let floornumberValue = FLOORNUMBER.val().trim();
		let roomAdultsValue = ROOMADULTS.val().trim();
		let roomKidsValue = ROOMKIDS.val().trim();
		let roompriceValue = ROOMPRICE.val().trim().replace(',', '.');
		let roomDescription = ROOMDESC.val().trim();
		
		if ( isNaN( roomnumberValue.toString() ) || roomnumberValue === '') {
			setErrorFor(ROOMNUMBER, __('The room number must be set as string!', 'joeee-booking'));
			return false;
		}
		else {
			setSuccessFor(ROOMNUMBER);
			formout.number = roomnumberValue.toString();
		}

		if ( isNaN( floornumberValue ) || floornumberValue === '') {
			setErrorFor(FLOORNUMBER, __('The floor number must be an integer!', 'joeee-booking'));
			return false;
		}
		else {
			setSuccessFor(FLOORNUMBER);
			formout.floor = floornumberValue;
		}

		if ( isNaN( roomAdultsValue ) || roomAdultsValue === '') {
			setErrorFor(ROOMADULTS, __('The adults must be an integer!', 'joeee-booking'));
			return false;
		}
		else {
			setSuccessFor(ROOMADULTS);
			formout.adults = parseInt(roomAdultsValue);
		}
		if ( isNaN( roomKidsValue ) || roomKidsValue === '') {
			setErrorFor(ROOMKIDS, __('The kids must be an integer!', 'joeee-booking'));
			return false;
		}
		else {
			setSuccessFor(ROOMKIDS);
			formout.kids = parseInt(roomAdultsValue);
		}
		if ( isNaN( roompriceValue ) || roompriceValue === '') {
			setErrorFor(ROOMPRICE, __('The price must be a float number!', 'joeee-booking'));
			return false;
		}
		else {
			setSuccessFor(ROOMPRICE);
			formout.price = parseFloat(roompriceValue);
		}
		if ( typeof roomDescription === 'string' ) {
			formout.description = roomDescription;
		}
		if ( ROOMACTIVE.is( ":checked" ) ) {
			formout.active = true;
		}
		else {
			formout.active = false;
		}
		return formout;
			
	}

	function setErrorFor(input, message) {
		const formControl = input.parent();
		const small = formControl.find('small');
		formControl.addClass('error');
		small.text(message);
	}
	
	function setSuccessFor(input) {
		const formControl = input.parent();
		formControl.addClass('success');
	}


	var setLocale = 'en';
	let calendarEl = document.getElementById('joeeeBookingCalendar');
	let calendar = new Calendar(calendarEl, {
		schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
		plugins: [ calendarInteraction, resourceTimelinePlugin ],
		aspectRatio: 1.5,
		resourceAreaWidth: '10%',
		slotDuration: '12:00',
		scrollTime: '00:00', // undo default 6am scrollTime
		locale: setLocale,
		header: {
			left: 'addRoom, addReservation, today, prev, next',
			center: 'title',
			right: 'resourceTimelineMonth, resourceTimelineWeek',
		},
		customButtons: {
			addRoom: {
				text: __('Add room', 'joeee-booking'),
				click: function() {
					$('.joeee-booking-room-bg-modal').css("display", "flex");
				}
				
			},
			addReservation: {
				text: __('Add reservation', 'joeee-booking'),
				click: function() {
					RESBGMODAL.css("display", "flex");
				}
			},
		},
		defaultView: 'resourceTimelineMonth',
		selectable: true,
		selectHelper: true,
		editable: true, // enable draggable events
		resourceColumns: [
			{
				labelText: __( 'Room', 'joeee-booking' ),
				field: 'title',
				width: '15px'
			},
			{
				labelText: __( 'Beds', 'joeee-booking' ),
				field: 'adults'
			},
		],
		resourceOrder: 'title',
		resources: {
			url: joeeeRest.restURL + 'joeee-booking/v1/room',
			method: 'GET'
		},
		resourceRender: function( renderInfo ) {
			renderInfo.el.addEventListener('click', function(){

				$.ajax({
					type: 'GET',
					dataType: 'json',
					contentType: 'application/json',
					url: joeeeRest.restURL + 'joeee-booking/v1/room/' + renderInfo.resource.id,
					success: function (data) {
						ROOMID.val(data.id);
						ROOMNUMBER.val(data.number);
						ROOMADULTS.val(data.adults);
						ROOMKIDS.val(data.kids);
						FLOORNUMBER.val(data.floor);
						ROOMPRICE.val(data.price);
						ROOMDESC.val(data.description);
						if( data.active == 1) {
							ROOMACTIVE.prop('checked', true);
						}
						else {
							ROOMACTIVE.prop('checked', false);
						}

						$('.joeee-booking-room-bg-modal').css("display", "flex");
						ROOMSUBMITBTN.addClass('close');
						ROOMSUBMITMODIFY.addClass('open');
						ROOMDELETEBTN.addClass('open');

					},
					error: function (data) {
						alert(__("Error by receiving the room information.", 'joeee-booking'));
					},
					beforeSend: function (xhr) {
						xhr.setRequestHeader('X-WP-Nonce', joeeeRest.restNonce);
					},
					data: "",
				});

			});
		},
		timeZone: 'UTC',
		events: [
			{id: '1', resourceId: '14', title: 'Test User', start: '2020-03-04T12:00:00', end: '2020-03-09T12:00:00', color: 'green' },
			{id: '2', resourceId: '16', title: 'Test User2', start: '2020-03-04T12:00:00', end: '2020-03-14T12:00:00' }
		],
		eventClick: function(info) {

			console.log('Event: ' + info.event.title);
		},
		select: function(arg) {
			let arrival = arg.start.toISOString().substr(0, 10);
			let departure = arg.end.toISOString().substr(0, 10);

			RESBGMODAL.css("display", "flex");
			RESROOMID.val( arg.resource.id );
			RESARRIVAL.val( arrival );
			RESDEPARTURE.val( departure );

			console.log(
				'select callback',
				arg.startStr,
				arg.endStr,
				arg.resource ? arg.resource.id : '(no resource)'
			);
		},
		dateClick: function(arg) {
			RESBGMODAL.css("display", "flex");
			let date = arg.date.toISOString().substr(0, 10);
			RESROOMID.val( arg.resource.id );
			RESARRIVAL.val( date );
			console.log(
				'dateClick',
				arg.date,
				arg.resource ? arg.resource.id : '(no resource)',
				arg.date.toISOString(),
				arg.date.toString()
			);
		}
	});
	calendar.render();

	$('.joeee-booking-room-close').click(function() {
		ROOMCANCELBTN.trigger('click');
	});

	$('.joeee-booking-reservation-close').click(function() {
		RESCANCELBTN.trigger('click');
	});

	$('#joeee-booking-room-submit').click(function(ev) {
		ev.preventDefault();
	
		
			
			let checked = checkRoomFormInputs( "submit" );
			if(checked) {

					$.ajax({
				type: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				url: joeeeRest.restURL + 'joeee-booking/v1/room',
				success: function (data) {
					let success = $('.joeee-booking-room-success');
					success.addClass('success');
					success.text( __('Saved changes successfully.', 'joeee-booking') );
					setTimeout(function() {
						ROOMCANCELBTN.trigger('click');
						location.reload();
					}, 2000);


				},
				error: function (data) {
					let err = data.responseJSON.message;
					let submitError = $('.joeee-booking-room-error');
					submitError.addClass('error');
					submitError.text(err);
				},
				beforeSend: function (xhr) {
					xhr.setRequestHeader('X-WP-Nonce', joeeeRest.restNonce);
				},
				data: JSON.stringify(checked),
			});
		}
		
	});

	ROOMCANCELBTN.click(function(ev) {cancel(ev, "room");});
	RESCANCELBTN.click(function(ev) {cancel(ev, "reservation");});


	$('#joeee-booking-room-form-submit-modify').click(function(ev) {
		ev.preventDefault();
	
		
			
			let checked = checkRoomFormInputs( "update" );
			if(checked) {

		$.ajax({
			type: 'PUT',
			dataType: 'json',
			contentType: 'application/json',
			url: joeeeRest.restURL + 'joeee-booking/v1/room/' + ROOMID.val(),
			success: function (data) {
				let success = $('.joeee-booking-room-success');
				success.addClass('success');
				success.text( __( 'Saved changes successfully.', 'joeee-booking' ) );
				setTimeout(function() {
					ROOMCANCELBTN.trigger('click');
				}, 1000);


			},
			error: function (data) {
				let err = data.responseJSON.message;
				let submitError = $('.joeee-booking-room-error');
				submitError.addClass('error');
				submitError.text(err);
			},
			beforeSend: function (xhr) {
				xhr.setRequestHeader('X-WP-Nonce', joeeeRest.restNonce);
			},
			data: JSON.stringify(checked),
		});
	}

	});

	ROOMDELETEBTN.click( function(ev) {
		ev.preventDefault();

		if( confirm( __('You really wanna delete this room? Every booking in this room will be removed too by doing so!', 'joeee-booking') ) ) {

			$.ajax({
				type: 'DELETE',
				dataType: 'json',
				contentType: 'application/json',
				url: joeeeRest.restURL + 'joeee-booking/v1/room/' + ROOMID.val(),
				success: function (data) {
					let success = $('.joeee-booking-room-success');
					success.addClass('success');
					success.text( __( 'Saved changes successfully.', 'joeee-booking' ) );
					setTimeout(function() {
						$('.joeee-booking-room-cancel-btn').trigger('click');
					}, 1000);


				},
				error: function (data) {
					let err = data.responseJSON.message;
					let submitError = $('.joeee-booking-room-error');

					submitError.addClass('error');
					submitError.text(err);
				},
				beforeSend: function (xhr) {
					xhr.setRequestHeader('X-WP-Nonce', joeeeRest.restNonce);
				},
				data: "",
			});
		}
		else {
			ROOMCANCELBTN.trigger('click');

		}

	});

	RESSUBMIT.click( function(ev) {
		ev.preventDefault();

		let checked = checkReservationFormInputs();

		

	
	});

	let i = 1;

	$('#joeee-booking-extras-add').click( function() {
		i++;
		$('#joeee-booking-extras-table-dynamic').append('<tr id="joeee-booking-extras-row'+i+'"><td><input type="text" name="name[]" placeholder="Extra" class="joeee-booking-form--extras-control"></td><td><input type="text" name="price[]" placeholder="Price" class="joeee-booking-form--extras-control"></td><td><input type="checkbox" name="bookingonline" id="joeee-booking-extras-0" value="on"></td><td><button type="button" name="remove" id="'+i+'" class="button-delete btn-remove">X</button></td></tr>');
	});

	$(document).on('click', '.btn-remove', function() {
		let button_id = $(this).attr("id");
		console.log(button_id);
		$('#joeee-booking-extras-row'+button_id).remove();
	});


	
});


	



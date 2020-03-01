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
	const ROOMCAPACITY = $('#joeee-booking-room-capacity');
	const ROOMPRICE = $('#joeee-booking-room-price');
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

	function checkRoomFormInputs( comesfrom ) {
		let formout = {};
		if ( comesfrom === "submit" ) {
				formout.id = null;			
		}

		let roomnumberValue = ROOMNUMBER.val().trim();
		let floornumberValue = FLOORNUMBER.val().trim();
		let roomcapacityValue = ROOMCAPACITY.val().trim();
		let roompriceValue = ROOMPRICE.val().trim().replace(',', '.');
		
		

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
			formout.floor = parseInt(floornumberValue);
		}

		if ( isNaN( roomcapacityValue ) || roomcapacityValue === '') {
			setErrorFor(ROOMCAPACITY, __('The capacity must be an integer!', 'joeee-booking'));
			return false;
		}
		else {
			setSuccessFor(ROOMCAPACITY);
			formout.capacity = parseInt(roomcapacityValue);
		}
		if ( isNaN( roompriceValue ) || roompriceValue === '') {
			setErrorFor(ROOMPRICE, __('The price must be a float number!', 'joeee-booking'));
			return false;
		}
		else {
			setSuccessFor(ROOMPRICE);
			formout.price = parseFloat(roompriceValue);
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
				field: 'capacity'
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
						ROOMCAPACITY.val(data.capacity);
						FLOORNUMBER.val(data.floor);
						ROOMPRICE.val(data.price);
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
	
});


	



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

const { __, _x, _n, _nx } = wp.i18n;


	// $.ajax({
	// 	type: 'POST',
	// 	url: joeeeRest.restURL + 'joeee-booking/v1/room/create',
	// 	beforeSend: function (xhr) {
	// 		xhr.setRequestHeader('X-WP-Nonce', joeeeRest.restNonce);
	// 	},
	// 	data: {
			
	// 	}
	// });


jQuery(document).ready(function() {

	function checkRoomFormInputs() {
		var formout = {id: false};

		const roomform = $('#joeee-roombooking-room-form');
		const roomnumber = $('#joeee-booking-room-roomnumber');
		const floornumber = $('#joeee-booking-room-floornumber');
		const roomcapacity = $('#joeee-booking-room-capacity');
		const roomprice = $('#joeee-booking-room-price');
		const roomactive = $('#joeee-booking-room-active');

		const roomnumberValue = roomnumber.val().trim();
		const floornumberValue = floornumber.val().trim();
		const roomcapacityValue = roomcapacity.val().trim();
		const roompriceValue = roomprice.val().trim();
		const roomactiveValue = roomactive.val().trim();
		

		if ( roomnumberValue.toString() == NaN || roomnumberValue === '') {
			setErrorFor(roomnumber, 'The room number must be set as string!');
			return false;
		}
		else {
			setSuccessFor(roomnumber);
			formout.number = roomnumberValue.toString();
		}

		if ( parseInt(floornumberValue) == NaN || floornumberValue === '') {
			setErrorFor(floornumber, 'The floor number must be an integer!');
			return false;
		}
		else {
			setSuccessFor(floornumber);
			formout.floor = parseInt(floornumberValue);
		}

		if ( parseInt(roomcapacityValue) == NaN || roomcapacityValue === '') {
			setErrorFor(roomcapacity, 'The capacity must be an integer!');
			return false;
		}
		else {
			setSuccessFor(roomcapacity);
			formout.capacity = parseInt(roomcapacityValue);
		}
		if ( parseFloat(roompriceValue) == NaN || roompriceValue === '') {
			setErrorFor(roomprice, 'The price must be a float number!');
			return false;
		}
		else {
			setSuccessFor(roomprice);
			formout.price = parseFloat(roompriceValue.replace(',', '.'));
		}
		if ( roomactiveValue == "on") {
			formout.active = true;
		}
		else {
			formout.active = false;
		}


		console.log(JSON.stringify(formout));
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



	const roomData = {
		id: 1,
		number: "108",
		floor: 2,
		capacity: 2,
		price: 27.2,
		active: false
	};


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
			left: 'addRoom, today, prev, next',
			center: 'title',
			right: 'resourceTimelineMonth, resourceTimelineWeek',
		},
		customButtons: {
			addRoom: {
				text: __('Add room', 'joeee-booking'),
				click: function() {
					$('.joeee-booking-room-bg-modal').css("display", "flex");
				}
				
			}
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
				labelText: __( 'Capacity', 'joeee-booking' ),
				field: 'capacity'
			}
		],
		resources: [
			{ id: 'a', title: 'Auditorium A', capacity: 40 },
			{ id: 'b', title: 'Auditorium B', capacity: 60 }
		],
		events: [
			{id: '1', resourceId: 'a', title: 'Test User', start: '2020-02-04T12:00:00', end: '2020-02-09T12:00:00', color: 'green' },
			{id: '2', resourceId: 'b', title: 'Test User2', start: '2020-02-04', end: '2020-02-09' }
		],
		eventClick: function(info) {
			alert('Event: ' + info.event.title);
		},
		select: function(arg) {
			console.log(
				'select callback',
				arg.startStr,
				arg.endStr,
				arg.resource ? arg.resource.id : '(no resource)'
			);
		},
		dateClick: function(arg) {
			console.log(
				'dateClick',
				arg.date,
				arg.resource ? arg.resource.id : '(no resource)'
			);
		}
	});
	calendar.render();

	$('.joeee-booking-room-close').click(function() {
		$('.joeee-booking-room-bg-modal').css("display", "none");
	});

	$('#joeee-roombooking-room-form').submit(function( event ) {
		event.preventDefault();
		var checked = checkRoomFormInputs();
		if(checked) {

				$.ajax({
			type: 'POST',
			dataType: 'json',
			contentType: 'application/json',
			url: joeeeRest.restURL + 'joeee-booking/v1/room/create',
			success: function (data) {
				console.log(data);
			},
			error: function (data) {
				console.log(data);
			},
			beforeSend: function (xhr) {
				xhr.setRequestHeader('X-WP-Nonce', joeeeRest.restNonce);
			},
			data: JSON.stringify(checked),
		});
	}
	});
	
});


	



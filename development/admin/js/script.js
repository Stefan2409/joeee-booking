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

$(document).ready(function() {
	// jQuery methods go here...
	// $.ajax({
	// 	type: 'POST',
	// 	url: joeeeRest.restURL + 'joeee-booking/v1/room/create',
	// 	beforeSend: function (xhr) {
	// 		xhr.setRequestHeader('X-WP-Nonce', joeeeRest.restNonce);
	// 	},
	// 	data: {
			
	// 	}
	// });
});

document.addEventListener('DOMContentLoaded', function() {

	function checkRoomFormInputs() {
		const roomnumberValue = roomnumber.value.trim();
		const floornumberValue = floornumber.value.trim();
		const roomcapacityValue = roomcapacity.value.trim();
		const roompriceValue = roomprice.value.trim();
		const roomactiveValue = roomactive.value.trim();
	
		if ( parseInt(floornumberValue) == NaN || floornumberValue === '') {
			setErrorFor(floornumber, 'The floornumber must be an integer!');
		}
		else {
			setSuccessFor(floornumber);
		}
			
	}
	
	function setErrorFor(input, message) {
		const formControl = input.parentElement;
		const small = formControl.querySelector('small');
		formControl.className = 'joeee-booking-room-form-control error';
		small.innerText = message;
	}
	
	function setSuccessFor(input) {
		const formControl = input.parentElement;
		formControl.className = 'joeee-booking-room-form-control success';
	}

	const roomform = document.getElementById('joeee-roombooking-room-form');
	const roomnumber = document.getElementById('joeee-booking-room-roomnumber');
	const floornumber = document.getElementById('joeee-booking-room-floornumber');
	const roomcapacity = document.getElementById('joeee-booking-room-capacity');
	const roomprice = document.getElementById('joeee-booking-room-price');
	const roomactive = document.getElementById('joeee-booking-room-active');


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
					document.querySelector('.joeee-booking-room-bg-modal').style.display = 'flex';
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

	document.querySelector('.joeee-booking-room-close').addEventListener('click', function() {
		document.querySelector('.joeee-booking-room-bg-modal').style.display = 'none';
	});
	
});


	



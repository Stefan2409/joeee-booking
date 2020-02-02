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

const { __, _x, _n, _nx } = wp.i18n;

$(document).ready(function() {
    // jQuery methods go here...
});

document.addEventListener('DOMContentLoaded', function() {
	var setLocale = 'en';
	let calendarEl = document.getElementById('joeeeBookingCalendar');
	let calendar = new Calendar(calendarEl, {
		schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
		plugins: [ resourceTimelinePlugin ],
		aspectRatio: 1.5,
		resourceAreaWidth: '10%',
		slotDuration: '12:00',
		locale: setLocale,
		header: {
			left: 'addRoom, today, prev, next',
			center: 'title',
			right: 'timelineThirtyDays, month',
		},
		customButtons: {
			addRoom: {
				text: __('Add room', 'joeee-booking')
				
			}
		},
		defaultView: 'timelineThirtyDays',
		views: {
			timelineThirtyDays: {
				type: 'resourceTimeline',
				labelText: 'Test',
				duration: { days: 31 }
			}
		},
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
		]
	});
	calendar.render();
});

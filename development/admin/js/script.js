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




	function checkRoomFormInputsModify() {
		let formout = {};

		// if( (ROOMID.val() != "null") && !isNaN(ROOMID.val())) {
		// 	formout.id = ROOMID.val();
		// }
		// else {
		// 	formout.id = null;
		// }


		let roomnumberValue = ROOMNUMBER.val().trim();
		let floornumberValue = FLOORNUMBER.val().trim();
		let roomcapacityValue = ROOMCAPACITY.val().trim();
		let roompriceValue = ROOMPRICE.val().trim();
		
		

		if ( roomnumberValue.toString() == NaN || roomnumberValue === '') {
			setErrorFor(ROOMNUMBER, __('The room number must be set as string!', 'joeee-booking'));
			return false;
		}
		else {
			setSuccessFor(ROOMNUMBER);
			formout.number = roomnumberValue.toString();
		}

		if ( parseInt(floornumberValue) == NaN || floornumberValue === '') {
			setErrorFor(FLOORNUMBER, __('The floor number must be an integer!', 'joeee-booking'));
			return false;
		}
		else {
			setSuccessFor(FLOORNUMBER);
			formout.floor = parseInt(floornumberValue);
		}

		if ( parseInt(roomcapacityValue) == NaN || roomcapacityValue === '') {
			setErrorFor(ROOMCAPACITY, __('The capacity must be an integer!', 'joeee-booking'));
			return false;
		}
		else {
			setSuccessFor(ROOMCAPACITY);
			formout.capacity = parseInt(roomcapacityValue);
		}
		if ( parseFloat(roompriceValue) == NaN || roompriceValue === '') {
			setErrorFor(ROOMPRICE, __('The price must be a float number!', 'joeee-booking'));
			return false;
		}
		else {
			setSuccessFor(ROOMPRICE);
			formout.price = parseFloat(roompriceValue.replace(',', '.'));
		}
		if ( ROOMACTIVE.is( ":checked" ) ) {
			formout.active = true;
		}
		else {
			formout.active = false;
		}

		return formout;
			
	}

	function checkRoomFormInputs() {
		let formout = {};

		if( (ROOMID.val() != "null") && !isNaN(ROOMID.val())) {
			formout.id = ROOMID.val();
		}
		else {
			formout.id = null;
		}


		let roomnumberValue = ROOMNUMBER.val().trim();
		let floornumberValue = FLOORNUMBER.val().trim();
		let roomcapacityValue = ROOMCAPACITY.val().trim();
		let roompriceValue = ROOMPRICE.val().trim();
		
		

		if ( roomnumberValue.toString() == NaN || roomnumberValue === '') {
			setErrorFor(ROOMNUMBER, __('The room number must be set as string!', 'joeee-booking'));
			return false;
		}
		else {
			setSuccessFor(ROOMNUMBER);
			formout.number = roomnumberValue.toString();
		}

		if ( parseInt(floornumberValue) == NaN || floornumberValue === '') {
			setErrorFor(FLOORNUMBER, __('The floor number must be an integer!', 'joeee-booking'));
			return false;
		}
		else {
			setSuccessFor(FLOORNUMBER);
			formout.floor = parseInt(floornumberValue);
		}

		if ( parseInt(roomcapacityValue) == NaN || roomcapacityValue === '') {
			setErrorFor(ROOMCAPACITY, __('The capacity must be an integer!', 'joeee-booking'));
			return false;
		}
		else {
			setSuccessFor(ROOMCAPACITY);
			formout.capacity = parseInt(roomcapacityValue);
		}
		if ( parseFloat(roompriceValue) == NaN || roompriceValue === '') {
			setErrorFor(ROOMPRICE, __('The price must be a float number!', 'joeee-booking'));
			return false;
		}
		else {
			setSuccessFor(ROOMPRICE);
			formout.price = parseFloat(roompriceValue.replace(',', '.'));
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
		events: [
			{id: '1', resourceId: '14', title: 'Test User', start: '2020-02-04T12:00:00', end: '2020-02-09T12:00:00', color: 'green' },
			{id: '2', resourceId: '16', title: 'Test User2', start: '2020-02-04', end: '2020-02-09' }
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
		ROOMCANCELBTN.trigger('click');
	});

	$('#joeee-booking-room-submit').click(function(ev) {
		ev.preventDefault();
	
		
			
			let checked = checkRoomFormInputs();
			if(checked) {

					$.ajax({
				type: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				url: joeeeRest.restURL + 'joeee-booking/v1/room',
				success: function (data) {
					let success = $('.joeee-booking-room-success');
					success.addClass('success');
					success.text('Saved changes successfully.');
					setTimeout(function() {
						ROOMCANCELBTN.trigger('click');
						location.reload();
					}, 2000);


				},
				error: function (data) {
					let err = data.responseJSON.message;
					let submitError = $('.joeee-booking-room-error');
					console.log(joeeeRest.restURL + 'joeee-booking/v1/room');
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

	ROOMCANCELBTN.click(function(ev) {
		ev.preventDefault();
		$('#joeee-roombooking-room-form').trigger('reset');
		$('.joeee-booking-room-bg-modal').css("display", "none");
		location.reload();


	});

	$('#joeee-booking-room-form-submit-modify').click(function(ev) {
		ev.preventDefault();
	
		
			
			let checked = checkRoomFormInputsModify();
			if(checked) {

		$.ajax({
			type: 'PUT',
			dataType: 'json',
			contentType: 'application/json',
			url: joeeeRest.restURL + 'joeee-booking/v1/room/' + ROOMID.val(),
			success: function (data) {
				let success = $('.joeee-booking-room-success');
				success.addClass('success');
				success.text('Saved changes successfully.');
				setTimeout(function() {
					$('.joeee-booking-room-cancel-btn').trigger('click');
				}, 1000);


			},
			error: function (data) {
				let err = data.responseJSON.message;
				let submitError = $('.joeee-booking-room-error');
				console.log(ROOMID.val());
				console.log(data);
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

		if( confirm( __('Are you really sure to delete this room? Every booking in this room will be removed too by doing so!', 'joeee-booking') ) ) {

			$.ajax({
				type: 'DELETE',
				dataType: 'json',
				contentType: 'application/json',
				url: joeeeRest.restURL + 'joeee-booking/v1/room/' + ROOMID.val(),
				success: function (data) {
					let success = $('.joeee-booking-room-success');
					success.addClass('success');
					success.text('Saved changes successfully.');
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
			$('.joeee-booking-room-cancel-btn').trigger('click');

		}

	});
	
});


	



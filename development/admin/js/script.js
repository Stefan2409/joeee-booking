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
import { Calendar } from '@fullcalendar/core';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import calendarInteraction from '@fullcalendar/interaction';

// Constants for internationalization purposes
const { __, _x, _n, _nx } = wp.i18n;



jQuery(document).ready(function () {
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

	const RESFORM = $('#joeee-booking-reservation-form');
	const RESCANCELBTN = $('.joeee-booking-reservation-cancel-btn');
	const RESBGMODAL = $(".joeee-booking-reservation-bg-modal");
	const RESID = $(".joeee-booking-reservation-id");
	const RESROOMID = $('#joeee-booking-reservation-roomid');
	const RESUSERID = $('#joeee-booking-reservation-userid');
	const RESARRIVAL = $("#joeee-booking-reservation-arrival");
	const RESDEPARTURE = $("#joeee-booking-reservation-departure");
	const RESPERSONS = $('#joeee-booking-reservation-persons');
	const RESKIDS = $('#joeee-booking-reservation-kids');
	const RESEMAIL = $('#joeee-booking-reservation-email');
	const RESFIRSTNAME = $('#joeee-booking-reservation-firstname');
	const RESLASTNAME = $('#joeee-booking-reservation-lastname');
	const RESNATIONALITY = $('#joeee-booking-nationality-select');
	const RESCONFIRMATION = $('#joeee-booking-reservation-confirm');
	const RESGENDER = $('#joeee-booking-reservation-gender');
	const RESBIRTHDAY = $('#joeee-booking-reservation-birthday');
	const RESTIN = $("#joeee-booking-reservation-tin");
	const RESSTREET = $('#joeee-booking-reservation-street');
	const RESZIP = $('#joeee-booking-reservation-zip');
	const RESCITY = $('#joeee-booking-reservation-city');
	const RESCOUNTRY = $('#joeee-booking-country-select');
	const RESSUBMIT = $('#joeee-booking-reservation-submit');
	const RESMODIFY = $('#joeee-booking-reservation-form-submit-modify');
	const RESDELETE = $('.joeee-booking-reservation-delete-btn');
	const RESFREEROOM = $('#joeee-booking-reservation-free-rooms-table');







	function cancel(ev, comesfrom) {
		ev.preventDefault();
		if (comesfrom === "room") {
			$('#joeee-roombooking-room-form').trigger('reset');
			$('.joeee-booking-room-bg-modal').css("display", "none");
		}
		if (comesfrom === "reservation") {
			$('#joeee-booking-reservation-form').trigger('reset');
			$('.joeee-booking-reservation-bg-modal').css("display", "none");
		}
		location.reload();
	}

	function getSelectedReservationCheckboxes() {
		let allVals = [];
		$('.reservationRoomFormCheckbox:checked').each(function () {
			allVals.push($(this).val());
		});
		return allVals;
	}

	function getAllReservationExtras() {
		let allExtras = {};
		$("[id^=extra-id]").each(function () {
			allExtras[this.id.replace("extra-id", "")] = this.value;
		});
		return allExtras;
	}

	function reservationSuccess(data) {
		let success = $('.joeee-booking-reservation-success');
		success.addClass('success');
		success.text(__('Saved changes successfully.', 'joeee-booking'));
		setTimeout(function () {
			RESCANCELBTN.trigger('click');
			location.reload();
		}, 2000);


	}

	function reservationError(data) {
		console.log('Error:')
		console.log(data);
		let err = data.responseJSON.message;
		let submitError = $('.joeee-booking-reservation-error');
		submitError.addClass('error');
		submitError.text(err);
	}

	function createReservation(checked, extras, comesfrom) {
		let reservationData = {};
		reservationData.person_id = checked.person_id;
		reservationData.room_id = checked.rooms;
		reservationData.booked_from = checked.reservationArrival + "T12:00:00";
		reservationData.booked_to = checked.reservationDeparture + "T12:00:00";
		reservationData.adults = checked.reservationPersons;
		reservationData.kids = checked.reservationKids;
		reservationData.confirmation = parseInt(checked.confirmationselect);
		if (!(Object.entries(extras).length === 0)) {
			reservationData.extras = extras;
		}

		if (comesfrom === 'submit') {

			$.ajax({
				type: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				url: joeeeRest.restURL + 'joeee-booking/v1/reservation',
				success: function (data) { reservationSuccess(data) },
				error: function (data) { reservationError(data) },
				beforeSend: function (xhr) {
					xhr.setRequestHeader('X-WP-Nonce', joeeeRest.restNonce);
				},
				data: JSON.stringify(reservationData),
			});
		}

		if (comesfrom === 'modify') {

			$.ajax({
				type: 'PUT',
				dataType: 'json',
				contentType: 'application/json',
				url: joeeeRest.restURL + 'joeee-booking/v1/reservation/' + checked.reservationID,
				success: function (data) { reservationSuccess(data) },
				error: function (data) { reservationError(data) },
				beforeSend: function (xhr) {
					xhr.setRequestHeader('X-WP-Nonce', joeeeRest.restNonce);
				},
				data: JSON.stringify(reservationData),
			});
		}
	}

	function emailIsValid(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	function checkReservationFormInputs(comesfrom) {
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

		if (arrival === '') {
			setErrorFor(RESARRIVAL, __('The arrival date is required!', 'joeee-booking'));
			return false;
		}
		else {
			setSuccessFor(RESARRIVAL);
		}

		if (departure === '') {
			setErrorFor(RESDEPARTURE, __('The departure date is required!', 'joeee-booking'));
			return false;
		}
		else {
			setSuccessFor(RESDEPARTURE);
		}


		if (isNaN(persons) || persons === '') {
			setErrorFor(RESPERSONS, __('The adults field is required!', 'joeee-booking'));
			return false;
		}
		else {
			setSuccessFor(RESPERSONS);
		}

		if (email === "" || emailIsValid(email)) {
			setSuccessFor(RESEMAIL);
		}
		else {
			setErrorFor(RESEMAIL, __('The E-Mail has a wrong format.', 'joeee-booking'));
			return false;
		}

		if (typeof firstName === 'string') {
			setSuccessFor(RESFIRSTNAME);
			if (firstName !== "") {

			}
		}
		else {
			setErrorFor(RESFIRSTNAME, __('The first name have to be in string format!', 'joeee-booking'));
			return false;
		}

		if (lastName === "" || typeof lastName !== 'string') {
			setErrorFor(RESLASTNAME, __('The last name is required and has to be in string format', 'joeee-booking'));
			return false;
		}
		else {
			setSuccessFor(RESLASTNAME);
		}



		if (birthday !== "") {
			setSuccessFor(RESBIRTHDAY);
		}

		if (typeof street === 'string') {
			setSuccessFor(RESSTREET);
		}
		else {
			setErrorFor(RESSTREET, __('The street has to be a string', 'joeee-booking'));
			return false;
		}

		if (typeof zip === 'string' || typeof zip === 'number') {
			setSuccessFor(RESZIP);
		}
		else {
			setErrorFor(RESZIP, __('There is an error with your given zip.', 'joeee-booking'));
			return false;
		}

		if (typeof city === 'string') {
			setSuccessFor(RESCITY);
		}
		else {
			setErrorFor(RESCITY, __('The city has to be a string.', 'joeee-booking'));
			return false;
		}
		let formDataHelper = {};
		let resformdata = RESFORM.serializeArray();
		$.each(resformdata, function (i, field) {
			formDataHelper[field.name] = field.value;
		});
		let resRoomIDs = getSelectedReservationCheckboxes();
		if (comesfrom === "submit") {
			try {
				if (resRoomIDs.length > 0) {
					formDataHelper.rooms = resRoomIDs;
				}
				else {
					throw __('You have to select the rooms you want to be booked!', 'joeee-booking');
				}
			}
			catch (err) {
				let submitError = $('.joeee-booking-reservation-error');
				submitError.addClass('error');
				submitError.text(err);
				return false;
			}
		}

		if (comesfrom === "modify") {
			formDataHelper.rooms = RESROOMID.val();
			formDataHelper.reservationID = RESID.val();

			formDataHelper.person_id = RESUSERID.val();
		}

		formout = formDataHelper;

		return formout;

	}

	function create_userdata(checked, comesfrom) {
		let userdata = {};
		if (checked.reservationEmail !== "") {
			userdata.email = checked.reservationEmail;
		}
		userdata.first_name = checked.reservationFirstName;
		userdata.last_name = checked.reservationLastName;
		userdata.gender = parseInt(checked.genderselect);
		userdata.birthday = checked.reservationBirthday + "T12:00:00";
		userdata.nationality = checked.nationalityselect;
		userdata.tin = checked.reservationTIN;
		userdata.street = checked.reservationStreet;
		userdata.zip = checked.reservationZip;
		userdata.city = checked.reservationCity;
		userdata.country = checked.countryselect;

		return userdata;
	}

	function fillReservationForm(data) {
		if ("reservation_id" in data[0]) {
			RESID.val(data[0].reservation_id);
		}
		if ("room_id" in data[0]) {
			RESROOMID.val(data[0].room_id);
		}
		if ("id" in data[0]) {
			RESUSERID.val(data[0].id);
		}
		if ("booked_from" in data[0]) {
			RESARRIVAL.val(data[0].booked_from.replace(" 12:00:00", ""));
		}
		if ("booked_to" in data[0]) {
			RESDEPARTURE.val(data[0].booked_to.replace(" 12:00:00", ""));
		}
		if ("adults" in data[0]) {
			RESPERSONS.val(data[0].adults);
		}
		if ("kids" in data[0]) {
			RESKIDS.val(data[0].kids);
		}
		if ("user_email" in data[0]) {
			RESEMAIL.val(data[0].user_email);
		}
		if ("first_name" in data[0]) {
			RESFIRSTNAME.val(data[0].first_name);
		}
		if ("last_name" in data[0]) {
			RESLASTNAME.val(data[0].last_name);
		}
		if ("nationality_id" in data[0]) {
			RESNATIONALITY.val(data[0].nationality_id);
		}
		if ("confirmation" in data[0]) {
			RESCONFIRMATION.val(data[0].confirmation);
		}
		if ("gender" in data[0]) {
			RESGENDER.val(data[0].gender);
		}
		if ("birth" in data[0]) {
			RESBIRTHDAY.val(data[0].birth);
		}
		if ("tin" in data[0]) {
			RESTIN.val(data[0].tin);
		}
		if ("street" in data[0]) {
			RESSTREET.val(data[0].street);
		}
		if ("zip" in data[0]) {
			RESZIP.val(data[0].zip);
		}
		if ("city" in data[0]) {
			RESCITY.val(data[0].city);
		}
		if ("state_id" in data[0]) {
			RESCOUNTRY.val(data[0].state_id);
		}
	}

	function checkRoomFormInputs(comesfrom) {
		let formout = {};

		let roomnumberValue = ROOMNUMBER.val().trim();
		let floornumberValue = FLOORNUMBER.val().trim();
		let roomAdultsValue = ROOMADULTS.val().trim();
		let roomKidsValue = ROOMKIDS.val().trim();
		let roompriceValue = ROOMPRICE.val().trim().replace(',', '.');
		let roomDescription = ROOMDESC.val().trim();

		if (isNaN(roomnumberValue.toString()) || roomnumberValue === '') {
			setErrorFor(ROOMNUMBER, __('The room number must be set as string!', 'joeee-booking'));
			return false;
		}
		else {
			setSuccessFor(ROOMNUMBER);
			formout.number = roomnumberValue.toString();
		}

		if (isNaN(floornumberValue) || floornumberValue === '') {
			setErrorFor(FLOORNUMBER, __('The floor number must be an integer!', 'joeee-booking'));
			return false;
		}
		else {
			setSuccessFor(FLOORNUMBER);
			formout.floor = floornumberValue;
		}

		if (isNaN(roomAdultsValue) || roomAdultsValue === '') {
			setErrorFor(ROOMADULTS, __('The adults must be an integer!', 'joeee-booking'));
			return false;
		}
		else {
			setSuccessFor(ROOMADULTS);
			formout.adults = parseInt(roomAdultsValue);
		}
		if (isNaN(roomKidsValue) || roomKidsValue === '') {
			setErrorFor(ROOMKIDS, __('The kids must be an integer!', 'joeee-booking'));
			return false;
		}
		else {
			setSuccessFor(ROOMKIDS);
			formout.kids = parseInt(roomKidsValue);
		}
		if (isNaN(roompriceValue) || roompriceValue === '') {
			setErrorFor(ROOMPRICE, __('The price must be a float number!', 'joeee-booking'));
			return false;
		}
		else {
			setSuccessFor(ROOMPRICE);
			formout.price = parseFloat(roompriceValue);
		}
		if (typeof roomDescription === 'string') {
			formout.description = roomDescription;
		}
		formout.active = ROOMACTIVE.is(":checked");

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
		plugins: [calendarInteraction, resourceTimelinePlugin],
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
				click: function () {
					$('.joeee-booking-room-bg-modal').css("display", "flex");
				}

			},
			addReservation: {
				text: __('Add reservation', 'joeee-booking'),
				click: function () {
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
				labelText: __('Room', 'joeee-booking'),
				field: 'title',
				width: '15px'
			},
			{
				labelText: __('Beds', 'joeee-booking'),
				field: 'adults'
			},
		],
		resourceOrder: 'title',
		resources: {
			url: joeeeRest.restURL + 'joeee-booking/v1/room',
			method: 'GET'
		},
		resourceRender: function (renderInfo) {
			renderInfo.el.addEventListener('click', function () {

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
						if (data.active == 1) {
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
		events: {
			url: joeeeRest.restURL + 'joeee-booking/v1/reservation',
			method: 'GET'
		},
		eventDrop: function (event) {
			let newResource = 0;
			let oldResource = 0;

			if (event.newResource === null) {
				newResource = event.event._def.resourceIds[0];
				oldResource = event.event._def.resourceIds[0];
			}
			else {
				newResource = event.newResource.id;
				oldResource = event.oldResource.id;
			}


			let newEventStart = event.event.start.toISOString().substr(0, 10) + " 12:00:00";
			let newEventEnd = event.event.end.toISOString().substr(0, 10) + " 12:00:00";
			console.log(newEventEnd);
			let eventId = event.event.id;
			console.log(eventId);
			let eventDrop = {};
			if (oldResource !== newResource) {
				eventDrop.room_id = oldResource;
				eventDrop.new_room_id = newResource;
			}
			else {
				eventDrop.room_id = oldResource;
			}

			eventDrop.booked_from = newEventStart;
			eventDrop.booked_to = newEventEnd;

			console.log(eventDrop);

			$.ajax({
				type: 'PUT',
				dataType: 'json',
				contentType: 'application/json',
				url: joeeeRest.restURL + 'joeee-booking/v1/reservation/' + eventId,
				success: function (data) {
					console.log(data);

				},
				error: function (data) {
					console.log(data);
					event.revert();
				},
				beforeSend: function (xhr) {
					xhr.setRequestHeader('X-WP-Nonce', joeeeRest.restNonce);
				},
				data: JSON.stringify(eventDrop),
			});


		},
		eventClick: function (info) {

			console.log('Event: ' + info.event.title + ' ' + info.event.id + ' ' + info.event.getResources().map(function (self) { return self.id }));
			let event = {};
			event.id = info.event.id;
			event.room_id = info.event.getResources().map(function (self) { return self.id });
			console.log(event);
			$.ajax({
				type: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				url: joeeeRest.restURL + 'joeee-booking/v1/reservation/room',
				success: function (data) {
					console.log(data);
					RESBGMODAL.css("display", "flex");
					RESSUBMIT.css("visibility", "hidden");
					RESMODIFY.addClass("open");
					RESDELETE.addClass("open");

					$("label[for='joeee-booking-reservation-persons']").text(__("Total number of adults for this reservation.", "joeee-booking"));
					$("label[for='joeee-booking-reservation-kids']").text(__("Total number of kids for this reservation.", "joeee-booking"));

					fillReservationForm(data);

					// Loads the extras counts in the reservation modifying form.
					if (("extras" in data)) {
						let extras_entries = Object.entries(data.extras);

						for (const [extra, count] of extras_entries) {
							$('#extra-id' + extra).val(count);
						}
					}







				},
				error: function (data) {
					let err = data.responseJSON.message;
					alert(err);
				},
				beforeSend: function (xhr) {
					xhr.setRequestHeader('X-WP-Nonce', joeeeRest.restNonce);
				},
				data: JSON.stringify(event),
			});
		},
		select: function (arg) {
			let arrival = arg.start.toISOString().substr(0, 10);
			let departure = arg.end.toISOString().substr(0, 10);

			RESBGMODAL.css("display", "flex");
			RESROOMID.val(arg.resource.id);
			RESARRIVAL.val(arrival);
			RESDEPARTURE.val(departure);

			console.log(
				'select callback',
				arg.startStr,
				arg.endStr,
				arg.resource ? arg.resource.id : '(no resource)'
			);
		},
		dateClick: function (arg) {
			RESBGMODAL.css("display", "flex");
			let date = arg.date.toISOString().substr(0, 10);
			RESROOMID.val(arg.resource.id);
			RESARRIVAL.val(date);
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

	$('.joeee-booking-room-close').click(function () {
		ROOMCANCELBTN.trigger('click');
	});

	$('.joeee-booking-reservation-close').click(function () {
		RESCANCELBTN.trigger('click');
	});

	$('#joeee-booking-room-submit').click(function (ev) {
		ev.preventDefault();



		let checked = checkRoomFormInputs("submit");
		if (checked) {

			$.ajax({
				type: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				url: joeeeRest.restURL + 'joeee-booking/v1/room',
				success: function (data) {
					let success = $('.joeee-booking-room-success');
					success.addClass('success');
					success.text(__('Saved changes successfully.', 'joeee-booking'));
					setTimeout(function () {
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

	ROOMCANCELBTN.click(function (ev) { cancel(ev, "room"); });
	RESCANCELBTN.click(function (ev) { cancel(ev, "reservation"); });


	$('#joeee-booking-room-form-submit-modify').click(function (ev) {
		ev.preventDefault();



		let checked = checkRoomFormInputs("update");
		if (checked) {

			$.ajax({
				type: 'PUT',
				dataType: 'json',
				contentType: 'application/json',
				url: joeeeRest.restURL + 'joeee-booking/v1/room/' + ROOMID.val(),
				success: function (data) {
					let success = $('.joeee-booking-room-success');
					success.addClass('success');
					success.text(__('Saved changes successfully.', 'joeee-booking'));
					setTimeout(function () {
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

	ROOMDELETEBTN.click(function (ev) {
		ev.preventDefault();

		if (confirm(__('You really wanna delete this room? Every booking in this room will be removed too by doing so!', 'joeee-booking'))) {

			$.ajax({
				type: 'DELETE',
				dataType: 'json',
				contentType: 'application/json',
				url: joeeeRest.restURL + 'joeee-booking/v1/room/' + ROOMID.val(),
				success: function (data) {
					let success = $('.joeee-booking-room-success');
					success.addClass('success');
					success.text(__('Saved changes successfully.', 'joeee-booking'));
					setTimeout(function () {
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


	RESMODIFY.click(function (ev) {
		ev.preventDefault();

		let checked = checkReservationFormInputs("modify");
		if (checked === false) {
			return false;
		}

		let userdata = create_userdata(checked, "modify");

		console.log(checked);
		console.log(userdata);

		$.ajax({
			type: 'PUT',
			dataType: 'json',
			contentType: 'application/json',
			url: joeeeRest.restURL + 'joeee-booking/v1/user/' + checked.reservationUserID,
			success: function (data) {

				console.log("Update completed.");
				console.log(data);

				let extras = getAllReservationExtras();
				createReservation(checked, extras, 'modify');


			},
			error: function (data) {
				let err = data.responseJSON.message;
				console.log(err);
				let submitError = $('.joeee-booking-reservation-error');
				submitError.addClass('error');
				submitError.text(err);
			},
			beforeSend: function (xhr) {
				xhr.setRequestHeader('X-WP-Nonce', joeeeRest.restNonce);
			},
			data: JSON.stringify(userdata),
		});


	});

	RESSUBMIT.click(function (ev) {
		ev.preventDefault();

		let checked = checkReservationFormInputs("submit");
		if (checked === false) {
			return false;
		}

		let extras = getAllReservationExtras();
		console.log(extras);

		let userdata = create_userdata(checked, "submit");

		console.log(userdata);

		$.ajax({
			type: 'POST',
			dataType: 'json',
			contentType: 'application/json',
			url: joeeeRest.restURL + 'joeee-booking/v1/user',
			success: function (data) {


				checked.person_id = data.id;
				console.log(checked);
				createReservation(checked, extras, 'submit');



			},
			error: function (data) {
				let err = data.responseJSON.message;
				let submitError = $('.joeee-booking-reservation-error');
				submitError.addClass('error');
				submitError.text(err);
			},
			beforeSend: function (xhr) {
				xhr.setRequestHeader('X-WP-Nonce', joeeeRest.restNonce);
			},
			data: JSON.stringify(userdata),
		});



	});




	RESDEPARTURE.on("keyup change", function () {
		RESFREEROOM.empty();
		let data = {};
		if (typeof RESARRIVAL.val() !== "undefined") {
			let arrival = RESARRIVAL.val();
			let departure = RESDEPARTURE.val();
			console.log(typeof departure);
			data.from = arrival.concat(" 12:01:00");
			data.to = departure.concat(" 11:59:00");

			$.ajax({
				type: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				url: joeeeRest.restURL + 'joeee-booking/v1/room/availability',
				success: function (response) {
					let freeRooms = response;
					let j = 0;
					if (freeRooms.length !== 0) {
						RESFREEROOM.append('<tr id="joeee-booking-reservation-free-room-row"><th>Room Number</th><th>Adults</th><th>Kids</th><th>Book</th></tr>');
						for (var i = 0; i < freeRooms.length; i++) {
							console.log(freeRooms[i]);
							RESFREEROOM.append('<tr id="joeee-booking-reservation-free-room-row' + i + '"><td>' + freeRooms[i].number + '</td><td>' + freeRooms[i].adults + '</td><td>' + freeRooms[i].kids + '</td><td><input name="reservationRoomCheck' + i + '" type="checkbox" id="joeee-booking-reservation-free-room-id' + freeRooms[i].number + '" value="' + freeRooms[i].id + '" class="reservationRoomFormCheckbox"></td></tr>');
						}
					}
					else {
						RESFREEROOM.append('<tr><td>' + __('There are no free rooms in the given period!', 'joeee-booking') + '</td></tr>');
					}



				},
				error: function (response) {
					console.log(response);
				},
				beforeSend: function (xhr) {
					xhr.setRequestHeader('X-WP-Nonce', joeeeRest.restNonce);
				},
				data: JSON.stringify(data),
			});
		}
	});


	RESEMAIL.autocomplete({
		source: function (request, response) {
			console.log(request);
			let jsonRequest = {};
			jsonRequest.term = request.term;
			$.ajax({
				type: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				url: joeeeRest.restURL + 'joeee-booking/v1/user/email',
				success: function (data) {

					console.log(data);
					response(data);
				},
				error: function (data) {

				},
				beforeSend: function (xhr) {
					xhr.setRequestHeader('X-WP-Nonce', joeeeRest.restNonce);
				},
				data: JSON.stringify(jsonRequest),
			});
		},
		minLength: 3,
		select: function (event, ui) {

			let mail = ui.item.value;

			let query = {};
			query.email = mail;
			$.ajax({
				type: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				url: joeeeRest.restURL + 'joeee-booking/v1/user/byemail',
				success: function (data) {

					fillReservationForm(data);

				},
				error: function (data) {
					console.log(data);
				},
				beforeSend: function (xhr) {
					xhr.setRequestHeader('X-WP-Nonce', joeeeRest.restNonce);
				},
				data: JSON.stringify(query),
			});

		}
	});





});






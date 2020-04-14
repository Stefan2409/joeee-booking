import $ from 'jquery';

const { __, _x, _n, _nx } = wp.i18n;

jQuery(document).ready(function () {
    const EXTRASFORM = $('#joeee-booking-extras-form');
    const EXTRASADD = $('#joeee-booking-extras-add');


    function edit_extras(id, text, column_name) {
        let editExtra = {};
        if (column_name === 'title') {
            editExtra.title = text;
        }
        if (column_name === 'price') {
            editExtra.price = parseFloat(text.trim().replace(',', '.'));
        }
        if (column_name === 'bookable') {
            editExtra.bookable = text;
        }
        $.ajax({
            type: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            url: joeeeExtrasRest.restURL + 'joeee-booking/v1/extra/' + id,
            success: function (data) {
                console.log("Success: ")
                console.log(data);

            },
            error: function (data) {
                console.log("Error: ");
                console.log(data);
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-WP-Nonce', joeeeExtrasRest.restNonce);
            },
            data: JSON.stringify(editExtra),
        });



    }

    EXTRASADD.click(function () {

        let newExtra = {};

        newExtra.title = $('#joeee-booking-extra-title').val();
        let extraPrice = $('#joeee-booking-extra-price').val();
        newExtra.price = parseFloat(extraPrice.trim().replace(',', '.'));
        newExtra.bookable = $('#joeee-booking-extra-bookable').is(":checked");
        if (newExtra.title == '') {
            alert(__("You have to enter a title!", 'joeee-booking'));
            return false;
        }
        if (newExtra.price == '') {
            alert(__("You have to enter a price!", 'joeee-booking'));
            return false;
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            url: joeeeExtrasRest.restURL + 'joeee-booking/v1/extra',
            success: function (data) {
                location.reload(true);

            },
            error: function (data) {
                console.log("Error: ");
                console.log(data);
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-WP-Nonce', joeeeExtrasRest.restNonce);
            },
            data: JSON.stringify(newExtra),
        });


    });

    $(document).on('blur', '.joeee_booking_extra_title', function () {
        var id = $(this).data("id1");
        var title = $(this).val();
        edit_extras(id, title, "title");
    });

    $(document).on('blur', '.joeee_booking_extra_price', function () {
        var id = $(this).data("id2");
        var price = $(this).val();
        edit_extras(id, price, "price");
    });

    $(document).on('blur', '.joeee_booking_extra_bookable', function () {
        var id = $(this).data("id3");
        var bookable = $(this).is(":checked");
        edit_extras(id, bookable, "bookable");
    });



    $(document).on('click', '.button-delete', function () {
        let button_id = $(this).data("id4");
        console.log(button_id);

        $.ajax({
            type: 'DELETE',
            dataType: 'json',
            contentType: 'application/json',
            url: joeeeExtrasRest.restURL + 'joeee-booking/v1/extra/' + button_id,
            success: function (data) {
                location.reload(true);

            },
            error: function (data) {
                console.log("Error: ");
                console.log(data);
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-WP-Nonce', joeeeExtrasRest.restNonce);
            },
        });

    });

});
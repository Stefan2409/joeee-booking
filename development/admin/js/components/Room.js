class Room {
    constructor() {
        this.cancelBtn = $('.joeee-booking-room-cancel-btn');
        this.roomForm = $('#joeee-roombooking-room-form');
        this.roomBgModal = $('.joeee-booking-room-bg-modal');
    }

    cancel() {
    	this.cancelBtn.click(function(ev) {
            ev.preventDefault();
            this.roomForm.trigger('reset');
            this.roomBgModal.css("display", "none");
            location.reload();


        });
    }
}
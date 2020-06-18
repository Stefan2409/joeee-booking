/*global memberData*/
import React, { Component } from 'react';
import classes from './Reservation.module.css';
import Button from '../../Components/UI/Button/Button';


const renderCheck = (confirm) => {
    if (confirm === "confirmed") {
        return <div className={classes.Verified}><i className="material-icons md-48 check">check_circle</i></div>;
    }
    if (confirm === "pending") {
        return <div className={classes.Verified}><i className="material-icons md-48 pending">hourglass_empty</i></div>;
    }
}


const reservation = (props) => (
    <div className="joeee-booking-reservation-container-height">
        <div className={[classes.Reservation, classes[props.confirmed]].join(' ') + " joeee-booking-reservation-container"}>
            <div className="joeee-booking-reservation-pic-container">
                <img src={memberData.frontendPath + "images/pic1_resized.jpg"} alt="Room" />
            </div>
            <div className="joeee-booking-reservation-info-container">
                <div className={classes.Dates}>
                    {props.fromDate} - {props.toDate}
                </div>
                {renderCheck(props.confirmed)}
                <div className={classes.Reservation}><strong>Adults: </strong> {props.adults}</div>
                <div className={classes.Reservation}><strong>Kids: </strong>{props.kids}</div>
                <div className={classes.Reservation}><strong>Rooms: </strong>{props.rooms}</div>
                <div className={classes.Reservation}><strong>Confirmation status: </strong>{props.confirmed}</div>
                <div className={classes.ButtonPosition}>
                    <Button clicked={e => { props.clicked(e.target.id) }} type="button" classType="Button-delete" btnId={"joeee-booking-reservation-cancelBtn" + props.btnId}>Cancel Reservation</Button>
                </div>
            </div>
        </div>
    </div>

);

export default reservation;
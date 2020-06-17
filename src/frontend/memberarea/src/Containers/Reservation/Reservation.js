/*global memberData*/
import React, { Component } from 'react';
import classes from './Reservation.module.css';


const reservation = (props) => (
    <div className="joeee-booking-reservation-container-height">
        <div className={[classes.Reservation, classes[props.confirmed]].join(' ') + " joeee-booking-reservation-container"}>
            <div className="joeee-booking-reservation-pic-container">
                <img src={memberData.frontendPath + "images/pic1_resized.jpg"} alt="Room" />
            </div>
            <div className="joeee-booking-reservation-info-container">
                <h3>
                    {props.fromDate} - {props.toDate}
                </h3>
                <p>Adults: {props.adults} Kids: {props.kids} </p>
                <p>Rooms: {props.rooms}</p>
                <p>Confirmation status: {props.confirmed}</p>
            </div>
        </div>
    </div>

);

export default reservation;
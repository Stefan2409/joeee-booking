/*global memberData*/
import React, { Component } from 'react';
import classes from './Reservation.module.css';
import Button from '../../Components/UI/Button/Button';


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
                <p className={classes.Reservation}><strong>Adults: </strong> {props.adults}</p>
                <p className={classes.Reservation}><strong>Kids: </strong>{props.kids} </p>
                <p className={classes.Reservation}><strong>Rooms: </strong>{props.rooms}</p>
                <p className={classes.Reservation}><strong>Confirmation status: </strong>{props.confirmed}</p>
                <Button type="button" classType="Button-delete">Cancel Reservation</Button>
            </div>
        </div>
    </div>

);

export default reservation;
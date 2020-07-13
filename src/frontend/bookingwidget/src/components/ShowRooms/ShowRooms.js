import React from 'react';
import classes from './ShowRooms.module.css';

const ShowRooms = (props) => {
    return (
    <div className={classes.Showrooms}>
        <h3>Room number: {props.roomNr}</h3>
        <div><strong>Adults: </strong>{props.adults}</div>
        <div><strong>Kids: </strong>{props.kids}</div>
        <div><strong>Room description: </strong>{props.description}</div>
        <div><strong>Price per person and day: </strong>{props.price}</div>
        <div><strong>Single room supplement: </strong>{props.singleRoomSup}</div>
        <div>
        <input type="number" placeholder="Adults" min="1" max={props.adults}/>
        <input type="number" placeholder="Kids" min="0" max={props.kids}/>

        </div>
    </div>
    );
};

export default ShowRooms;
import React from 'react';
import { ListItem, TextField } from '@material-ui/core';
import './AddRoomToReservationControl.css';


const addRoomToReservationControl = (props) => {
    return (
        <ListItem key={props.index} divider>
            <div className="joeee-booking-add-room-to-reservation-label"><strong>Room: {props.room.number}</strong></div>
            <TextField
                label="Adults"
                type="number"
                InputLabelProps={{ shrink: true, }}
                name={"roomadults[" + props.index + "]"}
                variant="outlined"
            />
            <TextField
                label="Kids"
                type="number"
                InputLabelProps={{ shrink: true, }}
                name={"roomkids[" + props.index + "]"}
                variant="outlined"
            />
        </ListItem>
    );

}

export default addRoomToReservationControl;
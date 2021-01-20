import React from 'react';
import { Button, FormGroup, List, ListItem, ListSubheader, TextField } from '@material-ui/core';

const BookedRoomList = (props) => {
    return (
        <FormGroup>
            <List
                aria-labelledby="joeee-booking-reservation-booked-room-list-subheader"
                subheader={
                    <ListSubheader component="div" id="joeee-booking-reservation-booked-room-list-subheader">
                        <strong>Booked rooms:</strong>
                    </ListSubheader>
                }
            >
                {console.log("BookedRoomList:")}
                {console.log(props.bookedRoomsData)}
                {props.bookedRoomsData.map((room, id) => {
                    let currentRoom = props.rooms.find(e => e.id === id.toString());
                    props.setValue("bookedadults[" + id + "]", room.adults);
                    props.setValue("bookedkids[" + id + "]", room.kids);
                    return (
                        <ListItem key={id} divider>
                            <div className="joeee-booking-add-room-to-reservation-label"><strong>Room: {currentRoom.title}</strong></div>
                            <TextField
                                label={"Adults" + " (" + "max.: " + currentRoom.adults + ")"}
                                type="number"
                                InputLabelProps={{ shrink: true, }}
                                name={"bookedadults[" + id + "]"}
                                variant="outlined"
                                inputProps={{ min: 0, max: currentRoom.adults }}
                                inputRef={props.register}
                            />
                            <TextField
                                label={"Kids" + " (" + "max.: " + currentRoom.kids + ")"}
                                type="number"
                                InputLabelProps={{ shrink: true, }}
                                name={"bookedkids[" + id + "]"}
                                variant="outlined"
                                inputProps={{ min: 0, max: currentRoom.kids }}
                                inputRef={props.register}
                            />
                            <Button color="secondary" onClick={props.deleteReservation}>Delete</Button>
                        </ListItem>
                    )
                })}
            </List>
        </FormGroup>
    )
}

export default BookedRoomList;
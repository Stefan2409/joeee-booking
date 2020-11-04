import React from 'react';
import { recommendCommands } from 'yargs';
import AddRoomToReservationControl from './AddRoomToReservationControl/AddRoomToReservationControl';

const addRoomToReservationControllers = (props) => {
    props.roomAvailable.map((room, index) => {
        return (
            <div>
                <AddRoomToReservationControl id={room.id} key={room.id} name={"room[" + index + "]"} inputRef={props.register} />

            </div>
        )
    })


}

export default addRoomToReservationControllers;
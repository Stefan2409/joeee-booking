import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';


const addRoomToReservationControl = (props) => {
    return (
        <div>
            <div>Adults</div>
            <ButtonGroup color="primary" size="small">
                <Button>+</Button>
                <Button>-</Button>
            </ButtonGroup>
            <div>Kids</div>
            <ButtonGroup color="primary" size="small">
                <Button>+</Button>
                <Button>-</Button>
            </ButtonGroup>
        </div>
    );

}

export default addRoomToReservationControl;
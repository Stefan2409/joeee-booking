import React from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import calendarInteraction from '@fullcalendar/interaction';
import AddRoom from './Forms/AddRoom';
import addReservation from './Forms/AddReservation';
import AddReservation from './Forms/AddReservation';


class Calendar extends React.Component {

    state = {
        showAddRoom: false,
        showAddReservation: false,
    };

    closeRoomAddHandler = () => {
        this.setState({ showAddRoom: false });
    }

    closeReservationAddHandler = () => {
        this.setState({ showAddReservation: false });
    }


    render() {
        return (
            <div>
                <FullCalendar
                    schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
                    plugins={[calendarInteraction, resourceTimelinePlugin]}
                    aspectRatio={1.5}
                    slotDuration={'12:00'}
                    scrollTime={'00:00'}
                    initialView={'resourceTimelineMonth'}
                    selectable={true}
                    editable={true}
                    headerToolbar={{
                        left: 'addRoom addReservation today prev next',
                        center: 'title',
                        right: 'resourceTimelineMonth resourceTimelineWeek',
                    }}
                    customButtons={{
                        addRoom: {
                            text: 'Add room',
                            click: () => {
                                this.setState({ showAddRoom: true })
                                console.log(this.state);
                            },
                        },
                        addReservation: {
                            text: 'Add reservation',
                            click: () => {
                                this.setState({ showAddReservation: true });
                            }
                        },
                    }}
                    resourceAreaWidth={'10%'}
                    resources={this.props.rest_url + "room"}
                    resourceClick={console.log("Test")}
                />

                <AddRoom 
                    show={this.state.showAddRoom} 
                    translate='translateY(-100vh)' 
                    closeRoomAddHandler={this.closeRoomAddHandler}
                    url={this.props.rest_url}>
                </AddRoom>
                <AddReservation
                    show={this.state.showAddReservation}
                    translate='translatey(-100vh)'
                    closeReservationAddHandler={this.closeReservationAddHandler}
                    url={this.props.rest_url}>

                </AddReservation>
            </div>
        );
    }
}

export default Calendar;
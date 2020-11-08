import React from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import calendarInteraction from '@fullcalendar/interaction';
import './Calendar.css';
import AddRoom from './Forms/AddRoom';
import AddReservation from './Forms/AddReservation';
import axios from 'axios';


class Calendar extends React.Component {

    state = {
        showAddRoom: false,
        showAddReservation: false,
        addReservation: false,
        modifyReservation: false,
        modifyRoom: false,
        addRoom: false,
        modifyRoomData: {},
        activeChecked: false,
        modifyReservationData: {},
        modifyBookedRoomsData: {},
    };

    calendarRef = React.createRef();

    closeRoomAddHandler = () => {
        this.setState({ showAddRoom: false });
        this.setState({ modifyRoomData: {} });
        this.setState({ addRoom: false });
        this.setState({ modifyRoom: false });
    }

    closeReservationAddHandler = () => {
        this.setState({ showAddReservation: false });
        this.setState({ modifyReservation: false });
        this.setState({ addReservation: false });
        this.setState({ modifyReservationData: {} });
    }

    handleEventClick = (clickInfo) => {
        let getReservationData = {};
        getReservationData.id = clickInfo.event.id;
        getReservationData.room_id = clickInfo.event._def.resourceIds;
        axios.get(this.props.rest_url + 'reservation/' + getReservationData.id)
            .then((reservationData) => {
                console.log(reservationData);
                let roomsBooked = {};
                reservationData.data.map((data) => {
                    console.log("Room: " + data.room_id + " Kids: " + data.kids + " Adults: " + data.adults);
                    roomsBooked[data.room_id] = { adults: data.adults, kids: data.kids };
                });
                this.setState({ modifyBookedRoomsData: roomsBooked });
                console.log(this.state.modifyBookedRoomsData);
                this.setState({ modifyReservationData: reservationData.data[0] });
                this.setState({ modifyReservation: true });
                this.setState({ showAddReservation: true });
            })
            .catch((error) => {
                console.log(error)
            });
    }

    handleResourceClick = (arg) => {
        arg.el.addEventListener("click", () => {
            console.log(arg.resource.id);
            axios.get(this.props.rest_url + 'room/' + arg.resource.id)
                .then((roomInfo) => {
                    console.log(roomInfo.data);
                    if (roomInfo.data.active === "1") {
                        this.setState({ activeChecked: true });
                    }
                    else {
                        this.setState({ activeChecked: false });
                    }

                    this.setState({ modifyRoomData: roomInfo.data });
                    this.setState({ modifyRoom: true });
                    this.setState({ showAddRoom: true });
                }

                );
        });
    }


    render() {
        return (
            <div>
                <FullCalendar
                    ref={this.calendarRef}
                    schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
                    plugins={[calendarInteraction, resourceTimelinePlugin]}
                    aspectRatio={1.5}
                    slotDuration={'12:00'}
                    scrollTime={'00:00'}
                    initialView={'resourceTimelineThirtyDays'}
                    views={{
                        resourceTimelineThirtyDays: {
                            type: 'resourceTimeline',
                            duration: { days: 30 },
                            buttonText: '30 days'
                        }
                    }}
                    selectable={true}
                    editable={true}
                    headerToolbar={{
                        left: 'addRoom addReservation today prev next',
                        center: 'title',
                        right: 'resourceTimelineThirtyDays resourceTimelineMonth resourceTimelineWeek',
                    }}
                    customButtons={{
                        addRoom: {
                            text: 'Add room',
                            click: () => {
                                this.setState({ showAddRoom: true });
                                this.setState({ addRoom: true });
                            },
                        },
                        addReservation: {
                            text: 'Add reservation',
                            click: () => {
                                this.setState({ addReservation: true });
                                this.setState({ showAddReservation: true });
                            }
                        },
                    }}
                    events={this.props.rest_url + "reservation"}
                    eventClick={this.handleEventClick}
                    resourceAreaWidth={'12%'}
                    resourceLabelClassNames={['joeee-booking-resource-label']}
                    resources={this.props.rest_url + "room"}
                    resourceOrder="title"
                    resourceAreaColumns={[
                        {
                            field: 'title',
                            headerContent: 'Room #'
                        },
                        {
                            field: 'adults',
                            headerContent: 'Adults'
                        },
                        {
                            field: 'kids',
                            headerContent: 'Kids'
                        }]}
                    resourceLabelDidMount={this.handleResourceClick}
                />

                <AddRoom
                    calendar={this.calendarRef}
                    show={this.state.showAddRoom}
                    translate='translateY(-100vh)'
                    closeRoomAddHandler={this.closeRoomAddHandler}
                    url={this.props.rest_url}
                    modifyRoomData={this.state.modifyRoomData}
                    addRoom={this.state.addRoom}
                    modifyRoom={this.state.modifyRoom}
                //activeChecked={this.state.activeChecked}
                >
                </AddRoom>
                <AddReservation
                    show={this.state.showAddReservation}
                    translate='translatey(-100vh)'
                    closeReservationAddHandler={this.closeReservationAddHandler}
                    url={this.props.rest_url}
                    calendar={this.calendarRef}
                    addReservation={this.state.addReservation}
                    modifyReservation={this.state.modifyReservation}
                    modifyReservationData={this.state.modifyReservationData}
                    modifyBookedRoomsData={this.state.modifyBookedRoomsData}>

                </AddReservation>
            </div>
        );
    }
}

export default Calendar;
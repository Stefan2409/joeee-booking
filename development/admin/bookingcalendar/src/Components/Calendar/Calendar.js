import React from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import calendarInteraction from '@fullcalendar/interaction';
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
    };

    calendarRef = React.createRef();

    closeRoomAddHandler = () => {
        this.setState({ showAddRoom: false });
        this.setState({modifyRoomData: {}});
        this.setState({addRoom: false});
        this.setState({modifyRoom: false});
    }

    closeReservationAddHandler = () => {
        this.setState({ showAddReservation: false });
        this.setState({ modifyReservation: false });
        this.setState({ addReservation: false });
    }

    handleEventClick = (clickInfo) => {
        console.log(clickInfo.event.title);
        this.setState({ modifyReservation: true });
        this.setState({ showAddReservation: true });
    }

    handleResourceClick = (arg) => {
        arg.el.addEventListener("click", () => {
            console.log(arg.resource.id);
            axios.get(this.props.rest_url + 'room/' + arg.resource.id)
                .then((roomInfo) => {
                    console.log(roomInfo);
                    this.setState({modifyRoomData: roomInfo.data});
                    this.setState({modifyRoom: true});
                    this.setState({showAddRoom: true});
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
                                this.setState({ showAddRoom: true });
                                this.setState({addRoom: true});
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
                    modifyRoom={this.state.modifyRoom}>
                </AddRoom>
                <AddReservation
                    show={this.state.showAddReservation}
                    translate='translatey(-100vh)'
                    closeReservationAddHandler={this.closeReservationAddHandler}
                    url={this.props.rest_url}
                    calendar={this.calendarRef}
                    addReservation={this.state.addReservation}
                    modifyReservation={this.state.modifyReservation}>

                </AddReservation>
            </div>
        );
    }
}

export default Calendar;
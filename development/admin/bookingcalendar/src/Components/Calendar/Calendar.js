import React from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import calendarInteraction from '@fullcalendar/interaction';
import axios from 'axios';

class Calendar extends React.Component {

    state = {
        showAddRoom: false,
        showAddReservation: false,
    };


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
                    resources={"http://localhost/wp-json/joeee-booking/v1/room"}
                />
            </div>
        );
    }
}

export default Calendar;
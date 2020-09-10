import React from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import calendarInteraction from '@fullcalendar/interaction';
import axios from 'axios';

class Calendar extends React.Component {
    state = {
        currentResources: [],
        resources: {},
    };

    getResources(fetchInfo, successCallback, failureCallback) {
        axios.get("localhost/develop/wp-json/joeee-booking/v1/room")
        .then(response => {
            successCallback(response);
        })
        .catch(err => {
            failureCallback(err);
        })
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
                    left: 'addRoom, addReservation, today, prev, next',
                            center: 'title',
                            right: 'resourceTimelineMonth, resourceTimelineWeek',
                    }}
                    customButtons={{
                    addRoom: {
                        text: 'Add room',    
                    },
                    addReservation: {
                        text: 'Add reservation',
                    },
                    }}
                    resourceAreaWidth={'10%'}
                    resources={this.getResources(fetchInfo, successCallback, failureCallback)}
      />
            </div>
        );
    }
}

export default Calendar;
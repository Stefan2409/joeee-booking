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

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.resources !== this.state.resources) {
    //         axios.get("localhost/develop/wp-json/joeee-booking/v1/room")
    //             .then(response => {
    //                 this.setState({resources: response});
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             });
    //     }
    // }

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
                    resources={[
                        {
                          id: 'a',
                          title: 'Room A'
                        },
                        {
                          id: 'b',
                          title: 'Room B'
                        }
                      ]}
      />
            </div>
        );
    }
}

export default Calendar;
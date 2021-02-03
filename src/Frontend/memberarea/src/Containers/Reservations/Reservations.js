/*global memberData*/

import React, { Component } from 'react';
import classes from './Reservations.module.css';
import Reservation from '../Reservation/Reservation';
import axios from 'axios';

class Reservations extends Component {
    /*     state = {
            reservation: {
                "1": {
                    confirmation: "Pending",
                    adults: 2,
                    kids: 0,
                    booked_from: "2020-05-04",
                    booked_to: "2020-05-11",
                    rooms: {
                        "2": {
                            adults: 2,
                            kids: 3,
                            floor: 2,
                            description: "Room with a view...",
                        },
                        "1": {
                            adults: 2,
                            kids: 1,
                            floor: 1,
                            description: "Room at first floor."
                        }
                    },
                },
                "2": {
                    confirmation: "Confirmed",
                    adults: 3,
                    kids: 1,
                    booked_from: "2020-05-04",
                    booked_to: "2020-05-11",
                    rooms: {
                        "2": {
                            adults: 2,
                            kids: 3,
                            floor: 2,
                            description: "Room with a view...",
                        },
                        "1": {
                            adults: 2,
                            kids: 1,
                            floor: 1,
                            description: "Room at first floor."
                        }
                    },
                },
            }
        }; */
    state = { reservation: {} };

    componentDidMount() {
        axios.get('/joeee-booking/v1/reservation/user', {
            headers: { 'X-WP-Nonce': memberData.restNonce }
        })
            .then(response => {
                this.setState({ reservation: response.data });
                console.log(response.data);
            });
    }

    backgroundConfirmed = (confirmed) => {
        if (confirmed === 'Confirmed') {
            return 'lightgreen';
        }
        if (confirmed === 'Pending') {
            return 'yellow';
        }
    }

    deleteReservation = (id) => {
        console.log(id.replace("joeee-booking-reservation-cancelBtn", ""));

    }

    render() {
        const reservationArray = [];

        for (let key in this.state.reservation) {
            reservationArray.push({
                id: key,
                adults: this.state.reservation[key].adults,
                kids: this.state.reservation[key].kids,
                booked_from: this.state.reservation[key].booked_from,
                booked_to: this.state.reservation[key].booked_to,
                rooms: this.state.reservation[key].rooms,
                confirmed: this.state.reservation[key].confirmation,
            });
        }
        return (
            <div>
                <h3 style={{ marginLeft: "20px" }}>Reservations:</h3>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                <section className={classes.Reservations}>
                    {reservationArray.map(reservation => (
                        <Reservation
                            fromDate={reservation.booked_from}
                            toDate={reservation.booked_to}
                            adults={reservation.adults}
                            kids={reservation.kids}
                            key={reservation.id}
                            btnId={reservation.id}
                            rooms={Object.keys(reservation.rooms).length}
                            confirmed={reservation.confirmed}
                            backgroundColor={this.backgroundConfirmed(reservation.confirmed)}
                            clicked={this.deleteReservation}
                        />
                    ))}


                </section>
            </div>
        );
    }
}

export default Reservations;
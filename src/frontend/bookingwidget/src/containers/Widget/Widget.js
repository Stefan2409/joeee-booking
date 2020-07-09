import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import ShowRooms from '../../components/ShowRooms/ShowRooms';
import Modal from '../../components/UI/Modal/Modal';
import classes from './Widget.module.css';
import './react_dates_override.css';
import axios from 'axios';

class Widget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            adults: null,
            kids: null,
            showRooms: false,
            rooms: [],
        };
    }

    btnClick = (event) => {
        event.preventDefault();
        let formData = {};
        formData.from = this.state.startDate;
        formData.to = this.state.endDate;
        axios.post("joeee-booking/v1/room/availability", formData, { withCredentials: true })
        .then(response => {
            this.setState({rooms: response.data});
            console.log(this.state);
            this.setState({showRooms: true});
        })
        .catch(error => {
            console.log(error);
        });
    }

    adultsState = (e) => {
        this.setState({ adults: e.target.value });
    }

    kidsState = (e) => {
        this.setState({ kids: e.target.value });
    }

    closeModalHandler = () => {
        this.setState({ showRooms: false });
    }


    render() {
        return (
            <Auxiliary>
                <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                    startDatePlaceholderText="Arrival"
                    endDatePlaceholderText="Departure"
                ></DateRangePicker>
                <div>
                    <input type="number" min="1" placeholder="Adults" onChange={this.adultsState} className={classes.Inputs} />
                    <input type="number" min="0" placeholder="Kids" onChange={this.kidsState} className={classes.Inputs} />
                </div>
                <button onClick={this.btnClick} className={classes.Button}>Search</button>
                <Modal show={this.state.showRooms} modalClosed={this.closeModalHandler} translate='translateY(-100vh)'>
                    <h2>Available rooms</h2>
                    {this.state.rooms.map(freerooms => (
                        <ShowRooms
                        roomNr={freerooms.number}
                        adults={freerooms.adults}
                        kids={freerooms.kids}
                        description={freerooms.description}
                        price={freerooms.price}
                        singleRoomSup={freerooms.single_room_supplement}
                        key={freerooms.id}/>
                    ))}
                    
                </Modal>
            </Auxiliary>
        );
    }
}

export default Widget;
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import ShowRooms from '../../components/ShowRooms/ShowRooms';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import classes from './Widget.module.css';
import './react_dates_override.css';
import axios from 'axios';

class Widget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            showRooms: false,
            rooms: [],
            roomsSelected: {},
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.roomsSelected !== this.state.roomsSelected) {
            console.log(this.state);
        }
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

    adultsRoom = (value, id) => {       
            this.setState(prevState => ({
                roomsSelected: {
                    ...prevState.roomsSelected, // copy all other rooms selected
                    [id]: { // add new key with id 
                        ...prevState.roomsSelected[id.toString()], // copy all former attributes
                        adults: value // add changed value
                    }
                }
            }));
            
    }

    kidsRoom = (value, id) => {
        this.setState(prevState => ({
            roomsSelected: {
                ...prevState.roomsSelected, // copy all other rooms selected
                [id]: { // add new key with id 
                    ...prevState.roomsSelected[id.toString()], // copy all former attributes
                    kids: value // add changed value
                }
            }
        }));
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
                <button onClick={this.btnClick} className={classes.Button}>Search</button>
                <Modal show={this.state.showRooms} modalClosed={this.closeModalHandler} translate='translateY(-200vh)'>
                    <div>
                        <h2>Available rooms</h2>
                        {this.state.rooms.map(freerooms => (
                            <ShowRooms
                            roomNr={freerooms.number}
                            adults={freerooms.adults}
                            kids={freerooms.kids}
                            description={freerooms.description}
                            price={freerooms.price}
                            singleRoomSup={freerooms.single_room_supplement}
                            key={freerooms.id}
                            roomID={freerooms.id}
                            adultsRoom={this.adultsRoom}
                            kidsRoom={this.kidsRoom}/>
                        ))}
                        </div>
                </Modal>
                <OrderSummary show={this.state.showRooms}/>
            </Auxiliary>
        );
    }
}

export default Widget;
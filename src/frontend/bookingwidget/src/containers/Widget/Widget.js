import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import classes from './Widget.module.css';
import './react_dates_override.css';

class Widget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            adults: null,
            kids: null,
        };
    }

    btnClick = (event) => {
        event.preventDefault();
        console.log(this.state);
    }

    adultsState = (e) => {
        this.setState({ adults: e.target.value });
    }

    kidsState = (e) => {
        this.setState({ kids: e.target.value });
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
                </div>
                <div>
                    <input type="number" min="0" placeholder="Kids" onChange={this.kidsState} className={classes.Inputs} />
                </div>
                <button onClick={this.btnClick} className={classes.Button}>Search</button>
            </Auxiliary>
        );
    }
}

export default Widget;
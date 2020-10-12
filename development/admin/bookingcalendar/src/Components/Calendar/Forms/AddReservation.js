import React, { useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { removeEmptyFields } from '../../Helpers/removeEmptyFields';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import axios from "axios";
import {Dialog, DialogTitle, DialogContent, DialogActions, Grid, InputLabel, Select, TextField} from '@material-ui/core';
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';

const schema = yup.object().shape({
    arrival: yup.string().required(),
    departure: yup.string().required(),
    adults: yup.number().integer().min(1).required(),
    kids: yup.number().integer(),
    email: yup.string().email(),
    first_name: yup.string(),
    last_name: yup.string(),
    nationality: yup.string().max(2),
    confirmation: yup.number().integer().positive(),
    gender: yup.number().integer(),
    birth: yup.date(),
    tin: yup.string(),
    street: yup.string(),
    zip: yup.string(),
    city: yup.string(),
    country: yup.string().max(2),
});



const AddReservation = (props) => {
    const { register, handleSubmit, watch, reset, errors } = useForm({ resolver: yupResolver(schema) });
    const watchDate = watch(['arrival', 'departure']);
    const [roomAvailable, setRoomAvailable] = useState([]);
    const [countries, setCountries] = useState({ "AT": "Austria" });
    const [info, setInfo] = useState("");
    const [infoColor, setInfoColor] = useState("green");
    const [showInfo, setShowInfo] = useState("hidden");
    const [arrivalDate, handleArrivalDate] = useState(new Date());
    const [departureDate, handleDepartureDate] = useState(new Date());
    const [birthDate, handleBirthDate] = useState(new Date());


    useEffect(() => {
        // We need to check the length otherwise the get request gets triggered infinite times
        if (Object.keys(countries).length === 1) {
            axios.get(props.url + "country")
                .then((data) => {
                    setCountries(data.data);
                })
        }

    });

    const create_userdata = (data) => {
        let userdata = {};
        userdata.email = data.email;
        userdata.first_name = data.first_name;
        userdata.last_name = data.last_name;
        userdata.gender = parseInt(data.gender);
        userdata.birthday = data.birth;
        userdata.nationality = data.nationality;
        userdata.tin = data.tin;
        userdata.street = data.street;
        userdata.zip = data.zip;
        userdata.city = data.city;
        userdata.country = data.country;

        return userdata;
    }

    const createReservationData = (data) => {
        let reservationData = {};
        if (typeof data.room !== 'undefined') {
            reservationData.room_id = data.room.filter(Boolean);
        }
        else {
            console.log("You have to select a room!");
            return false;
        }

        reservationData.booked_from = data.arrival + "T12:00:00";
        reservationData.booked_to = data.departure + "T12:00:00";
        reservationData.adults = data.adults;
        reservationData.kids = data.kids;
        reservationData.confirmation = parseInt(data.confirmation);
        return reservationData;
    }

    const createReservation = (reservationData) => {
        let calendarApi = props.calendar.current.getApi();
        axios.post(props.url + 'reservation', reservationData)
            .then((data) => {
                
                setRoomAvailable([]);
                setInfo("Successfully saved the reservation.")
                setInfoColor("green");
                setShowInfo("visible");
                calendarApi.refetchEvents();
                setTimeout(() => {
                    reset();
                    setShowInfo("hidden");
                    props.closeReservationAddHandler();
                }, 1500);
            })
            .catch((error) => {
                setInfo("Error by saving the reservation!")
                console.log(error);
                setInfoColor("red");
                setShowInfo("visible");
                setTimeout(() => {
                    setShowInfo("hidden");
                }, 2000);
            })
    }

    const onSubmit = (data) => {
        data = removeEmptyFields(data);
        let userdata = create_userdata(data);
        userdata = removeEmptyFields(userdata);
        let reservationData = createReservationData(data);
        if (!reservationData) {
            return;
        }
        console.log(reservationData);

        axios.post(props.url + 'user', userdata)
            .then((data) => {
                reservationData.person_id = data.data.id;
                createReservation(reservationData);

            })
            .catch((error) => {
                setInfo("Error by creating the user.")
                console.log(error);
                setInfoColor("red");
                setShowInfo("visible");

                setTimeout(() => {
                    setShowInfo("hidden");
                }, 1500);
            });

    }

    const resetForm = (e) => {
        e.preventDefault();
        reset();
        setRoomAvailable([]);
        props.closeReservationAddHandler();
    }

    const handleKeyPress = (date) => {
        handleDepartureDate(date);
        console.log(departureDate.toDateString);
        if ((watchDate.arrival.length !== 10) && (watchDate.departure.length !== 10)) {
            return;
        }
        let checkAvailability = {};

        checkAvailability.from = watchDate.arrival + " 12:01:00";
        checkAvailability.to = watchDate.departure + " 11:59:00";
        axios.post(props.url + 'room/availability', checkAvailability)
            .then((rooms) => {
                setRoomAvailable(rooms.data);
            })
            .catch((err) => {
                console.log(err);
            });
        
    }

    return (
        <Dialog open={props.show} onClose={props.closeReservationAddHandler} maxWidth="lg" fullWidth area-labelledby="joeee-booking-reservation-form-title">
            <DialogTitle id="joeee-booking-reservation-form-title" >Add Reservation</DialogTitle>
            <DialogContent>
                <Grid container>
            <form onSubmit={onSubmit}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item xs={12} sm={6}>
                        <DatePicker value={arrivalDate} label="Arrival" name="arrival" onChange={handleArrivalDate} inputRef={register}/>
                    <p>{errors.arrival?.message}</p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <DatePicker value={departureDate} label="Departure" name="departure" onChange={handleKeyPress} inputRef={register}/>
                    <p>{errors.departure?.message}</p>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                    <TextField label="Adults" type="number" variant="outlined" name="adults" fullWidth inputRef={register} />
                    <p>{errors.adults?.message}</p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField label="Kids" type="number" variant="outlined" name="kids" fullWidth inputRef={register} />
                    <p>{errors.kids?.message}</p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField label="E-Mail" type="email" variant="outlined" name="email" inputRef={register} />
                    <p>{errors.email?.message}</p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField label="First Name" type="text" variant="outlined" name="first_name" inputRef={register} />
                    <p>{errors.first_name?.message}</p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField label="Last Name" type="text" variant="outlined" name="last_name" inputRef={register} />
                    <p>{errors.last_name?.message}</p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <InputLabel id="joeee-booking-reservation-nationality">Nationality</InputLabel>
                    <Select labelId="joeee-booking-reservation-nationality" variant="outlined" name="nationality" fullWidth ref={register}>
                        {Object.keys(countries).map((key, index) => {
                            return (<option value={key} key={key}>{countries[key]}</option>)
                        })}
                    </Select>
                    <p>{errors.nationality?.message}</p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <InputLabel id="joeee-booking-reservation-confirmation">Confirmation Status</InputLabel>
                    <Select labelId="joeee-booking-reservation-confirmation" variant="outlined" fullWidth name="confirmation" ref={register}>
                        <option value="2">Pending</option>
                        <option value="1">Confirmed</option>
                        <option value="3">Denied</option>
                    </Select>
                    <p>{errors.confirmation?.message}</p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <InputLabel id="joeee-booking-reservation-gender">Gender</InputLabel>
                    <Select labelId="joeee-booking-reservation-gender" variant="outlined" fullWidth name="gender" ref={register}>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                        <option value="3">Other</option>
                    </Select>
                    <p>{errors.gender?.message}</p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <DatePicker label="Date of Birth" value={birthDate} onChange={handleBirthDate} variant="outlined" name="birth" inputRef={register} />
                    <p>{errors.birth?.message}</p>
                    </Grid>
                    </MuiPickersUtilsProvider>
                    <Grid item xs={12} sm={6}>
                    <TextField label="TIN" type="text" variant="outlined" name="tin" inputRef={register} />
                    <p>{errors.tin?.message}</p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField label="Street/House Nr.:" type="text" variant="outlined" name="street" inputRef={register} />
                    <p>{errors.street?.message}</p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField label="ZIP" type="text" variant="outlined" name="zip" inputRef={register} />
                    <p>{errors.zip?.message}</p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField label="City" type="text" variant="outlined" name="city" inputRef={register} />
                    <p>{errors.city?.message}</p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <InputLabel id="joeee-booking-reservation-country">Country</InputLabel>
                    <Select labelId="joeee-booking-reservation-country" variant="outlined" fullWidth name="country" ref={register}>
                        {Object.keys(countries).map((key, index) => {
                            return (<option value={key} key={key}>{countries[key]}</option>)
                        })}
                    </Select>
                    {roomAvailable.map((room, index) => {
                        return (
                            <div key={room.id}>
                                <label htmlFor={'joeee-booking-reservation-room-' + room.id}>Room {room.number}</label>
                                <input type="checkbox" key={room.id} value={room.id} id={'joeee-booking-reservation-room-' + room.id} name={"room[" + index + "]"} ref={register} />
                            </div>
                        )
                    })}
                    <p style={{ visibility: showInfo, color: infoColor }}>{info}</p>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                    <button onClick={handleSubmit(onSubmit)}>Submit</button>
                    <button onClick={resetForm}>Cancel</button>
                    </Grid>
                    
            </form>
            </Grid>
            </DialogContent>
        </Dialog>
    );
}

export default AddReservation;
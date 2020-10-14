import React, { useState, useEffect } from 'react';
import { addDays, format, differenceInDays } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { removeEmptyFields } from '../../Helpers/removeEmptyFields';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import axios from "axios";
import { Button, ButtonGroup, Checkbox, Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, FormGroup, Grid, TextField, FormControl } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ReactHookFormSelect from '../../Helpers/ReactHookFormSelect';

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
    birth: yup.string(),
    tin: yup.string(),
    street: yup.string(),
    zip: yup.string(),
    city: yup.string(),
    country: yup.string().max(2),
});



const AddReservation = (props) => {
    const { register, handleSubmit, reset, errors, control } = useForm({ resolver: yupResolver(schema) });
    const [roomAvailable, setRoomAvailable] = useState([]);
    const [countries, setCountries] = useState({ "AT": "Austria" });
    const [info, setInfo] = useState("");
    const [infoColor, setInfoColor] = useState("green");
    const [showInfo, setShowInfo] = useState("hidden");
    const [arrivalDate, setArrivalDate] = useState(addDays(new Date(), 1));
    const [departureDate, setDepartureDate] = useState(addDays(new Date(), 2));
    const [birthDate, setBirthDate] = useState(new Date());

    useEffect(() => {
        // We need to check the length otherwise the get request gets triggered infinite times
        if (Object.keys(countries).length === 1) {
            axios.get(props.url + "country")
                .then((data) => {
                    setCountries(data.data);
                })
        }
    });

    useEffect(() => {
        let checkAvailability = {};
        checkAvailability.from = format(arrivalDate, 'yyyy-MM-dd') + " 12:01:00";
        checkAvailability.to = format(departureDate, 'yyyy-MM-dd') + " 11:59:00";
        axios.post(props.url + 'room/availability', checkAvailability)
            .then((rooms) => {
                setRoomAvailable(rooms.data);
                console.log("Sended availability.");
                console.log(rooms.data);
            })
            .catch((err) => {
                console.log(err);
            });


    }, [arrivalDate, departureDate]);

    const create_userdata = (data) => {
        let userdata = {};
        userdata.email = data.email;
        userdata.first_name = data.first_name;
        userdata.last_name = data.last_name;
        userdata.gender = parseInt(data.gender);
        userdata.birthday = data.birth + "T12:00:00";
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
                console.log(data.response);
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
        console.log(data);
        data = removeEmptyFields(data);
        let userdata = create_userdata(data);
        userdata = removeEmptyFields(userdata);
        console.log(userdata);
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

    const handleDepartureDate = (date) => {
        setDepartureDate(date);
    }

    const handleArrivalDate = (date) => {
        setArrivalDate(date);
    }

    const handleBirthDate = (date) => {
        setBirthDate(date);
    }

    const onModify = (data) => {
        console.log(data);
    }

    return (
        <Dialog open={props.show} onClose={props.closeReservationAddHandler} maxWidth="lg" fullWidth area-labelledby="joeee-booking-reservation-form-title">
            <DialogTitle id="joeee-booking-reservation-form-title" >Add Reservation</DialogTitle>
            <DialogContent>
                <form onSubmit={props.addReservation ? onSubmit : onModify}>
                    <Grid container spacing={1}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid item xs={12} sm={6}>
                                <DatePicker
                                    autoOk
                                    format="yyyy-MM-dd"
                                    value={arrivalDate}
                                    label="Arrival"
                                    minDate={addDays(new Date(), 1)}
                                    name="arrival"
                                    disablePast
                                    onChange={handleArrivalDate}
                                    inputRef={register} />
                                <p>{errors.arrival?.message}</p>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DatePicker
                                    autoOk
                                    format="yyyy-MM-dd"
                                    value={departureDate}
                                    label="Departure"
                                    minDate={addDays(new Date(), 2)}
                                    name="departure"
                                    disablePast
                                    onChange={handleDepartureDate}
                                    inputRef={register} />
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
                                <TextField label="E-Mail" type="email" variant="outlined" name="email" fullWidth inputRef={register} />
                                <p>{errors.email?.message}</p>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="First Name" type="text" variant="outlined" name="first_name" fullWidth inputRef={register} />
                                <p>{errors.first_name?.message}</p>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Last Name" type="text" variant="outlined" name="last_name" fullWidth inputRef={register} />
                                <p>{errors.last_name?.message}</p>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <ReactHookFormSelect
                                    id="joeee-booking-reservation-nationality"
                                    label="Nationality"
                                    control={control}
                                    defaultValue="AT"
                                    variant="outlined"
                                    name="nationality"
                                    fullWidth >
                                    {Object.keys(countries).map((key, index) => {
                                        return (<option value={key} key={key}>{countries[key]}</option>)
                                    })}
                                </ReactHookFormSelect>
                                <p>{errors.nationality?.message}</p>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <ReactHookFormSelect
                                    id="joeee-booking-reservation-confirmation"
                                    label="Confirmation Status"
                                    control={control}
                                    variant="outlined"
                                    defaultValue="2"
                                    fullWidth
                                    name="confirmation" >
                                    <option value="2">Pending</option>
                                    <option value="1">Confirmed</option>
                                    <option value="3">Denied</option>
                                </ReactHookFormSelect>
                                <p>{errors.confirmation?.message}</p>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <ReactHookFormSelect
                                    id="joeee-booking-reservation-gender"
                                    label="Gender"
                                    control={control}
                                    variant="outlined"
                                    defaultValue="1"
                                    fullWidth
                                    name="gender" >
                                    <option value="1">Male</option>
                                    <option value="2">Female</option>
                                    <option value="3">Other</option>
                                </ReactHookFormSelect>
                                <p>{errors.gender?.message}</p>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DatePicker
                                    label="Date of Birth"
                                    format="yyyy-MM-dd"
                                    value={birthDate}
                                    onChange={handleBirthDate}
                                    disableFuture
                                    variant="outlined"
                                    name="birth"
                                    inputRef={register} />
                                <p>{errors.birth?.message}</p>
                            </Grid>
                        </MuiPickersUtilsProvider>
                        <Grid item xs={12} sm={6}>
                            <TextField label="TIN" type="text" variant="outlined" name="tin" fullWidth inputRef={register} />
                            <p>{errors.tin?.message}</p>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Street/House Nr.:" type="text" variant="outlined" name="street" fullWidth inputRef={register} />
                            <p>{errors.street?.message}</p>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="ZIP" type="text" variant="outlined" name="zip" fullWidth inputRef={register} />
                            <p>{errors.zip?.message}</p>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="City" type="text" variant="outlined" name="city" fullWidth inputRef={register} />
                            <p>{errors.city?.message}</p>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ReactHookFormSelect
                                id="joeee-booking-reservation-country"
                                label="Country"
                                control={control}
                                defaultValue="AT"
                                variant="outlined"
                                fullWidth
                                name="country" >
                                {Object.keys(countries).map((key, index) => {
                                    return (<option value={key} key={key}>{countries[key]}</option>)
                                })}
                            </ReactHookFormSelect>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup row>
                                {roomAvailable.map((room, index) => {
                                    return (
                                        <FormControlLabel
                                            control={<Checkbox color="primary" value={room.id} key={room.id} name={"room[" + index + "]"} inputRef={register} />}
                                            label={room.number}
                                            key={room.id}
                                        />
                                    )
                                })}
                            </FormGroup>
                        </Grid>
                        <p style={{ visibility: showInfo, color: infoColor }}>{info}</p>



                        <Grid item xs={12}>
                            <FormControl>
                                {props.addReservation && (
                                    <ButtonGroup variant="contained">
                                        <Button color="primary" onClick={handleSubmit(onSubmit)}>Submit</Button>
                                        <Button color="secondary" onClick={resetForm}>Cancel</Button>
                                    </ButtonGroup>
                                )}
                                {props.modifyReservation && (
                                    <ButtonGroup variant="contained">
                                        <Button color="primary" onClick={handleSubmit(onModify)}>Update</Button>
                                        <Button color="secondary" onClick={resetForm}>Cancel</Button>
                                    </ButtonGroup>
                                )}
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>

            </DialogContent>
        </Dialog>
    );
}

export default AddReservation;
import React, { useState, useEffect } from 'react';
import Modal from '../../UI/Modal/Modal';
import { removeEmptyFields } from '../../Helpers/removeEmptyFields';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import axios from "axios";


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
        axios.post(props.url + 'reservation', reservationData)
            .then((data) => {
                setRoomAvailable([]);
                setInfo("Successfully saved the reservation.")
                setInfoColor("green");
                setShowInfo("visible");
                setTimeout(() => {
                    reset();
                    setShowInfo("hidden");
                    props.closeReservationAddHandler();
                }, 1500);
            })
            .catch((error) => {
                setInfo("Error by saving the reservation!")
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

    const handleKeyPress = () => {
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
        <Modal show={props.show} translate={props.translate} modalClosed={props.closeReservationAddHandler}>
            <h2>Add Reservation</h2>
            <form>
                <div>
                    <label htmlFor="joeee-booking-reservation-arrival">Arrival</label>
                    <input id="joeee-booking-reservation-arrival" type="date" placeholder="Arrival" name="arrival" ref={register} />
                    <p>{errors.arrival?.message}</p>
                    <label htmlFor="joeee-booking-reservation-departure">Departure</label>
                    <input id="joeee-booking-reservation-departure" type="date" placeholder="Departure" name="departure" ref={register}
                        onChange={handleKeyPress} />
                    <p>{errors.departure?.message}</p>
                    <label htmlFor="joeee-booking-reservation-adults">Adults</label>
                    <input id="joeee-booking-reservation-adults" type="number" placeholder="Adults" name="adults" ref={register} />
                    <p>{errors.adults?.message}</p>
                    <label htmlFor="joeee-booking-reservation-kids">Kids</label>
                    <input id="joeee-booking-reservation-kids" type="number" placeholder="Kids" name="kids" ref={register} />
                    <p>{errors.kids?.message}</p>
                    <label htmlFor="joeee-booking-reservation-email">E-Mail</label>
                    <input id="joeee-booking-reservation-email" type="email" placeholder="E-Mail" name="email" ref={register} />
                    <p>{errors.email?.message}</p>
                    <label htmlFor="joeee-booking-reservation-firstname">First Name</label>
                    <input id="joeee-booking-reservation-firstname" type="text" placeholder="First Name" name="first_name" ref={register} />
                    <p>{errors.first_name?.message}</p>
                    <label htmlFor="joeee-booking-reservation-lastname">Last Name</label>
                    <input id="joeee-booking-reservation-lastname" type="text" placeholder="Last Name" name="last_name" ref={register} />
                    <p>{errors.last_name?.message}</p>
                    <label htmlFor="joeee-booking-reservation-nationality">Nationality</label>
                    <select id="joeee-booking-reservation-nationality" name="nationality" ref={register}>
                        {Object.keys(countries).map((key, index) => {
                            return (<option value={key} key={key}>{countries[key]}</option>)
                        })}
                    </select>
                    <p>{errors.nationality?.message}</p>
                </div>
                <div>
                    <label htmlFor="joeee-booking-reservation-confirmation">Confirmation Status</label>
                    <select id="joeee-booking-reservation-confirmation" name="confirmation" ref={register}>
                        <option value="2">Pending</option>
                        <option value="1">Confirmed</option>
                        <option value="3">Denied</option>
                    </select>
                    <p>{errors.confirmation?.message}</p>
                    <label htmlFor="joeee-booking-reservation-gender">Gender</label>
                    <select id="joeee-booking-reservation-gender" name="gender" ref={register}>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                        <option value="3">Other</option>
                    </select>
                    <p>{errors.gender?.message}</p>
                    <label htmlFor="joeee-booking-reservation-birth">Date of Birth</label>
                    <input id="joeee-booking-reservation-birth" type="date" placeholder="Date of Birth" name="birth" ref={register} />
                    <p>{errors.birth?.message}</p>
                    <label htmlFor="joeee-booking-reservation-tin">TIN</label>
                    <input id="joeee-booking-reservation-tin" type="text" placeholder="TIN" name="tin" ref={register} />
                    <p>{errors.tin?.message}</p>
                    <label htmlFor="joeee-booking-reservation-street">Street/House Nr.:</label>
                    <input id="joeee-booking-reservation-street" type="text" placeholder="Street/House Nr." name="street" ref={register} />
                    <p>{errors.street?.message}</p>
                    <label htmlFor="joeee-booking-reservation-zip">ZIP</label>
                    <input id="joeee-booking-reservation-zip" type="text" placeholder="ZIP" name="zip" ref={register} />
                    <p>{errors.zip?.message}</p>
                    <label htmlFor="joeee-booking-reservation-city">City</label>
                    <input id="joeee-booking-reservation-city" type="text" placeholder="City" name="city" ref={register} />
                    <p>{errors.city?.message}</p>
                    <label htmlFor="joeee-booking-reservation-country">Country</label>
                    <select id="joeee-booking-reservation-country" name="country" ref={register}>
                        {Object.keys(countries).map((key, index) => {
                            return (<option value={key} key={key}>{countries[key]}</option>)
                        })}
                    </select>
                    {roomAvailable.map((room, index) => {
                        return (
                            <div key={room.id}>
                                <label htmlFor={'joeee-booking-reservation-room-' + room.id}>Room {room.number}</label>
                                <input type="checkbox" key={room.id} value={room.id} id={'joeee-booking-reservation-room-' + room.id} name={"room[" + index + "]"} ref={register} />
                            </div>
                        )
                    })}
                    <p style={{ visibility: showInfo, color: infoColor }}>{info}</p>


                    <button onClick={handleSubmit(onSubmit)}>Submit</button>
                    <button onClick={resetForm}>Cancel</button>
                </div>
            </form>
        </Modal>
    );
}

export default AddReservation;
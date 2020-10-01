import React, { useState, useEffect } from 'react';
import Modal from '../../UI/Modal/Modal';
import { removeEmptyFields } from '../../Helpers/removeEmptyFields';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import axios from "axios";


const schema = yup.object().shape({
    arrival: yup.string().required(),
    departure: yup.date().required(),
    adults: yup.number().integer().min(1).required(),
    kids: yup.number().integer(),
    email: yup.string().email(),
    first_name: yup.string(),
    last_name: yup.string(),
    nationality: yup.number().integer(),
    confirmation: yup.number().integer().positive(),
    gender: yup.number().integer(),
    birth: yup.date(),
    tin: yup.string(),
    street: yup.string(),
    zip: yup.string(),
    city: yup.string(),
    country: yup.number(),
});



const AddReservation = (props) => {
    const { register, handleSubmit, reset, errors } = useForm({ resolver: yupResolver(schema) });
    const [countries, setCountries] = useState({});

    useEffect(() => {
        axios.get(props.url + "country")
            .then((data) => {
                setCountries(data.data);
            })
    });

    const onSubmit = (data) => {
        data = removeEmptyFields(data);
        console.log(data);
        console.log(countries);
    }

    const resetForm = (e) => {
        e.preventDefault();
        reset();
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
                    <input id="joeee-booking-reservation-departure" type="date" placeholder="Departure" name="departure" ref={register} />
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
                        {countries.map((iso, country) => {
                            return (<option value={iso}>{country}</option>)
                        })}
                    </select>
                    <p>{errors.nationality?.message}</p>
                </div>
                <div>
                    <label htmlFor="joeee-booking-reservation-confirmation">Confirmation Status</label>
                    <select id="joeee-booking-reservation-confirmation" name="confirmation" ref={register}>
                        <option value="1">Pending</option>
                        <option value="2">Confirmed</option>
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
                        <option value="1">Austria</option>
                        <option value="2">Germany</option>
                        <option value="3">Belarus</option>
                    </select>

                    <button onClick={handleSubmit(onSubmit)}>Submit</button>
                    <button onClick={resetForm}>Cancel</button>
                </div>
            </form>
        </Modal>
    );
}

export default AddReservation;
import React, { useState } from 'react';
import Modal from '../../UI/Modal/Modal';
import { removeEmptyFields } from '../../Helpers/removeEmptyFields';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
    number: yup.string().required(),
    floor: yup.number().positive().integer().required(),
    adults: yup.number().positive().integer().required(),
    kids: yup.number().min(0).integer(),
    price: yup.number().positive().required(),
    single_room_supplement: yup.number().positive().required(),
    image_url: yup.string(),
    description: yup.string(),
    active: yup.bool(),
});

const AddRoom = (props) => {
    const { register, handleSubmit, reset, errors } = useForm({ resolver: yupResolver(schema) });
    const [info, setInfo] = useState("");
    const [infoColor, setInfoColor] = useState("green");
    const [showInfo, setShowInfo] = useState("hidden");

    const onSubmit = (data) => {
        data = removeEmptyFields(data);
        let calendarApi = props.calendar.current.getApi();
        console.log(data);
        axios.post(props.url + "room", data)
            .then(function (response) {
                console.log(response);
                setInfo("Successfully saved the room.")
                setInfoColor("green");
                setShowInfo("visible");
                calendarApi.refetchResources();
                setTimeout(() => {
                    reset();
                    setShowInfo("hidden");
                    props.closeRoomAddHandler();
                }, 2000);

            })
            .catch(function (error) {
                console.log(error);
                setInfo(error.response.data.message);
                setInfoColor("red");
                setShowInfo("visible");
            })
    };

    const resetForm = (e) => {
        e.preventDefault();
        reset();
        props.closeRoomAddHandler();
    }
    return (
        <Modal show={props.show} translate={props.translate} modalClosed={props.closeRoomAddHandler}>
            <h2>Add Room</h2>
            <form>
                <input type="hidden" name="id" />
                <label htmlFor="joeee-booking-roomnumber">Room Number</label>
                <input id="joeee-booking-roomnumber" type="text" placeholder="Room Number" name="number" ref={register({ required: true, maxLength: 80 })} />
                <p>{errors.number?.message}</p>
                <label htmlFor="joeee-booking-floornumber">Floor Number</label>
                <input id="joeee-booking-floornumber" type="number" placeholder="Floor Number" name="floor" ref={register({ required: true, maxLength: 80 })} />
                <p>{errors.floor?.message}</p>
                <label htmlFor="joeee-booking-roomadults">Adults</label>
                <input id="joeee-booking-roomadults" type="number" placeholder="Adults" name="adults" ref={register({ required: true })} />
                <p>{errors.adults?.message}</p>
                <label htmlFor="joeee-booking-roomkids">Kids</label>
                <input id="joeee-booking-roomkids" type="number" placeholder="Kids" name="kids" ref={register} />
                <p>{errors.kids?.message}</p>
                <label htmlFor="joeee-booking-roomprice">Price</label>
                <input id="joeee-booking-roomprice" type="text" placeholder="Price" name="price" ref={register({ required: true })} />
                <p>{errors.price?.message}</p>
                <label htmlFor="joeee-booking-singleroom">Single Room Supplement</label>
                <input id="joeee-booking-singleroom" type="text" placeholder="Single Room Supplement" name="single_room_supplement" ref={register({ required: true })} />
                <p>{errors.single_room_supplement?.message}</p>
                <label htmlFor="joeee-booking-roomimage">Room Image Url</label>
                <input id="joeee-booking-roomimage" type="text" placeholder="Image URL" name="image_url" ref={register} />
                <p>{errors.image_url?.message}</p>
                <label htmlFor="joeee-booking-roomdescription">Description</label>
                <textarea id="joeee-booking-roomdescription" name="description" ref={register} />
                <p>{errors.description?.message}</p>
                <label htmlFor="joeee-booking-roomactive">Active</label>
                <input id="joeee-booking-roomactive" type="checkbox" placeholder="Active" name="active" ref={register} />
                <p>{errors.active?.message}</p>

                <p style={{ visibility: showInfo, color: infoColor }}>{info}</p>

                <button onClick={handleSubmit(onSubmit)}>Submit</button>
                <button onClick={resetForm}>Cancel</button>
            </form>
        </Modal>
    );

}

export default AddRoom;
import React from 'react';
import Modal from '../../UI/Modal/Modal';
import { useForm } from 'react-hook-form';

const AddRoom = (props) => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <Modal show={props.show} translate={props.translate} modalClosed={props.closeRoomAddHandler}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="joeee-booking-roomnumber">Room Number</label>
                <input id="joeee-booking-roomnumber" type="text" placeholder="Room Number" name="Room Number" ref={register({ required: true, maxLength: 80 })} />
                <label htmlFor="joeee-booking-floornumber">Floor Number</label>
                <input id="joeee-booking-floornumber" type="text" placeholder="Floor Number" name="Floor Number" ref={register({ required: true, maxLength: 80 })} />
                <label htmlFor="joeee-booking-roomadults">Adults</label>
                <input id="joeee-booking-roomadults" type="number" placeholder="Adults" name="Adults" ref={register({ required: true })} />
                <label htmlFor="joeee-booking-roomkids">Kids</label>
                <input id="joeee-booking-roomkids" type="number" placeholder="Kids" name="Kids" ref={register} />
                <label htmlFor="joeee-booking-roomprice">Price</label>
                <input id="joeee-booking-roomprice" type="text" placeholder="Price" name="Price" ref={register({ required: true })} />
                <label htmlFor="joeee-booking-singleroom">Single Room Supplement</label>
                <input id="joeee-booking-singleroom" type="text" placeholder="Single Room Supplement" name="Single Room Supplement" ref={register({ required: true })} />
                <label htmlFor="joeee-booking-roomimage">Room Image Url</label>
                <input id="joeee-booking-roomimage" type="text" placeholder="Image URL" name="Image URL" ref={register} />
                <label htmlFor="joeee-booking-roomdescription">Description</label>
                <textarea id="joeee-booking-roomdescription" name="Description" ref={register} />
                <label htmlFor="joeee-booking-roomactive">Active</label>
                <input id="joeee-booking-roomactive" type="checkbox" placeholder="Active" name="Active" ref={register} />

                <input type="submit" />
            </form>
        </Modal>
    );

}

export default AddRoom;
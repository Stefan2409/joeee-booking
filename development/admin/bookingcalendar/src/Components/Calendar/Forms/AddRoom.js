import React from 'react';
import Modal from '../../UI/Modal/Modal';
import {useForm} from 'react-hook-form';

const AddRoom = (props) => {
    const {register, handleSubmit} = useForm();
    const onSubmit = data => console.log(data);
    return (
        <Modal show = {props.showAddRoom}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="first_name" ref={register} />
                <select name="gender" ref={register}>
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="other">other</option>
                </select>
                <input type="submit" />
            </form>
        </Modal>
    );

}

export default AddRoom;
import React from 'react';
import Modal from '../../UI/Modal/Modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";

const AddReservation = (props) => {
    return (
        <Modal show={props.show} translate={props.translate} modalClosed={props.closeReservationAddHandler}>
            <p>Test</p>
        </Modal>
    );
}

export default AddReservation;
import React, { useState, useEffect } from 'react';
import { removeEmptyFields } from '../../Helpers/removeEmptyFields';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "axios";
import { Button, ButtonGroup, CircularProgress, Dialog, DialogContent, DialogActions, FormControlLabel, Grid, DialogTitle, Switch, TextField } from '@material-ui/core';

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
    const { register, handleSubmit, reset, errors, control } = useForm({ resolver: yupResolver(schema) });
    const [info, setInfo] = useState("");
    const [infoColor, setInfoColor] = useState("green");
    const [showInfo, setShowInfo] = useState("hidden");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let data = props.modifyRoomData;
        if (data.active === "0") {
            delete data.active;
        }
        reset(data);
    }, [props.modifyRoomData, reset]);

    const onSubmit = (data) => {
        console.log(data);
        setLoading(true);
        data = removeEmptyFields(data);
        let calendarApi = props.calendar.current.getApi();
        console.log(data);
        axios.post(props.url + "room", data)
            .then(function (response) {
                console.log(response);
                setLoading(false);
                setInfo("Successfully saved the room.")
                setInfoColor("green");
                setShowInfo("visible");
                calendarApi.refetchResources();
                setTimeout(() => {
                    reset();
                    setShowInfo("hidden");
                    props.closeRoomAddHandler();
                }, 1500);

            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
                setInfo(error.response.data.message);
                setInfoColor("red");
                setShowInfo("visible");
            })
    };

    const onModify = (data) => {
        setLoading(true);
        data = removeEmptyFields(data);
        let calendarApi = props.calendar.current.getApi();
        delete data.id;

        console.log(data);
        axios.post(props.url + "room/" + props.modifyRoomData.id, data)
            .then(function (response) {
                setLoading(false);
                console.log(response);
                setInfo("Successfully saved the room.")
                setInfoColor("green");
                setShowInfo("visible");
                calendarApi.refetchResources();
                setTimeout(() => {
                    reset();
                    setShowInfo("hidden");
                    props.closeRoomAddHandler();
                }, 1500);

            })
            .catch(function (error) {
                setLoading(false);
                console.log(error);
                setInfo(error.response.data.message);
                setInfoColor("red");
                setShowInfo("visible");
            })
    };

    const deleteRoom = (e) => {
        e.preventDefault();
        console.log(props.modifyRoomData.id);
        console.log("Delete room clicked.");
    }

    const resetForm = (e) => {
        e.preventDefault();
        reset();
        props.closeRoomAddHandler();
    }
    return (
        <Dialog open={props.show} onClose={props.closeRoomAddHandler} aria-labelledby="joeee-room-booking-room-dialog-title">
            <DialogTitle id="joeee-room-booking-room-dialog-title">Add Room</DialogTitle>
            <DialogContent>
                <form>
                    <Grid container spacing={2}>
                        <input type="hidden" name="id" />
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Room Number"
                                name="number"
                                variant="outlined"
                                type="text"
                                error={errors.number ? true : false}
                                helperText={errors.number?.message}
                                inputRef={register} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Floor Number"
                                name="floor"
                                variant="outlined"
                                type="number"
                                error={errors.floor ? true : false}
                                helperText={errors.floor?.message}
                                inputRef={register} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Adults"
                                name="adults"
                                variant="outlined"
                                type="number"
                                defaultValue={0}
                                error={errors.adults ? true : false}
                                helperText={errors.adults?.message}
                                inputRef={register} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Kids"
                                name="kids"
                                variant="outlined"
                                type="number"
                                defaultValue={0}
                                error={errors.kids ? true : false}
                                helperText={errors.kids?.message}
                                inputRef={register} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Price per Night and Person"
                                name="price" variant="outlined"
                                type="text"
                                error={errors.price ? true : false}
                                helperText={errors.price?.message}
                                inputRef={register} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Single Room Supplement per Night"
                                name="single_room_supplement"
                                variant="outlined"
                                type="text"
                                error={errors.single_room_supplement ? true : false}
                                helperText={errors.single_room_supplement?.message}
                                inputRef={register} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Room Image Url"
                                name="image_url"
                                variant="outlined"
                                type="text"
                                error={errors.image_url ? true : false}
                                helperText={errors.image_url?.message}
                                inputRef={register} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Description"
                                multiline name="description"
                                variant="outlined"
                                type="text"
                                error={errors.description ? true : false}
                                helperText={errors.description?.message}
                                inputRef={register} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="active"
                                control={control}
                                defaultValue={false}
                                render={(props) => (
                                    <FormControlLabel
                                        control={<Switch
                                            name="active"
                                            color="primary"
                                            onChange={(e) => props.onChange(e.target.checked)}
                                            checked={props.value} />}
                                        label="Active"

                                    />

                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {loading && <CircularProgress />}
                            <p style={{ visibility: showInfo, color: infoColor }}>{info}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <DialogActions>

                                {props.modifyRoom && (
                                    <ButtonGroup variant="contained">
                                        <Button color="primary" onClick={handleSubmit(onModify)}>Save</Button>
                                        <Button color="secondary" onClick={resetForm}>Cancel</Button>
                                        <Button color="secondary" onClick={deleteRoom}>Delete Room</Button>
                                    </ButtonGroup>
                                )}
                                {props.addRoom && (
                                    <ButtonGroup variant="contained">
                                        <Button color="primary" onClick={handleSubmit(onSubmit)}>Save</Button>
                                        <Button color="secondary" onClick={resetForm}>Cancel</Button>
                                    </ButtonGroup>
                                )}

                            </DialogActions>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
    );

}

export default AddRoom;
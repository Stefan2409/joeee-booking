/*global wp*/
/*global restRoute*/
import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import RegisterMaster from '../Register/RegisterMaster';
import classes from './Login.module.css';
import axios from 'axios';

const { __, _x, _n, _nx } = wp.i18n;

class Login extends Component {
    state = {
        showlogin: false,
        showregister: false,
        formIsValid: false,
        loginForm: {
            user_login: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: __('Email', 'joeee-booking'),
                    name: 'email'
                },
                value: '',
                validation: {
                    required: true,
                },
                touched: false,
                valid: false
            },
            user_password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: __('Password', 'joeee-booking'),
                    name: 'password'
                },
                value: '',
                validation: {
                    required: true,
                },
                touched: false,
                valid: false
            }
        }
    };

    closeModalHandler = () => {
        this.setState({ showlogin: false });
    }

    closeRegisterModalHandler = () => {
        this.setState({ showregister: false });
    }

    openModalHandler = () => {
        this.setState({ showlogin: true });
    }

    inputChangedHandler = (event, inputIdentifier) => {

        const updatedLoginForm = {
            ...this.state.loginForm
        };
        const updatedFormElement = {
            ...updatedLoginForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedLoginForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifiers in updatedLoginForm) {
            formIsValid = updatedLoginForm[inputIdentifiers].valid && formIsValid;
        }
        this.setState({ loginForm: updatedLoginForm, formIsValid: formIsValid });
    }

    checkValidity = (value, rules) => {
        // Trick that all checks must be true to get a valid result. && isValid
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        return isValid;
    }

    onSubmit = event => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.loginForm) {
            formData[formElementIdentifier] = this.state.loginForm[formElementIdentifier].value;
        }
        axios.post("joeee-booking/v1/user/login", formData, { withCredentials: true })
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
                this.setState({ formIsValid: false });
                console.log(error);
            });
    }

    showRegisterForm = () => {
        this.closeModalHandler();
        this.setState({ showregister: true });
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.loginForm) {
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }
        return (
            <Aux>
                <Modal show={this.state.showlogin} modalClosed={this.closeModalHandler} translate='translateY(-100vh)'>
                    <h2>Login</h2>
                    <form onSubmit={this.onSubmit}>
                        {formElementsArray.map(formElement => (
                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                touched={formElement.config.touched}
                                shouldValidate={formElement.config.validation}
                                invalid={!formElement.config.valid}
                            />
                        ))}
                        <p onClick={this.showRegisterForm} className={classes.Register} >REGISTER</p>
                        <Button type="submit" btnType="Success" disabled={!this.state.formIsValid}>LOGIN</Button>

                    </form>
                </Modal>
                <Modal show={this.state.showregister} modalClosed={this.closeRegisterModalHandler} translate='translateY(-10000vh)' scrollable={true}>
                    <RegisterMaster></RegisterMaster>
                </Modal>
                <span onClick={this.openModalHandler} style={{ cursor: 'pointer' }}>Login</span>
            </Aux>
        );
    }
}

export default Login;
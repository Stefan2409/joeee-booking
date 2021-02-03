import React, { Component } from 'react';
import axios from 'axios';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';


class Register extends Component {
    state = {
        showregister: true,
        formIsValid: false,
        registerForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: /*__(*/'Email'/*, 'joeee-booking')*/,
                },
                value: '',
                validation: {
                    required: true,
                },
                touched: false,
                valid: false
            },
            first_name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name',
                },
                value: '',
                validation: {
                    required: true,
                },
                touched: false,
                valid: false
            },
            last_name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name',
                },
                value: '',
                validation: {
                    required: true,
                },
                touched: false,
                valid: false
            },
            gender: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 1, displayValue: 'Male'},
                        {value: 2, displayValue: 'Female'}
                    ]
                },
                value: '1',
                validation: {},
                touched: false,
                valid: false
            },
            birthday: {
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'Birthday',
                },
                value: '',
                validation: {
                    required: true,
                },
                touched: false,
                valid: false
            },
            nationality: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 1, displayValue: 'Austria'},
                        {value: 2, displayValue: 'Germany'}
                    ]
                },
                value: '1',
                validation: {},
                touched: false,
                valid: false
            },
            tin: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'TIN',
                },
                value: '',
                validation: {},
                touched: false,
                valid: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true,
                },
                touched: false,
                valid: false
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP',
                },
                value: '',
                validation: {
                    required: true,
                },
                touched: false,
                valid: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City',
                },
                value: '',
                validation: {
                    required: true,
                },
                touched: false,
                valid: false
            },
            country: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 1, displayValue: 'Austria'},
                        {value: 2, displayValue: 'Germany'}
                    ]
                },
                value: '1',
                validation: {},
                touched: false,
                valid: false
            },
        }
    };

    inputChangedHandler = (event, inputIdentifier) => {

        const updatedRegisterForm = {
            ...this.state.registerForm
        };
        const updatedFormElement = {
            ...updatedRegisterForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedRegisterForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifiers in updatedRegisterForm) {
            formIsValid = updatedRegisterForm[inputIdentifiers].valid && formIsValid;
        } 
        this.setState({registerForm: updatedRegisterForm, formIsValid: formIsValid});
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
        for (let formElementIdentifier in this.state.registerForm) {
            formData[formElementIdentifier] = this.state.registerForm[formElementIdentifier].value;
        }
        axios.post("joeee-booking/v1/user", formData, {withCredentials: true})
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
                this.setState({formIsValid: false});
                console.log(error);
            });
    }

        


    render() {
        const formElementsArray = [];
        for (let key in this.state.registerForm) {
            formElementsArray.push({
                id: key,
                config: this.state.registerForm[key]
            });
        }
        return (
            <Auxiliary>
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
                    <Button type="submit" btnType="Success" disabled={!this.state.formIsValid}>REGISTER</Button>
                </form>
            </Auxiliary>           
        );
    }
}


export default Register;
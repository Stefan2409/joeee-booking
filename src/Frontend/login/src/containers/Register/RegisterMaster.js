import React, {Component} from 'react';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Button from '../../components/UI/Button/Button';
import axios from 'axios';


class RegisterMaster extends Component {
      // Set the initial input values
      state = {
        currentStep: 1, // Default is Step 1
        formIsValid: false,
        registerForm: {
            step1: {
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
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
                    value: 1,
                    validation: {},
                    touched: false,
                    valid: true
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
                    value: 1,
                    validation: {},
                    touched: false,
                    valid: true
                },
            },
            step2: {
                tin: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'TIN',
                    },
                    value: '',
                    validation: {},
                    touched: false,
                    valid: true
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
                    value: 1,
                    validation: {},
                    touched: false,
                    valid: true
                },
            },  
        }
      }

      checkValidity = (value, rules) => {
        // Trick that all checks must be true to get a valid result. && isValid
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        return isValid;
    }

    _prev = () => {
        let currentStep = this.state.currentStep
        // If the current step is 2 or 3, then subtract one on "previous" button click
        currentStep = currentStep <= 1? 1: currentStep - 1
        this.setState({
          currentStep: currentStep
        });
      }

    _next = () => {
        let currentStep = this.state.currentStep
        // If the current step is 1 or 2, then add one on "next" button click
        currentStep = currentStep >= 2? 3: currentStep + 1
        this.setState({
          currentStep: currentStep
        });
      }

      // The "next" and "previous" button functions
    previousButton = () => {
    let currentStep = this.state.currentStep;
    // If the current step is not 1, then render the "previous" button
    if(currentStep !==1){
      return (
        <button 
          className="btn btn-secondary" 
          type="button" onClick={this._prev}>
        Previous
        </button>
      )
    }
    // ...else return nothing
    return null;
  }
  
    nextButton = () => {
    let currentStep = this.state.currentStep;
    // If the current step is not 3, then render the "next" button
    if(currentStep <2){
      return (
        <button 
          className="btn btn-primary float-right" 
          type="button" onClick={this._next}>
        Next
        </button>        
      )
    }
    else {
        return (
            <Button type="submit" btnType="Success" disabled={!this.state.formIsValid}>Submit</Button>
        );
    }
    
  }
    checkFormValidity = () => {
        let form1IsValid = true;
        for (let inputIdentifiers in this.state.registerForm.step1) {
            form1IsValid = this.state.registerForm.step1[inputIdentifiers].valid && form1IsValid;
        }
        let form2IsValid = true;
        for (let inputIdentifiers in this.state.registerForm.step2) {
            form2IsValid = this.state.registerForm.step2[inputIdentifiers].valid && form2IsValid;
        }
        return form1IsValid && form2IsValid; 
    }

    inputChangedHandler = (event, inputIdentifier, step) => {

        const updatedRegisterForm = {
            ...this.state.registerForm
        };
        const updatedStepRegisterForm = {
            ...updatedRegisterForm[step]
        };
        const updatedFormElement = {
            ...updatedStepRegisterForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedRegisterForm[step][inputIdentifier] = updatedFormElement;

        
        this.setState({registerForm: updatedRegisterForm});
        let formIsValid = this.checkFormValidity();
        this.setState({formIsValid: formIsValid});
    }
    
    // Trigger an alert on form submission
    handleSubmit = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.registerForm.step1) {
            formData[formElementIdentifier] = this.state.registerForm.step1[formElementIdentifier].value;
        }
        formData.birthday = this.state.registerForm.step1.birthday.value + ' 12:00:00';
        const formData2 = {...formData};
        for (let formElementIdentifier in this.state.registerForm.step2) {
            formData2[formElementIdentifier] = this.state.registerForm.step2[formElementIdentifier].value;
        }

        console.log(formData2);
        axios.post("joeee-booking/v1/user", formData2, {withCredentials: true})
            .then(response => {

                console.log(response);
            })
            .catch(error => {
                this.setState({formIsValid: false});
                console.log(error);
            });

    }

    render() {
        return (
            <React.Fragment>
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit}>
                    <Step1
                        currentStep={this.state.currentStep}
                        handleChange={this.inputChangedHandler}
                        data={this.state.registerForm.step1}
                    />
                    <Step2
                        currentStep={this.state.currentStep}
                        handleChange={this.inputChangedHandler}
                        data={this.state.registerForm.step2}
                    />
                    {this.previousButton()}
                    {this.nextButton()}
                </form>
            </React.Fragment>
        );
    }
  }

export default RegisterMaster;
import React, { Component } from 'react';
import Input from '../../../components/UI/Input/Input';

class Step1 extends Component {
    constructor(props) {
        super(props);
        this.state = {registerForm: this.props.data};

    }
    
    render () {
        if(this.props.currentStep !== 1) {
            return null;
        }
        const formElementsArray = [];
        for (let key in this.state.registerForm) {
            formElementsArray.push({
                id: key,
                config: this.state.registerForm[key]
            });
        }
        console.log(formElementsArray);

        return (
            <div className="form-group">
                {formElementsArray.map(formElement => (
                        <Input
                            key={formElement.id} 
                            elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event) => this.props.handleChange(event, formElement.id, 'step1')}
                            touched={formElement.config.touched}
                            shouldValidate={formElement.config.validation}
                            invalid={!formElement.config.valid}
                            label={formElement.id.replace('_', ' ').toUpperCase()}
                        />
                    ))}
            </div>
        )
    }
}

export default Step1;
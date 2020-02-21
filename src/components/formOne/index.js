import React,{ Component } from 'react';
import FormField from '../utils/formFields';
import { validate } from '../utils/validate';

class FormOne extends Component {

    state = {
				maxAge: 65,
				loading: false,
				formData: {
					firstName: {
						element: 'input',
						value: '',
						config: {
							name: 'firstName',
							type: 'text',
							placeholder: 'Enter your first name',
						},
						validation: {
							required: true,
						},
						valid: false,
						touched: false,
						validationMessage: '',
					},
					lastName: {
						element: 'input',
						value: '',
						config: {
							name: 'lastName',
							type: 'text',
							placeholder: 'Enter your last name',
						},
						validation: {
							required: true,
						},
						valid: false,
						touched: false,
						validationMessage: '',
					},
					age: {
						element: 'select',
						value: '',
						config: {
							name: 'age',
						},
						validation: {
							required: true,
							minNum: 20,
						},
						valid: false,
						touched: false,
						validationMessage: '',
					},
					message: {
						element: 'textarea',
						value: '',
						config: {
							name: 'message',
							rows: 3,
							placeholder: 'Enter your message here...'
						},
						validation: {
							required: true,
						},
						valid: false,
						touched: false,
						validationMessage: '',
					}
				}
    }

		generateOptions = () => {
			const ageArray = [];
			for(let i = 1; i <= this.state.maxAge; i++) {
				ageArray.push(i);
			}
			return ageArray.map((value,i) => (
				<option key={i} value={value}>{value}</option>
			))
		}

		updateForm = (element) => {
			const newFormData = {
				...this.state.formData
			}
			const newElement = {
				...newFormData[element.id]
			}
			newElement.value = element.event.target.value;
			// validations
			let validateData = validate(newElement);
			newElement.valid = validateData[0];
			newElement.validationMessage = validateData[1];
			// catch blur
			if(element.blur) {
				newElement.touched = element.blur
			}
			newFormData[element.id] = newElement;

			this.setState({
				formData: newFormData
			})
		}

		onSuccess = () => {
			let formDataCopy = {
				...this.state.formData
			}

			for(let key in this.state.formData) {
				formDataCopy[key].value = '';
				formDataCopy[key].valid = false;
				formDataCopy[key].touched = false;
			}

			this.setState({
				formData: formDataCopy
			})
			alert('We will likely never reach out to you. Thanks!');
		}

		submitForm = (event) => {
			event.preventDefault();
			let dataToSubmit = {};
			let formIsValid = true;

			for(let key in this.state.formData) {
				formIsValid = this.state.formData[key].valid && formIsValid
			}

			if(formIsValid) {
				this.setState({
					loading: true
				})
				for(let key in this.state.formData) {
					dataToSubmit[key] = this.state.formData[key].value;
				}
				setTimeout(()=> {
					this.setState({
						loading: false,
					})
					this.onSuccess();
				},2000)
			} else {
				alert('Form is not valid, BITCH!')
			}
		}

    render(){
        return(
            <>
                <form>
                    <div className="form-group">
                        <label>First Name</label>
												<FormField 
													formData={this.state.formData.firstName}
													change={(element) => this.updateForm(element)}
													id="firstName"
												/>
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <FormField 
													formData={this.state.formData.lastName}
													change={(element) => this.updateForm(element)}
													id="lastName"
												/>
                    </div>
                    <div className="form-group">
                        <label>Age</label>
                        <FormField
													formData={this.state.formData.age}
													change={(element) => this.updateForm(element)}
													id="age"
												>
												{this.generateOptions()}
												</FormField>
                    </div>
                    
                    <div className="form-group">
                        <label>Enter your message here</label>
                        <FormField 
													formData={this.state.formData.message}
													change={(element) => this.updateForm(element)}
													id="message"
												/>
                    </div>
                    
                    <button 
                        type="submit"
                        className="btn btn-primary"
                        onClick={(event)=>this.submitForm(event)}
                        disabled={this.state.loading}
                    >
                        Submit
                    </button>

                </form>
            </>
        )
    }
}

export default FormOne;
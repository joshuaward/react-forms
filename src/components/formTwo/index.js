import React,{ Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

class FormTwo extends Component {

    state = {
				maxAge:80,
				submitting: false,
		}
		
		myFormSchema = Yup.object().shape({
			firstName: Yup.string().required('First name is required.'),
			lastName: Yup.string().required('Last name is required.'),
			age: Yup.number().min(20, 'Minimum age is 20.').required('Age is required'),
			message: Yup.string().required('Message is required.'),
		})

		generateOptions = () => {
			const ageArray = [];
			for(let i = 1; i <= this.state.maxAge; i++) {
				ageArray.push(i);
			}
			return ageArray.map((value,i) => (
				<option key={i} value={value}>{value}</option>
			))
		}

    render(){
        return(
            <>
							<Formik
								initialValues={{
									firstName: '',
									lastName: '',
									age: '',
									message: ''
								}}
								validationSchema={this.myFormSchema}
								// validate={values => {
								// 	let errors = {}
								// 	if(!values.firstName) {
								// 		errors.firstName = 'First name is required.'
								// 	}
								// 	if(!values.lastName) {
								// 		errors.lastName = 'Last name is required.'
								// 	}
								// 	if(values.age) {
								// 		if(values.age < 20) {
								// 			errors.age = 'The minimum age is 20.'
								// 		}
								// 	} else {
								// 		errors.age = 'Age is required.'
								// 	}
								// 	if(!values.message) {
								// 		errors.message = 'Message is required.'
								// 	}
								// 	return errors;
								// }}
								onSubmit={(values,{resetForm}) => {
									this.setState({
										submitting: true
									})
									setTimeout(() => {
										console.log(values)
										resetForm();
										this.setState({
											submitting: false
										})
									},2000)
								}}
							>
								{ ({
										values,
										errors,
										touched,
										handleChange,
										handleBlur,
										handleSubmit,
										isSubmitting
									}) => (
									<form onSubmit={handleSubmit}>
										<div className="form-group">
											<label>Name</label>
											<input 
												type="text"
												className="form-control"
												name="firstName"
												value={values.firstName}
												onChange={handleChange}
												onBlur={handleBlur}
												style={{
													border: `${errors.firstName && touched.firstName ? '1px solid #e74c3c' : ''}`,
												}}
											/>
											{ errors.firstName && touched.firstName ?
												<div style={{color: '#e74c3c'}}>
													{errors.firstName}
												</div>
											: null }
										</div>
										<div className="form-group">
											<label>Last Name</label>
											<input 
												type="text"
												className="form-control"
												name="lastName"
												value={values.lastName}
												onChange={handleChange}
												onBlur={handleBlur}
												style={{
													border: `${errors.lastName && touched.lastName ? '1px solid #e74c3c' : ''}`,
												}}
											/>
											{ errors.lastName && touched.lastName ?
												<div style={{color: '#e74c3c'}}>
													{errors.lastName}
												</div>
											: null }
										</div>
										<div className="form-group">
											<label>Age</label>
											<select
												name="age"
												className="form-control" 
												value={values.age}
												onChange={handleChange}
												onBlur={handleBlur}
												style={{
													border: `${errors.age && touched.age ? '1px solid #e74c3c' : ''}`,
												}}
											>
												<option value="">Select Age</option>
												{this.generateOptions()}
											</select>
											{ errors.age && touched.age ?
												<div style={{color: '#e74c3c'}}>
													{errors.age}
												</div>
											: null }
										</div>
										
										<div className="form-group">
											<label>Enter your message here</label>
											<textarea 
												rows="3"
												placeholder="Add your message here..."
												className="form-control"
												name="message"
												value={values.message}
												onChange={handleChange}
												onBlur={handleBlur}
												style={{
													border: `${errors.message && touched.message ? '1px solid #e74c3c' : ''}`,
												}}
											></textarea>
											{ errors.message && touched.message ?
												<div style={{color: '#e74c3c'}}>
													{errors.message}
												</div>
											: null }
										</div>
										
										<button 
											type="submit"
											className="btn btn-primary"
											disabled={this.state.submitting}
										>
											Submit
										</button>
									</form>
								)}
							</Formik>
							
            </>
        )
    }
}

export default FormTwo;
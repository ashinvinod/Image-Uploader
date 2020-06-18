import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {Form, Button, Col, InputGroup, Container} from 'react-bootstrap';
import history from "./history"


const ValidatedSignupForm = () => (
  <Formik
    initialValues={{ name:"", userID: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        console.log("Logging in", values);
        setSubmitting(false);
      }, 500);
    }}

    validationSchema={Yup.object().shape({
			name: Yup.string()
				.required("Please enter your name"),
      userID: Yup.string()
        .required("Please provide a userID"),
      password: Yup.string()
        .required("Please provide a password")
        .min(8, "Password too short - must atleast have 8 characters")
        .matches(/(?=.*[0-9])/, "Password must contain a number.")
    })}
    >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;
      return (
				<div>
					<br/>
					<br/>
					<div class="titlemain"> AWS Image Uploader </div>
					<br />
					<div class="desc1"> Host images on the cloud and get shareable links!</div>
					<br />
					<br />
					<br />
					<div class="desc2"> Create a new account</div>
					<br />

	        <Form onSubmit={handleSubmit}>

							<Form.Row className="justify-content-md-center">
								<Form.Group  as={Col} md="3" xs="11" controlId="validationCustomUsername">
								<InputGroup>
									<InputGroup.Prepend>
										<InputGroup.Text id="inputGroupPrepend">a</InputGroup.Text>
									</InputGroup.Prepend>
									<Form.Control
											name="name"
											type="text"
											placeholder="Enter your name"
											value={values.name}
											onChange={handleChange}
											onBlur={handleBlur}
											isInvalid={errors.name && touched.name}
											isValid={!errors.name && touched.name}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.name}
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Form.Row>

						<Form.Row className="justify-content-md-center">
							<Form.Group  as={Col} md="3" xs="11" controlId="validationCustomUserID">
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
								</InputGroup.Prepend>
								<Form.Control
										name="userID"
										type="text"
										placeholder="Enter a unique userID"
										value={values.userID}
										onChange={handleChange}
										onBlur={handleBlur}
										isInvalid={errors.userID && touched.userID}
										isValid={!errors.userID && touched.userID}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.userID}
								</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
					</Form.Row>

					<Form.Row className="justify-content-md-center">
						<Form.Group  as={Col} md="3" xs="11" controlId="validationCustomPassword">
						<InputGroup>
							<InputGroup.Prepend>
								<InputGroup.Text id="inputGroupPrepend">#</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
									name="password"
									type="password"
									placeholder="Enter a strong password"
									value={values.password}
									onChange={handleChange}
									onBlur={handleBlur}
									isInvalid={errors.password && touched.password}
									isValid={!errors.password && touched.password}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.password}
							</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
				</Form.Row>

				<Form.Row className="justify-content-md-center">
					<Button type="submit" disabled={!(props.isValid && props.dirty)} onClick={() => history.push('/login')}>Sign Up</Button>
				</Form.Row>
        <br />
        <Form.Row className="justify-content-md-center">
          <pre class="hlink"> <a onClick={() => history.push('/login')}> Already signed-up? Click here to login. </a></pre>
        </Form.Row>

      </Form>
		  </div>
      );
    }}
  </Formik>
);


export default ValidatedSignupForm;

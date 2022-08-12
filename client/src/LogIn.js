import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Col, InputGroup, Alert } from "react-bootstrap";
import axios from "axios";
import history from "./history";
import userProfile from "./UserProfile";

function ValidatedLoginForm() {
  const [IfPresent, setIfPresent] = useState(true);
  const [show, setShow] = useState(null);
  function NotFoundAlert() {
    if (!IfPresent && show) {
      setTimeout(() => {
        setShow(false);
      }, 5000);
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>404: Not found!</Alert.Heading>
          <p>
            The userID and password combination you have entered does not match
            with an account in our database. Please try again.
          </p>
        </Alert>
      );
    }
  }
  return (
    <div>
      <Formik
        initialValues={{ userID: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
          }, 1000);
          axios
            .post("login", values)
            .then((response) => {
              console.log("Values sent " + response.status);
              if (response.status === 200) {
                console.log("LOGGED IN");
                userProfile.setName(response.data.name);
                userProfile.setUserID(response.data.userID);
              }
              console.log("REACHED");
              history.push("/dashboard");
            })
            .catch((err) => {
              if (err.status === 404) {
                setIfPresent(false);
                setShow(true);
              }
              console.error(err);
            });
        }}
        validationSchema={Yup.object().shape({
          userID: Yup.string().required("Invalid userID"),
          password: Yup.string().required("Invalid password"),
        })}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div>
            <br />
            <br />
            <div className="titlemain"> AWS Image Uploader </div>
            <br />
            <div className="desc1">
              {" "}
              Host images on the cloud and get shareable links!
            </div>
            <br />
            <br />
            <br />
            <div className="desc2"> Login using your credentials </div>
            <br />

            <Form onSubmit={handleSubmit}>
              <Form.Row className="justify-content-md-center">
                <Form.Group
                  as={Col}
                  md="3"
                  xs="11"
                  controlId="validationCustomUsername"
                >
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroupPrepend">
                        @
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      name="userID"
                      type="text"
                      placeholder="Enter your userID"
                      value={values.userID}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={errors.userID && touched.userID}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.userID}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Form.Row>

              <Form.Row className="justify-content-md-center">
                <Form.Group
                  as={Col}
                  md="3"
                  xs="11"
                  controlId="validationCustomPassword"
                >
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroupPrepend">
                        #
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={errors.password && touched.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Form.Row>

              <Form.Row className="justify-content-md-center">
                <Button type="submit">Login</Button>
              </Form.Row>
              <br />
              <Form.Row className="justify-content-md-center">
                <pre className="hlink">
                  {" "}
                  <a onClick={() => history.push("/")}>
                    {" "}
                    Want to create a new account instead? Click here to sign-up.{" "}
                  </a>
                </pre>
              </Form.Row>
              <Form.Row className="justify-content-md-center">
                {NotFoundAlert()}
              </Form.Row>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default ValidatedLoginForm;

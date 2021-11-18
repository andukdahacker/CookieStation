import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import TextError from "../components/TextError";
import * as Yup from "yup";
import "../styles/SignUp.css";
import axios from "axios";
import Navbar from "../components/navbar";

function SignUp() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    // passwordConfirmation: Yup.string()
    //   .oneOf([Yup.ref("password"), null], "Passwords must match")
    //   .required("Required"),
  });

  const registerAPI = "http://localhost:5000/auth/register";
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState();
  const history = useHistory();

  const onSubmit = (values) => {
    setIsLoading(true);
    axios
      .post(
        registerAPI,
        {
          username: values.username,
          email: values.email,
          password: values.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        localStorage.setItem("authToken", res.data.token);
        setIsLoading(false);
        history.push("/");
      })
      .catch((error) => {
        setIsLoading(false);
        setValidationErrors(error.response.data);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  return (
    <>
      <Navbar />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <div className="mainsignup">
          <Form>
            <label htmlFor="username">
              Username{" "}
              {validationErrors ? (
                <div>{validationErrors.Errors.username}</div>
              ) : (
                <div></div>
              )}
            </label>
            <Field
              type="text"
              placeholder="Username"
              id="username"
              name="username"
            />
            <label htmlFor="email">
              Email{" "}
              {validationErrors ? (
                <div>{validationErrors.Errors.email}</div>
              ) : (
                <div></div>
              )}
            </label>
            <Field
              type="text"
              placeholder="your email"
              id="email"
              name="email"
            />
            <ErrorMessage name="email" component={TextError} />
            <label htmlFor="password">
              Password{" "}
              {validationErrors ? (
                <div>{validationErrors.Errors.password}</div>
              ) : (
                <div></div>
              )}
            </label>
            <Field
              type="text"
              placeholder="your password"
              id="password"
              name="password"
            />
            <ErrorMessage name="password" component={TextError} />
            {/* <label htmlFor="passwordConfirmation">Confirm your password</label>
            <Field
              type="text"
              placeholder="Re-enter your password"
              id="passwordConfirmation"
              name="passwordConfirmation"
            />
            <ErrorMessage name="passwordConfirmation" component={TextError} /> */}
            <button type="submit">
              {isLoading ? <div>Loading</div> : <div>Sign up</div>}
            </button>
          </Form>
          <button>Sign up with Facebook</button>
          <button>Sign up in Google</button>
        </div>
      </Formik>
    </>
  );
}

export default SignUp;

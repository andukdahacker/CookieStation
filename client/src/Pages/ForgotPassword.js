import React, { useState } from "react";
import "../styles/ForgotPassword.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "../components/TextError";
import * as Yup from "yup";
import axios from "axios";
import Navbar from "../components/navbar";

function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const forgotPasswordAPI = `http://localhost:5000/auth/forgotpassword`;
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
  });

  const onSubmit = (values) => {
    setIsLoading(true);
    axios
      .post(
        forgotPasswordAPI,
        { email: values.email },
        { withCredentials: true }
      )
      .then((response) => {
        setIsLoading(false);
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
        setIsLoading(false);
        setError(true);
      });
  };
  return (
    <>
      <Navbar />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <div className="mainforgotpassword">
          <Form>
            <label htmlFor="email">Email</label>
            <Field
              type="text"
              placeholder="your email"
              id="email"
              name="email"
            />
            <ErrorMessage name="email" component={TextError} />
            <button type="submit">
              {isLoading ? (
                <div>Loading</div>
              ) : error ? (
                <div>Error</div>
              ) : (
                <div>Submit</div>
              )}
            </button>
          </Form>
        </div>
      </Formik>
    </>
  );
}

export default ForgotPassword;

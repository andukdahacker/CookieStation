import React, { useState } from "react";
import "../styles/ResetPassword.css";
import Navbar from "../components/navbar";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "../components/TextError";

function ResetPassword() {
  const { resetToken } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState();
  const resetPasswordAPI = `http://localhost:5000/auth/resetpassword/${resetToken}`;
  const initialValues = {
    password: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  });

  const onSubmit = (values) => {
    setIsLoading(true);
    axios
      .put(resetPasswordAPI, { password: values.password })
      .then((res) => {
        setIsLoading(false);
        setStatus(res.data.message);
      })
      .catch((err) => {
        setIsLoading(false);
        setStatus(err.response.message);
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
        <div className="one-col-sec">
          <h1>Enter your new password </h1>
          <Form className="form">
            <label htmlFor="password"></label>
            <Field
              type="text"
              placeholder="New Password"
              id="password"
              name="password"
            />
            <ErrorMessage name="password" component={TextError} />
            <button className="main-btn" type="submit">
              {isLoading ? <div>Loading</div> : <div>Submit</div>}
            </button>
            <p>{status}</p>
          </Form>
        </div>
      </Formik>
    </>
  );
}

export default ResetPassword;

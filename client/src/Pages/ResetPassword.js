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
        console.log(res.data.message);
      })
      .catch((err) => {
        setIsLoading(false);
        setStatus(err.response.message);
        console.log(err.response.message);
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
        <div className="mainresetpassword">
          <Form>
            <label htmlFor="password">Password</label>
            <Field
              type="text"
              placeholder="new password"
              id="password"
              name="password"
            />
            <ErrorMessage name="password" component={TextError} />
            <button type="submit">
              {isLoading ? <div>Loading</div> : <div>Submit</div>}
            </button>
          </Form>
        </div>
      </Formik>
    </>
  );
}

export default ResetPassword;

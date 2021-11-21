import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "../components/TextError";
import * as Yup from "yup";
import "../styles/Login.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";
function Login() {
  const initialValues = {
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
  });
  const loginAPI = "http://localhost:5000/auth/login";
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState();
  const history = useHistory();
  const onSubmit = (values) => {
    setIsLoading(true);
    axios
      .post(
        loginAPI,
        { email: values.email, password: values.password },
        { withCredentials: true }
      )
      .then((res) => {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("username", res.data.user);
        setIsLoading(false);
        history.go(-1);
      })
      .catch((err) => {
        setIsLoading(false);
        setValidationErrors(err.response.data);
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
        <div className="mainlogin">
          <Form>
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

            <button type="submit">
              {isLoading ? <div>Loading</div> : <div>Login</div>}
            </button>
          </Form>
          <a href="/">Forgot password?</a>
          <p>
            Don't have an account? <Link to="/signup">Create new account</Link>
          </p>
          <button>Login with Facebook</button>
          <button>Login in Google</button>
        </div>
      </Formik>
    </>
  );
}

export default Login;

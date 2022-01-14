import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "../components/TextError";
import * as Yup from "yup";
import "../styles/Login.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
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
        localStorage.setItem("username", res.data.user);
        setIsLoading(false);
        history.push("/");
      })
      .catch((err) => {
        setIsLoading(false);
        setValidationErrors(err.response.data);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("username")) {
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
        <div className="one-col-sec">
          <h1 className ="pageTitle">Login</h1>
          <Form className="form">
            <label htmlFor="email">
            </label>
            <Field
              type="text"
              placeholder="Email"
              id="email"
              name="email"
              className="formInput"
            />
            <p>  
              {" "}
              {validationErrors ? (
                <div>{validationErrors.Errors.email}</div>
              ) : (
                <div></div>
              )}
            </p>
            <ErrorMessage name="email" component={TextError} />
            <label htmlFor="password">
            </label>
            <Field
              type="text"
              placeholder="Password"
              id="password"
              name="password"
              className="formInput"
            />
            <ErrorMessage name="password" component={TextError} />
            <p>
              {" "}
              {validationErrors ? (
                <div>{validationErrors.Errors.password}</div>
              ) : (
                <div></div>
              )}
            </p>
            <button type="submit" className="main-btn">
              {isLoading ? <div>Loading</div> : <div>Login</div>}
            </button>
          </Form>
          <Link to="/forgotpassword">Forgot password?</Link>
          <p>
            Don't have an account? <Link to="/signup">Create new account</Link>
          </p>
          {/* <button>Login with Facebook</button>
          <button>Login in Google</button> */}
        </div>
      </Formik>
    </>
  );
}

export default Login;

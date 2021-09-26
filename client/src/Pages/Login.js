import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "../components/TextError";
import * as Yup from "yup";
import "../styles/Login.css";
import { Link } from "react-router-dom";

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

const onSubmit = (values) => console.log("Form data", values);

function Login() {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <div className="mainlogin">
          <Form>
            <label htmlFor="email">Email</label>
            <Field
              type="text"
              placeholder="your email"
              id="email"
              name="email"
            />
            <ErrorMessage name="email" component={TextError} />
            <label htmlFor="password">Password</label>
            <Field
              type="text"
              placeholder="your password"
              id="password"
              name="password"
            />
            <ErrorMessage name="password" component={TextError} />

            <button type="submit">Login</button>
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

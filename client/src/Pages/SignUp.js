import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "../components/TextError";
import * as Yup from "yup";
import "../styles/SignUp.css";

const initialValues = {
  email: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string()
    .required("Required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const onSubmit = (values) => console.log("Form data", values);

function SignUp() {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <div className="mainsignup">
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
            <label htmlFor="passwordConfirmation">Confirm your password</label>
            <Field
              type="text"
              placeholder="Re-enter your password"
              id="passwordConfirmation"
              name="passwordConfirmation"
            />
            <ErrorMessage name="passwordConfirmation" component={TextError} />
            <button type="submit">Sign Up</button>
          </Form>
          <button>Sign up with Facebook</button>
          <button>Sign up in Google</button>
        </div>
      </Formik>
    </>
  );
}

export default SignUp;

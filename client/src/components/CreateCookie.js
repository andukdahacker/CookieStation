import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import * as Yup from "yup";
import "../styles/Createcookie.css";
import { Link } from "react-router-dom";

const initialValues = {
  messageTitle: "",
  messageContent: "",
};

const onSubmit = (values) => {
  console.log("Form data", values);
};

const validationSchema = Yup.object({
  messageTitle: Yup.string().required("Required"),
  messageContent: Yup.string().required("Required"),
});

function CreateCookie() {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <div className="maincreatecookie">
          <div></div>
          <Form>
            <label htmlFor="messageTitle">Message Title</label>
            <Field type="text" id="messageTitle" name="messageTitle" />
            <ErrorMessage name="messageTitle" component={TextError} />
            <label htmlFor="selectJar">Choose a Jar</label>
            <Field as="select" id="selectJar" name="selectJar">
              <option value="jar1">Jar 1</option>
              <option value="jar2">Jar 2</option>
            </Field>
            <ErrorMessage name="selectJar" component={TextError} />
            <label htmlFor="messageContent">Write your message</label>
            <Field
              as="textarea"
              id="messageContent"
              name="messageContent"
            ></Field>
            <ErrorMessage name="messageContent" component={TextError} />
            <button type="submit">Create</button>
          </Form>
          <Link to="/shelf"> To your shelf! </Link>
        </div>
      </Formik>
    </>
  );
}

export default CreateCookie;

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import * as Yup from "yup";
import "../styles/Createcookie.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function CreateCookie() {
  const { id } = useParams();
  const URL = `http://localhost:5000/shelf/${id}`;
  const initialValues = {
    cookieTitle: "",
    cookieContent: "",
  };

  const onSubmit = (values) => {
    axios
      .post(URL, {
        cookieTitle: values.cookieTitle,
        cookieContent: values.cookieContent,
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const validationSchema = Yup.object({
    cookieTitle: Yup.string().required("Required"),
    cookieContent: Yup.string().required("Required"),
  });
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
            <label htmlFor="cookieTitle">Cookie Title</label>
            <Field type="text" id="cookieTitle" name="cookieTitle" />
            <ErrorMessage name="cookieTitle" component={TextError} />
            <label htmlFor="selectJar">Choose a Jar</label>
            <Field as="select" id="selectJar" name="selectJar">
              <option value="jar1">Jar 1</option>
              <option value="jar2">Jar 2</option>
            </Field>
            <ErrorMessage name="selectJar" component={TextError} />
            <label htmlFor="cookieContent">Write your message</label>
            <Field
              as="textarea"
              id="cookieContent"
              name="cookieContent"
            ></Field>
            <ErrorMessage name="cookieContent" component={TextError} />
            <button type="submit">Create</button>
          </Form>
        </div>
      </Formik>
    </>
  );
}

export default CreateCookie;

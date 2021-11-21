import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import * as Yup from "yup";
import "../styles/Createcookie.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function CreateCookie() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const URL = `http://localhost:5000/shelf/${id}`;
  const initialValues = {
    cookieTitle: "",
    cookieContent: "",
    cookieImage: "",
  };

  const onSubmit = (values) => {
    setIsLoading(true);
    const data = new FormData();
    data.append("cookieTitle", values.cookieTitle);
    data.append("cookieContent", values.cookieContent);
    data.append("cookieImage", values.cookieImage);
    axios
      .post(URL, data, { withCredentials: true })
      .then((res) => {
        setIsLoading(false);
        window.location.reload();
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
      <div className="maincreatecookie">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <label htmlFor="cookieTitle">Cookie Title</label>
              <Field type="text" id="cookieTitle" name="cookieTitle" />
              <ErrorMessage name="cookieTitle" component={TextError} />
              <ErrorMessage name="selectJar" component={TextError} />
              <label htmlFor="cookieContent">Write your message</label>
              <Field
                as="textarea"
                id="cookieContent"
                name="cookieContent"
              ></Field>
              <ErrorMessage name="cookieContent" component={TextError} />
              <input
                type="file"
                onChange={(event) => {
                  setFieldValue("cookieImage", event.target.files[0]);
                }}
              />
              <button type="submit">
                {isLoading ? <div>Loading</div> : <div>Create</div>}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default CreateCookie;

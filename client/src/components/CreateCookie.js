import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import * as Yup from "yup";
import "../styles/Createcookie.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import cookie from "../image/cookie.png"

function CreateCookie() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
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
        console.log(res.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(true);
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
          {({ setFieldValue }) => (
            <div className="two-col-sec">
              <div className="col-left">
            <img src={cookie} alt="cookie" className="col-img" />
          </div>
          <div className="col-right">
            <Form className="form">
              
              <h1 className="formTitle">Put in a Cookie</h1>
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
              <button className="main-btn" type="submit">
                {isLoading ? <div>Loading</div> : <div>Create</div>}
              </button>
            </Form>
            </div>
            </div>
          )}
        </Formik>      
    </>
  );
}

export default CreateCookie;

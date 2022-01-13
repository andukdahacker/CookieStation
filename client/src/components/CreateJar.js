import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "../components/TextError";
import bottlewnap from "../image/bottlewnap.png";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/Createjar.css";

function CreateJar() {
  const initialValues = { jarName: "" };
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const onSubmit = async (values) => {
    setIsLoading(true);
    await axios
      .post(
        "http://localhost:5000/shelf",
        { jarName: values.jarName },
        { withCredentials: true }
      )
      .then((res) => {
        setIsLoading(false);
        history.push(`/shelf/${res.data._id}`);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const validationSchema = Yup.object({
    jarName: Yup.string().required("Required"),
  });
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <div className="two-col-sec">
          <div className="col-left">
            <img src={bottlewnap} alt="bottlewnap" className="col-img" />
          </div>
          <Form className="col-right">
            <h1 className="formTitle">Create A Jar</h1>
            <label htmlFor="jarName"></label>
            <Field
              className="createjar-input"
              type="text"
              placeholder="Give this jar a name..."
              id="jarName"
              name="jarName"
            />
            <ErrorMessage name="jarName" component={TextError} />
              <button className="main-btn" type="submit">
              {isLoading ? <div>Loading</div> : <div>Next</div>}
            </button>
          </Form>
        </div>
      </Formik>
    </>
  );
}
export default CreateJar;

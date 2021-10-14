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

  const onSubmit = async (values) => {
    setIsLoading(true);
    await axios
      .post("http://localhost:5000/shelf", { jarName: values.jarName })
      .then((res) => {
        setIsLoading(false);
        history.push(`/shelf/${res.data._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validationSchema = Yup.object({
    jarName: Yup.string().required("Required"),
  });
  const history = useHistory();
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <div className="maincreatejar">
          <div className="createjar-left">
            <img src={bottlewnap} alt="bottlewnap" className="jar-createjar" />
          </div>
          <div className="createjar-right">
            <Form className="createjar-form">
              <label htmlFor="jarName">Name your Jar</label>
              <Field
                className="createjar-input"
                type="text"
                placeholder="name of your jar..."
                id="jarName"
                name="jarName"
              />
              <ErrorMessage name="jarName" component={TextError} />
              <button type="submit">
                {isLoading ? <div>Loading</div> : <div>Next</div>}
              </button>
            </Form>
          </div>
        </div>
      </Formik>
    </>
  );
}
export default CreateJar;

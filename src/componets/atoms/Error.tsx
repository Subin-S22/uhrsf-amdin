import React from "react";
import { ErrorMessage } from "formik";

interface Props {
  name: string;
}

const Error = ({ name }: Props) => {
  return (
    <ErrorMessage name={name}>
      {(msg) => {
        return <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>;
      }}
    </ErrorMessage>
  );
};

export default Error;

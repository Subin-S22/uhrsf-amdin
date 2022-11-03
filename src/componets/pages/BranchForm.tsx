import { Formik, Form } from "formik";
import React from "react";
import Button from "../atoms/Button";
import Field from "../atoms/Field";
import Laytout from "../molecules/Laytout";

interface Props {}

const initialValues = {
  name: "",
  phoneNumber: "",
  state: "",
  city: "",
  address: "",
  pincode: "",
};

type Initial = typeof initialValues;

const BranchForm = (props: Props) => {
  return (
    <Laytout>
      <section>
        <Formik
          initialValues={initialValues}
          onSubmit={(values: Initial) => console.log(values)}
        >
          <Form className="grid gird-cols-1 lg:grid-cols-2 mx-10 md:mx-20 gap-6 p-8 shadow-[0px_2px_8px_1px_gray] rounded-md bg-white">
            <h1 className="font-bold text-2xl mt-2 mb-4 lg:col-span-2">
              Add Branch
            </h1>
            <Field name="name" label="Name" />
            <Field name="phoneNumber" label="Phone Number" />
            <Field name="state" label="State" />
            <Field name="city" label="City" />
            <Field name="address" label="Address" />
            <Field name="pincode" label="Pin Code" />
            <div className="flex justify-center items-center w-full lg:col-span-2 flex-wrap gap-4">
              <Button variant="disable">Back</Button>
              <Button variant="approve" type="submit">
                Save
              </Button>
            </div>
          </Form>
        </Formik>
      </section>
    </Laytout>
  );
};

export default BranchForm;

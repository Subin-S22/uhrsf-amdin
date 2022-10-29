import { Formik, Form } from "formik";
import React from "react";
import Laytout from "../molecules/Laytout";
import Field from "../atoms/Field";
import Button from "../atoms/Button";
import { useLocation } from "react-router-dom";

// let initialValues = {
//   firstAndLastName: "",
//   emailId: "",
//   parentsName: "",
//   mobileNumber: "",
//   dob: "",
//   gender: "",
//   bloodGroup: "",
//   qualification: "",
//   profession: "",
//   referralId: "",
//   referralName: "",
//   address: "",
//   city: "",
//   state: "",
//   pincode: "",
//   nationality: "INDIAN",
//   aadharcard: "",
//   pancard: "",
// };

const UserForm = () => {
  const { state } = useLocation();

  return (
    <Laytout>
      <Formik initialValues={state} onSubmit={(values) => console.log(values)}>
        <Form className="grid gird-cols-1 lg:grid-cols-2 mx-10 md:mx-20 gap-6 p-8 shadow-[0px_2px_8px_1px_gray] rounded-md bg-white">
          <h1 className="text-center font-bold text-2xl mt-8 lg:col-span-2">
            User Details
          </h1>
          <Field name="firstAndLastName" label="First and last name" />
          <Field name="email" label="Email address" />
          <Field name="parentsName" label="Parent's name" />
          <Field name="mobileNumber" label="Mobile Number" />
          <Field name="dob" label="Date of Birth" />
          <Field name="gender" label="Gender" />
          <Field name="bloodGroup" label="Blood Group" />
          <Field name="qualification" label="Qualification" />
          <Field name="profession" label="Profession" />
          <Field name="address" label="Address" />
          <Field name="state" label="State" />
          <Field name="city" label="City" />
          <Field name="nationality" label="Nationality" />
          <Field name="pincode" label="Pincode" />
          <Field name="aadharcard" label="Aadharcard" />
          <Field name="pancard" label="Pancard" />
          <div className="flex justify-center items-center w-full lg:col-span-2 flex-wrap gap-4">
            <div className="flex gap-2 flex-col flex-wrap w-full">
              <Button variant="approve">Approve</Button>
              <Button variant="reject">Reject</Button>
            </div>
            <div className="flex gap-2 flex-col flex-wrap w-full">
              <Button variant="executive">Executive</Button>
              <Button variant="disable">Disable</Button>
            </div>
          </div>
        </Form>
      </Formik>
    </Laytout>
  );
};

export default UserForm;

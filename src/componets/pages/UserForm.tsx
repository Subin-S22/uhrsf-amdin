import { Formik, Form } from "formik";
import React, { useContext } from "react";
import Laytout from "../molecules/Laytout";
import Field from "../atoms/Field";
import Button from "../atoms/Button";
import { Context } from "../../context";
import { Store } from "../../context/Provider";

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
const Qualification = [
  "Illiterate",
  "Primary Education",
  "Secondary Education or high school",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate or higher",
];
const UserForm = () => {
  const store = useContext(Context);
  const {
    data: { userDetails },
  } = store as Store;
  return (
    <Laytout>
      <Formik
        initialValues={userDetails}
        onSubmit={(values) => console.log(values)}
      >
        <Form className="grid gird-cols-1 lg:grid-cols-2 mx-10 md:mx-20 gap-6 p-8 shadow-[0px_2px_8px_1px_gray] rounded-md bg-white">
          <h1 className="font-bold text-2xl mt-2 mb-4 lg:col-span-2">
            User Informations
          </h1>
          <Field name="firstAndLastName" label="First and last name" />
          <Field name="emailId" label="Email address" />
          <Field name="parentsName" label="Parent's name" />
          <Field name="mobileNumber" label="Mobile Number" />
          <Field name="dob" label="Date of Birth" />
          <Field name="gender" label="Gender" />
          <Field name="bloodGroup" label="Blood Group" />
          <Field
            name="qualification"
            label="Qualification"
            options={Qualification}
          />
          <Field name="profession" label="Profession" />
          <Field name="address" label="Address" />
          <Field name="state" label="State" />
          <Field name="city" label="City" />
          <Field name="nationality" label="Nationality" />
          <Field name="pincode" label="Pincode" />
          <Field name="aadharcard" label="Aadharcard" />
          <Field name="pancard" label="Pancard" />
          <div>
            <label>Aadharcard Photo</label>
            <img src={""} alt="aadharcard" />
          </div>
          <div>
            <label>Pancard Photo</label>
            <img src={""} alt="aadharcard" />
          </div>
          <div>
            <label>Profile Photo</label>
            <img src={""} alt="aadharcard" />
          </div>
          <div className="flex justify-center items-center w-full lg:col-span-2 flex-wrap gap-4">
            <Button variant="disable">Back</Button>
            <Button variant="edit">Edit</Button>
            <Button variant="approve">Approve</Button>
            <Button variant="reject">Reject</Button>
            <Button variant="executive">Executive</Button>
            <Button variant="disable">Disable</Button>
          </div>
        </Form>
      </Formik>
    </Laytout>
  );
};

export default UserForm;

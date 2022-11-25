import { Formik, Form, FormikProps } from "formik";
import React, { useContext, useEffect, useState } from "react";
import Laytout from "../molecules/Laytout";
import Field from "../atoms/Field";
import Button from "../atoms/Button";
import { Context } from "../../context";
import { Store } from "../../context/Provider";
import {
  getMemberDetailsById,
  memberRegister,
  referralName,
  updateStatus,
} from "../../services/admin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

const Genders = ["Male", "Female", "Others"];

const BloodGroup = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const disableCategory = ["Application Approved", "Members", "Executives"];

const editCategory = [
  "Application Received",
  "Application Approved",
  "Application Rejected",
  "Members",
  "Disabled Members",
  "Executives",
];

const approveCategory = ["Application Received", "Application Rejected"];

const rejectedCategory = ["Application Received"];

const executiveCategory = ["Application Approved", "Members"];

const enableCategory = ["Disabled Members"];

const addUserCategory = ["AddUser"];

const UserForm = () => {
  const store = useContext(Context);
  const [isEdit, setIsEdit] = useState(false);
  const {
    data: { userDetails },
  } = store as Store;

  const navigate = useNavigate();

  const title = store?.data.title;

  const enableEdit = () => {
    setIsEdit(true);
  };

  const approvalStatus = async (values, status) => {
    try {
      const updated = await updateStatus({
        uhrsfMemberId: values.uhrsfMemberId,
        approvalStatus: status,
      });
      toast.success(updated.data.message);
      navigate(-1);
    } catch (err: unknown) {
      if (typeof err === "string") {
        toast.error(err);
      } else if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  const getMemberDetails = async (memberId: string) => {
    try {
      const res = await getMemberDetailsById(memberId);
      store?.action.setUserDetails(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (title === "AddUser") setIsEdit(true);
  }, [title]);

  useEffect(() => {
    if (store?.data.userDetails?.uhrsfMemberId) {
      getMemberDetails(store?.data.userDetails.uhrsfMemberId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store?.data.userDetails]);

  const handleReferral = async (
    e: React.ChangeEvent<HTMLInputElement>,
    props: FormikProps<any>
  ) => {
    try {
      props.handleChange(e);
      if (e.target.value.length > 9) {
        const res = await referralName(e.target.value);
        console.log(res);
        props.setFieldValue("referredByName", res.data.data.referredName);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addMembers = async (values) => {
    try {
      const formData = new FormData();

      formData.set("memberRegister", JSON.stringify(values));
      formData.append("aadharCard", JSON.stringify(values.aadharCardLink));
      formData.append("pancard", JSON.stringify(values.panCardLink));
      formData.append("memberPhoto", JSON.stringify(values.memberPhotoLink));

      await memberRegister(formData);
      toast.success("member added successfully");
    } catch (err: unknown) {
      if (typeof err === "string") {
        toast.error(err);
      } else if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  console.log(title);

  return (
    <Laytout>
      <Formik
        initialValues={userDetails}
        onSubmit={(values) => console.log(values)}
      >
        {(props: FormikProps<any>) => (
          <Form className="grid gird-cols-1 lg:grid-cols-2 mx-10 md:mx-20 gap-6 p-8 shadow-[0px_2px_8px_1px_gray] rounded-md bg-white">
            <h1 className="font-bold text-2xl mt-2 mb-4 lg:col-span-2">
              User Informations
            </h1>
            <Field
              name="firstAndLastName"
              label="First and last name"
              disabled={!isEdit}
            />
            <Field name="emailId" label="Email address" disabled={!isEdit} />
            <Field
              name="parentsName"
              label="Parent's name"
              disabled={!isEdit}
            />
            <Field
              name="mobileNumber"
              label="Mobile Number"
              disabled={!isEdit}
            />
            <Field
              name="dob"
              label="Date of Birth"
              disabled={!isEdit}
              type="date"
              value={props.values?.dob?.split("T")[0]}
            />
            <Field
              name="gender"
              label="Gender"
              options={Genders}
              disabled={!isEdit}
            />
            <Field
              name="bloodGroup"
              label="Blood Group"
              disabled={!isEdit}
              options={BloodGroup}
            />
            <Field
              name="qualification"
              label="Qualification"
              options={Qualification}
              disabled={!isEdit}
            />
            <Field name="profession" label="Profession" disabled={!isEdit} />
            <Field name="address" label="Address" disabled={!isEdit} />
            <Field name="state" label="State" disabled={!isEdit} />
            <Field name="city" label="City" disabled={!isEdit} />
            <Field name="nationality" label="Nationality" disabled={!isEdit} />
            <Field name="pincode" label="Pincode" disabled={!isEdit} />
            <Field name="aadharcard" label="Aadharcard" disabled={!isEdit} />
            <Field name="pancard" label="Pancard" disabled={!isEdit} />
            <Field
              name="referredBy"
              label="Referral Id"
              disabled={!isEdit}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleReferral(e, props)
              }
            />
            <Field
              name="referredByName"
              label="Referral Name"
              disabled={true}
            />

            <div>
              <label>Aadharcard Photo</label>
              <input
                type="file"
                name="aadharCardLink"
                className="border border-gray-400 p-2 rounded-md w-full"
                onChange={(e) => {
                  props.setFieldValue("aadharcardPhoto", e.target.files?.[0]);
                }}
              />
              {"1" + props.values.aadharCardLink + "1"}
              {props.values.aadharCardLink && (
                <img
                  src={URL.createObjectURL(props.values.aadharCardLink)}
                  alt="aadharcard"
                />
              )}
            </div>
            <div>
              <label>Pancard Photo</label>
              <input
                type="file"
                name="panCardLink"
                className="border border-gray-400 p-2 rounded-md w-full"
                onChange={(e) => {
                  props.setFieldValue("panCardLink", e.target.files?.[0]);
                }}
              />
              {props.values.panCardLink && (
                <img
                  src={URL.createObjectURL(props.values.panCardLink)}
                  alt="pancardphoto"
                />
              )}
            </div>
            <div>
              <label>Profile Photo</label>
              <input
                type="file"
                name="memberPhotoLink"
                className="border border-gray-400 p-2 rounded-md w-full"
                onChange={(e) => {
                  props.setFieldValue("memberPhotoLink", e.target.files?.[0]);
                }}
              />
              {props.values.memberPhotoLink && (
                <img
                  src={URL.createObjectURL(props.values.memberPhotoLink)}
                  alt="profilephoto"
                />
              )}
            </div>
            <div className="flex justify-center items-center w-full lg:col-span-2 flex-wrap gap-4">
              <Button variant="disable" onClick={() => navigate(-1)}>
                Back
              </Button>
              <Button
                variant="edit"
                onClick={enableEdit}
                isVisible={editCategory.includes(title as string)}
              >
                Edit
              </Button>
              <Button
                variant="approve"
                onClick={() => approvalStatus(props.values, "APPROVED")}
                type="submit"
                isVisible={approveCategory.includes(title as string)}
              >
                Approve
              </Button>
              <Button
                type="submit"
                variant="disable"
                isVisible={disableCategory.includes(title as string)}
                onClick={() => approvalStatus(props.values, "DISABLE")}
              >
                Disable
              </Button>
              <Button
                type="submit"
                variant="reject"
                isVisible={rejectedCategory.includes(title as string)}
                onClick={() => approvalStatus(props.values, "REJECTED")}
              >
                Reject
              </Button>
              <Button
                type="submit"
                onClick={() => approvalStatus(props.values, "EXECUTIVE")}
                variant="executive"
                isVisible={executiveCategory.includes(title as string)}
              >
                Executive
              </Button>
              <Button
                variant="enable"
                isVisible={enableCategory.includes(title as string)}
              >
                Enable
              </Button>
              <Button
                variant="save"
                isVisible={addUserCategory.includes(title as string)}
                onClick={() => addMembers(props.values)}
              >
                Save
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Laytout>
  );
};

export default UserForm;

import { Formik, Form, FormikProps } from "formik";
import React, { useContext, useEffect, useState } from "react";
import Laytout from "../molecules/Laytout";
import Field from "../atoms/Field";
import Button from "../atoms/Button";
import { Context } from "../../context";
import {
  getMemberDetailsById,
  memberRegister,
  referralName,
  updateMember,
  updateStatus,
} from "../../services/admin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  "Applications",
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
  const [userObject, setUserObject] = useState<any>({});
  const [photos, setPhotos] = useState({
    aadharPhoto: "",
    pancardPhoto: "",
    memberPhoto: "",
  });

  const navigate = useNavigate();

  const title = store?.data.title;

  const enableEdit = () => {
    setIsEdit(true);
  };
  console.log(title);

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
      const loading = toast.loading("loading the user data...");
      const res = await getMemberDetailsById(memberId);
      toast.update(loading, {
        render: "Loaded",
        type: "success",
        isLoading: false,
      });

      setUserObject(res.data.data);
      setPhotos({
        aadharPhoto: res.data.data.aadharCardLink,
        pancardPhoto: res.data.data.panCardLink,
        memberPhoto: res.data.data.memberPhotoLink,
      });

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
  }, []);

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

      formData.append("aadharCard", values.aadharCardLink);
      formData.append("pancard", values.panCardLink);
      formData.append("memberPhoto", values.memberPhotoLink);
      delete values.aadharCardLink;
      delete values.panCardLink;
      delete values.memberPhotoLink;
      formData.append("memberRegister", JSON.stringify(values));
      await memberRegister(formData);
      navigate("/");
      toast.success("member added successfully");
    } catch (err: unknown) {
      if (typeof err === "string") {
        toast.error(err);
      } else if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };
  const updateMembers = async (values) => {
    try {
      const formData = new FormData();

      formData.append("aadharCard", values.aadharCardLink);
      formData.append("pancard", values.panCardLink);
      formData.append("memberPhoto", values.memberPhotoLink);
      formData.append("memberRegister", JSON.stringify(values));

      await updateMember(formData);
      navigate("/");
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
        initialValues={userObject}
        onSubmit={(values) => console.log(values)}
        enableReinitialize
      >
        {(props: FormikProps<any>) => (
          <Form className="flex flex-col lg:grid lg:grid-cols-2 mx-10 md:mx-20 gap-6 p-8 shadow-[0px_2px_8px_1px_gray] rounded-md bg-white">
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
            <div className="flex flex-col">
              <label>Aadharcard Photo</label>
              <input
                type="file"
                id="aadharcardphoto"
                name="aadharCardLink"
                className="border border-gray-400 p-2 rounded-md w-full"
                onChange={(e) => {
                  props.setFieldValue("aadharCardLink", e.target.files?.[0]);
                  setPhotos((prev) => ({
                    ...prev,
                    aadharPhoto: e.target.files?.[0] as any,
                  }));
                }}
              />
              <label
                htmlFor="aadharcardphoto"
                className="border border-gray-400 rounded-md w-full h-12 flex justify-between items-center pl-2"
              >
                <span className="truncate">
                  {props.values?.aadharCardLink?.name ||
                    props.values?.aadharCardLink}
                </span>
                <span className="bg-gray-600 border rounded-md float-right text-white px-4 py-[10px]">
                  select
                </span>
              </label>
            </div>
            {photos.aadharPhoto && (
              <img
                src={
                  photos.aadharPhoto && typeof photos.aadharPhoto === "string"
                    ? photos.aadharPhoto
                    : URL.createObjectURL(new Blob([photos.aadharPhoto]))
                }
                alt="aadharphoto"
                className="w-[200px]"
              />
            )}

            <div className="flex flex-col">
              <label>Pancard Photo</label>
              <input
                type="file"
                name="panCardLink"
                id="pancardphoto"
                className="border border-gray-400 p-2 rounded-md w-full"
                onChange={(e) => {
                  props.setFieldValue("panCardLink", e.target.files?.[0]);
                  setPhotos((prev) => ({
                    ...prev,
                    pancardPhoto: e.target.files?.[0] as any,
                  }));
                }}
              />
              <label
                htmlFor="pancardphoto"
                className="border border-gray-400 rounded-md w-full h-12 flex justify-between items-center pl-2"
              >
                <span className="truncate">
                  {props.values?.panCardLink?.name || props.values?.panCardLink}
                </span>
                <span className="bg-gray-600 border rounded-md float-right text-white px-4 py-[10px]">
                  select
                </span>
              </label>
            </div>
            {photos.pancardPhoto && (
              <img
                src={
                  photos.pancardPhoto && typeof photos.pancardPhoto === "string"
                    ? photos.pancardPhoto
                    : URL.createObjectURL(new Blob([photos.pancardPhoto]))
                }
                alt="pancardphoto"
                className="w-[200px]"
              />
            )}
            <div className="flex flex-col">
              <label>Profile Photo</label>
              <input
                type="file"
                name="memberPhotoLink"
                id="profilephoto"
                className="border border-gray-400 p-2 rounded-md w-full"
                onChange={(e) => {
                  props.setFieldValue("memberPhotoLink", e.target.files?.[0]);
                  setPhotos((prev) => ({
                    ...prev,
                    memberPhoto: e.target.files?.[0] as any,
                  }));
                }}
              />
              <label
                htmlFor="profilephoto"
                className="border border-gray-400 rounded-md w-full h-12 flex justify-between items-center pl-2"
              >
                <span className="truncate">
                  {props.values?.memberPhotoLink?.name ||
                    props.values?.memberPhotoLink}
                </span>
                <span className="bg-gray-600 border rounded-md float-right text-white px-4 py-[10px]">
                  select
                </span>
              </label>
            </div>
            {photos.memberPhoto && (
              <img
                src={
                  photos.memberPhoto && typeof photos.memberPhoto === "string"
                    ? photos.memberPhoto
                    : URL.createObjectURL(new Blob([photos.memberPhoto]))
                }
                alt="memberphoto"
                className="w-[200px]"
              />
            )}
            <div className="flex justify-center items-center w-full lg:col-span-2 flex-wrap gap-4">
              <Button variant="disable" onClick={() => navigate(-1)}>
                Back
              </Button>
              <Button
                variant="edit"
                onClick={enableEdit}
                isVisible={!isEdit && editCategory.includes(title as string)}
              >
                Edit
              </Button>
              <Button
                variant="approve"
                onClick={() => approvalStatus(props.values, "APPROVED")}
                type="submit"
                isVisible={!isEdit && approveCategory.includes(title as string)}
              >
                Approve
              </Button>
              <Button
                type="submit"
                variant="disable"
                isVisible={!isEdit && disableCategory.includes(title as string)}
                onClick={() => approvalStatus(props.values, "DISABLE")}
              >
                Disable
              </Button>
              <Button
                type="submit"
                variant="reject"
                isVisible={
                  !isEdit && rejectedCategory.includes(title as string)
                }
                onClick={() => approvalStatus(props.values, "REJECTED")}
              >
                Reject
              </Button>
              <Button
                type="submit"
                onClick={() => approvalStatus(props.values, "EXECUTIVE")}
                variant="executive"
                isVisible={
                  !isEdit && executiveCategory.includes(title as string)
                }
              >
                Executive
              </Button>
              <Button
                variant="enable"
                isVisible={!isEdit && enableCategory.includes(title as string)}
              >
                Enable
              </Button>
              <Button
                variant="save"
                isVisible={!isEdit && addUserCategory.includes(title as string)}
                onClick={() => addMembers(props.values)}
              >
                Save
              </Button>
              <Button
                variant="save"
                isVisible={isEdit && !addUserCategory.includes(title as string)}
                onClick={() => updateMembers(props.values)}
              >
                Update
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Laytout>
  );
};

export default UserForm;

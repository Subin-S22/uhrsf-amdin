import { Formik, Form, FormikProps } from "formik";
import React, { useContext, useEffect, useState } from "react";
import Laytout from "../molecules/Laytout";
import Field from "../atoms/Field";
import Button from "../atoms/Button";
import { Context } from "../../context";
import { State, City } from "country-state-city";
import {
  getMemberDetailsById,
  memberRegister,
  referralName,
  updateMember,
  updateStatus,
} from "../../services/admin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import * as Yup from "yup";
import { ICity, IState } from "country-state-city/lib/interface";

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
  "Pending Applications",
  "Application Received",
  "Application Approved",
  "Application Rejected",
  "Members",
  "Disabled Members",
  "Executives",
];

const approveCategory = [
  "Application Received",
  "Application Rejected",
  "Pending Applications",
];

const rejectedCategory = ["Application Received", "Pending Applications"];

const executiveCategory = ["Application Approved", "Members"];

const enableCategory = ["Disabled Members"];

const addUserCategory = ["AddUser"];

const memberCategory = ["Executives"];

const phoneRegExp =
  /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im;
const aadharRegex = /^\d{4}[\s-]?\d{4}[\s-]?\d{4}$/;
const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

const validation = Yup.object({
  firstAndLastName: Yup.string()
    .min(3, "too short!")
    .max(256, "too long!")
    .required("Required!"),
  emailId: Yup.string().email("Invalid Email").required("Required"),
  parentsName: Yup.string()
    .min(3, "too short!")
    .max(256, "too long!")
    .required("Required!"),
  mobileNumber: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .max(10, "Phone number should be 10 digits")
    .required("Required"),
  dob: Yup.string().required("DOB is Required"),
  gender: Yup.string().required("Required"),
  bloodGroup: Yup.string().required("Required"),
  qualification: Yup.string().required("Required"),
  profession: Yup.string().required("Required"),
  address: Yup.string()
    .min(3, "too short!")
    .max(256, "too long!")
    .required("Required!"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  pincode: Yup.string().max(6, "too long!").required("Required"),
  nationality: Yup.string(),
  aadharcard: Yup.string()
    .matches(aadharRegex, "Aadhar is not valid")
    .required("Required."),
  aadharCardLink: Yup.string().required("Required."),
  pancard: Yup.string()
    .matches(panRegex, "Pan card number is not valid")
    .required("Required."),
  panCardLink: Yup.string().required("Required."),
  memberPhotoLink: Yup.string().required("Required."),
});

type Initial = Yup.InferType<typeof validation>;

const initialValues: Initial & { referredBy: string; referredByName: string } =
  {
    firstAndLastName: "",
    emailId: "",
    parentsName: "",
    mobileNumber: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    qualification: "",
    profession: "",
    referredBy: "",
    referredByName: "",
    aadharcard: "",
    aadharCardLink: "",
    address: "",
    city: "",
    memberPhotoLink: "",
    pancard: "",
    panCardLink: "",
    pincode: "",
    state: "",
    nationality: "INDIAN",
  };

const UserForm = () => {
  const store = useContext(Context);
  const [isEdit, setIsEdit] = useState(false);
  const [btnClicked, setBtnClicked] = useState<string>("");
  const [userObject, setUserObject] = useState<Initial>(initialValues);
  const [states, setStates] = useState<IState[] | null>([]);
  const [cities, setCities] = useState<ICity[] | null>([]);
  const [photos, setPhotos] = useState({
    aadharPhoto: "",
    pancardPhoto: "",
    memberPhoto: "",
  });
  console.log(photos);

  const navigate = useNavigate();

  let title = store?.data.title;

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
    } catch (err: unknown) {
      if (typeof err === "string") {
        toast.error(err);
      } else if (err instanceof AxiosError) {
        toast.error(err.response?.data.message || err.message);
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
        autoClose: 3000,
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
    setStates(State.getStatesOfCountry("IN"));
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
        props.setFieldValue("referredByName", res.data.data.referredName);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addMembers = async (values) => {
    try {
      const formData = new FormData();

      if (values.aadharCardLink) {
        formData.append("aadharCard", values.aadharCardLink);
      } else {
        formData.append("aadharCard", new Blob([new Uint8Array([])]));
      }
      if (values.panCardLink) {
        formData.append("pancard", values.panCardLink);
      } else {
        formData.append("pancard", new Blob([new Uint8Array([])]));
      }
      if (values.memberPhotoLink) {
        formData.append("memberPhoto", values.memberPhotoLink);
      } else {
        formData.append("memberPhoto", new Blob([new Uint8Array([])]));
      }
      delete values.aadharCardLink;
      delete values.panCardLink;
      delete values.memberPhotoLink;
      formData.append("memberRegister", JSON.stringify(values));

      await memberRegister(formData);

      toast.success("member added successfully");
    } catch (err: unknown) {
      if (typeof err === "string") {
        toast.error(err);
      } else if (err instanceof AxiosError) {
        toast.error(err.response?.data.message || err.message);
      } else if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };
  const updateMembers = async (values) => {
    try {
      const formData = new FormData();

      console.log(values.aadharCardLink instanceof Object);
      console.log(typeof values.aadharCardLink);

      if (values.aadharCardLink instanceof Object) {
        formData.append("aadharCard", values.aadharCardLink);
      } else {
        formData.append("aadharCard", new Blob([new Uint8Array([])]));
      }
      if (values.panCardLink instanceof Object) {
        formData.append("pancard", values.panCardLink);
      } else {
        formData.append("pancard", new Blob([new Uint8Array([])]));
      }
      if (values.memberPhotoLink instanceof Object) {
        formData.append("memberPhoto", values.memberPhotoLink);
      } else {
        formData.append("memberPhoto", new Blob([new Uint8Array([])]));
      }

      delete values.temporaryMemberId;
      delete values.status;
      delete values.aadharCardLink;
      delete values.panCardLink;
      delete values.memberPhotoLink;

      formData.append("memberRegister", JSON.stringify(values));

      await updateMember(formData);
      setIsEdit(false);
      toast.success("member added successfully");
    } catch (err: unknown) {
      if (typeof err === "string") {
        toast.error(err);
      } else if (err instanceof AxiosError) {
        toast.error(err.response?.data.message || err.message);
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

  const onSubmit = async (values) => {
    switch (btnClicked) {
      case "save":
        await addMembers(values);
        return;
      case "update":
        await updateMembers(values);
        return;
      case "approve":
        await approvalStatus(values, "MEMBER");
        title = "Application Approved";
        return;
      case "member":
        await approvalStatus(values, "MEMBER");
        title = "Application Approved";
        return;
      case "executive":
        await approvalStatus(values, "EXECUTIVE");
        title = "Executives";
        return;
      case "enable":
        await approvalStatus(values, "ENABLE");
        title = "Application Approved";
        return;
      case "disable":
        await approvalStatus(values, "DISABLE");
        title = "Disabled Members";
        return;
      case "reject":
        await approvalStatus(values, "REJECTED");
        title = "Application Rejected";
        return;
      default:
        return;
    }
  };

  return (
    <Laytout>
      <Formik
        initialValues={userObject}
        onSubmit={onSubmit}
        enableReinitialize
        validationSchema={validation}
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
              max={new Date().toJSON().split("T")[0]}
              value={props.values?.dob?.split("T")[0]}
            />
            <Field
              name="gender"
              label="Gender"
              options={Genders}
              disabled={!isEdit}
              value={props.values.gender}
            />
            <Field
              name="bloodGroup"
              label="Blood Group"
              disabled={!isEdit}
              options={BloodGroup}
              value={props.values.bloodGroup}
            />
            <Field
              name="qualification"
              label="Qualification"
              options={Qualification}
              disabled={!isEdit}
              value={props.values.qualification}
            />
            <Field name="profession" label="Profession" disabled={!isEdit} />
            <Field name="address" label="Address" disabled={!isEdit} />
            <Field
              name="state"
              label="State"
              disabled={!isEdit}
              options={states?.map((state) => state.name)}
              onChange={(e: any) => {
                props.handleChange(e);
                const state = states?.find(
                  (state) => state.name === e.target.value
                );

                setCities(
                  City.getCitiesOfState(
                    state?.countryCode as string,
                    state?.isoCode as string
                  )
                );
              }}
            />
            <Field
              name="city"
              label="City"
              disabled={!isEdit}
              options={cities?.map((city) => city.name)}
            />
            <Field name="nationality" label="Nationality" disabled={true} />
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
                disabled={!isEdit}
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
                  {isEdit && !props.values?.aadharCardLink?.name
                    ? "Select photo..."
                    : props.values?.aadharCardLink?.name || "aadharphoto"}
                </span>
                {!isEdit ? (
                  <span
                    className="bg-gray-600 border rounded-md float-right text-white px-4 py-[10px]"
                    onClick={() => window.open(props.values?.aadharCardLink)}
                  >
                    open
                  </span>
                ) : (
                  <span className="bg-gray-600 border rounded-md float-right text-white px-4 py-[10px]">
                    select
                  </span>
                )}
              </label>
            </div>
            {/* {photos.aadharPhoto && isEdit && (
              <img
                src={
                  photos.aadharPhoto && typeof photos.aadharPhoto === "string"
                    ? photos.aadharPhoto
                    : URL.createObjectURL(new Blob([photos.aadharPhoto]))
                }
                alt="aadharphoto"
                className="w-[200px]"
              />
            )} */}

            <div className="flex flex-col">
              <label>Pancard Photo</label>
              <input
                type="file"
                disabled={!isEdit}
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
                  {isEdit && !props.values?.panCardLink?.name
                    ? "Select photo..."
                    : props.values?.panCardLink?.name || "pancard photo"}
                </span>
                {!isEdit ? (
                  <span
                    className="bg-gray-600 border rounded-md float-right text-white px-4 py-[10px]"
                    onClick={() => window.open(props.values?.panCardLink)}
                  >
                    open
                  </span>
                ) : (
                  <span className="bg-gray-600 border rounded-md float-right text-white px-4 py-[10px]">
                    select
                  </span>
                )}
              </label>
            </div>
            {/* {photos.pancardPhoto && isEdit && (
              <img
                src={
                  photos.pancardPhoto && typeof photos.pancardPhoto === "string"
                    ? photos.pancardPhoto
                    : URL.createObjectURL(new Blob([photos.pancardPhoto]))
                }
                alt="pancardphoto"
                className="w-[200px]"
              />
            )} */}
            <div className="flex flex-col">
              <label>Profile Photo</label>
              <input
                disabled={!isEdit}
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
                  {isEdit && !props.values?.memberPhotoLink?.name
                    ? "Select photo..."
                    : props.values?.memberPhotoLink?.name || "member photo"}
                </span>
                {!isEdit ? (
                  <span
                    className="bg-gray-600 border rounded-md float-right text-white px-4 py-[10px]"
                    onClick={() => window.open(props.values?.memberPhotoLink)}
                  >
                    open
                  </span>
                ) : (
                  <span className="bg-gray-600 border rounded-md float-right text-white px-4 py-[10px]">
                    select
                  </span>
                )}
              </label>
            </div>
            {/* {photos.memberPhoto && isEdit && (
              <img
                src={
                  photos.memberPhoto && typeof photos.memberPhoto === "string"
                    ? photos.memberPhoto
                    : URL.createObjectURL(new Blob([photos.memberPhoto]))
                }
                alt="memberphoto"
                className="w-[200px]"
              />
            )} */}
            <div className="flex justify-center items-center w-full lg:col-span-2 flex-wrap gap-4">
              <Button
                variant="disable"
                onClick={() => {
                  if (title === "AddUser") setIsEdit(true);
                  else setIsEdit(false);
                  if (!isEdit) {
                    navigate(-1);
                  }
                }}
              >
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
                name="approve"
                onClick={() => setBtnClicked("approve")}
                // onClick={() => approvalStatus(props.values, "MEMBER")}
                type="submit"
                isVisible={!isEdit && approveCategory.includes(title as string)}
              >
                Approve
              </Button>
              <Button
                type="submit"
                variant="disable"
                name="disable"
                isVisible={!isEdit && disableCategory.includes(title as string)}
                onClick={() => setBtnClicked("disable")}
                // onClick={() => approvalStatus(props.values, "DISABLE")}
              >
                Disable
              </Button>
              <Button
                type="submit"
                variant="disable"
                name="member"
                isVisible={!isEdit && memberCategory.includes(title as string)}
                onClick={() => setBtnClicked("member")}
                // onClick={() => approvalStatus(props.values, "MEMBER")}
              >
                Member
              </Button>
              <Button
                type="submit"
                variant="reject"
                name="reject"
                isVisible={
                  !isEdit && rejectedCategory.includes(title as string)
                }
                onClick={() => setBtnClicked("reject")}
                // onClick={() => approvalStatus(props.values, "REJECTED")}
              >
                Reject
              </Button>
              <Button
                type="submit"
                name="executive"
                onClick={() => setBtnClicked("executive")}
                // onClick={() => approvalStatus(props.values, "EXECUTIVE")}
                variant="executive"
                isVisible={
                  !isEdit && executiveCategory.includes(title as string)
                }
              >
                Executive
              </Button>
              <Button
                variant="enable"
                name="enable"
                onClick={() => setBtnClicked("enable")}
                // onClick={() => approvalStatus(props.values, "ENABLE")}
                isVisible={!isEdit && enableCategory.includes(title as string)}
              >
                Enable
              </Button>
              <Button
                variant="save"
                isVisible={isEdit && addUserCategory.includes(title as string)}
                type="submit"
                name="save"
                onClick={() => setBtnClicked("save")}
                // onClick={() => addMembers(props.values)}
              >
                Save
              </Button>
              <Button
                variant="save"
                type="submit"
                name="update"
                onClick={() => {
                  setBtnClicked("update");
                }}
                isVisible={isEdit && !addUserCategory.includes(title as string)}
                // onClick={() => updateMembers(props.values)}
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

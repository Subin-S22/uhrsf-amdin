import { AxiosError } from "axios";
import { Form, Formik } from "formik";
import { useState } from "react";
import { TbEditCircle } from "react-icons/tb";
import { toast } from "react-toastify";
import profile from "../../assets/profile.png";
import { adminUpdateDetails } from "../../services/admin";
import Button from "../atoms/Button";
import Field from "../atoms/Field";
import Laytout from "../molecules/Laytout";

const initial = {
  username: "",
  password: "",
};

type Initial = typeof initial;

const Profile = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const onSubmit = async (values: Initial) => {
    try {
      await adminUpdateDetails(values);
      toast.success("Successfully updated.");
    } catch (err) {
      if (typeof err === "string") {
        toast.error(err);
      } else if (err instanceof AxiosError) {
        toast.error(err.response?.data.message || err.message);
      } else if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  return (
    <Laytout>
      <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-32 pb-10">
        {isEdit ? (
          <Formik initialValues={initial} onSubmit={onSubmit}>
            <Form className="w-[80%] m-auto flex gap-4 flex-col p-8">
              <Field label="Username" name="username" />
              <Field label="Password" name="password" />
              <div className="flex justify-around items-center gap-4 mt-8">
                <Button variant="save" onClick={() => setIsEdit(false)}>
                  Cancel
                </Button>
                <Button variant="save" type="submit">
                  Save
                </Button>
              </div>
            </Form>
          </Formik>
        ) : (
          <div className="px-6">
            <div
              className="absolute right-0 w-8 h-8 grid place-items-center"
              onClick={() => setIsEdit(true)}
            >
              <TbEditCircle />
            </div>
            <div className="flex flex-wrap justify-center">
              <div className="w-full flex justify-center">
                <div className="relative">
                  <img
                    alt="profile"
                    src={profile}
                    className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                  />
                </div>
              </div>
              <div className="w-full text-center mt-20"></div>
            </div>
            <div className="text-center mt-4 ml-4">
              <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
                Name : Admin
              </h3>
              <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                Phone Number : 9876543210 <br /> Email : admin@admin.com
              </div>
            </div>
            {/* <div className="mt-6 py-6 border-t border-slate-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4">
                <p className="font-light leading-relaxed text-slate-600 mb-4">
                  An artist of considerable range, Mike is the name taken by
                  Melbourne-raised, Brooklyn-based Nick Murphy writes, performs
                  and records all of his own music, giving it a warm.
                </p>
              </div>

            </div>
          </div> */}
          </div>
        )}
      </div>
    </Laytout>
  );
};

export default Profile;

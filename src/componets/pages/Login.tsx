import React from "react";
import { FormControl } from "../molecules";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/admin";
import { toast } from "react-toastify";

const initialValues = {
  username: "",
  password: "",
};

type Initial = typeof initialValues;

export default function Login() {
  const navigate = useNavigate();

  const onSubmit = async (values: Initial) => {
    const toastId = toast.loading("loading...");
    try {
      const res = await login(values);
      localStorage.setItem("login", res.data.token);
      navigate("/");
      toast.update(toastId, {
        render: "Welcome!",
        isLoading: false,
        type: "success",
        autoClose: 3000,
      });
    } catch (err) {
      toast.update(toastId, {
        render: "Invalid Credentials!",
        isLoading: false,
        type: "error",
        autoClose: 3000,
      });
    }
  };
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="rounded-lg shadow-[1px_1px_4px_1px_gray] md:w-1/2 md:max-w-[500px]">
        <div className="bg-dark_blue text-white text-center h-40 flex justify-center items-center">
          <h5 className="font-bold w-[80%]">
            Universal Human Rights Service Foundation
          </h5>
        </div>
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          {({ isSubmitting }) => (
            <Form className="flex justify-center items-center flex-col p-8">
              <FormControl name="username" label="User Name" />
              <FormControl name="password" label="Password" type="password" />
              <div className="flex justify-between items-center gap-4 mb-4 w-full">
                <div className="text-sm flex items-center">
                  {/* <input type="checkbox" className="mr-2" />
                <label>Remember me</label> */}
                </div>
                <div className="text-sm text-blue-500 cursor-pointer">
                  Forgot Password?
                </div>
              </div>
              <div className="flex gap-4 flex-col w-full text-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

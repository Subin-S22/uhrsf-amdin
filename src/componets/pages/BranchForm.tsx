import { AxiosError } from "axios";
import { Formik, Form, FormikProps } from "formik";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { addBranch } from "../../services/admin";
import Button from "../atoms/Button";
import Field from "../atoms/Field";
import Laytout from "../molecules/Laytout";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context";
import { State, City } from "country-state-city";
import { ICity } from "country-state-city/lib/interface";

const BranchForm = () => {
  const store = useContext(Context);
  const branchDetails = store?.data.branchDetails;
  const [cities, setCities] = useState<ICity[] | null>([]);

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      toast.dismiss();
      const loading = toast.loading("please wait...");

      await addBranch(values);

      toast.update(loading, {
        render: "Branch added succesfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err: unknown) {
      if (typeof err === "string") {
        toast.error(err);
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else if (err instanceof AxiosError) {
        toast.error(err.response?.statusText);
      } else {
        toast.error("Failed to add the branch");
      }
    }
  };

  return (
    <Laytout>
      <section>
        <Formik initialValues={branchDetails} onSubmit={onSubmit}>
          {(props: FormikProps<any>) => (
            <Form className="grid gird-cols-1 lg:grid-cols-2 mx-10 md:mx-20 gap-6 p-8 shadow-[0px_2px_8px_1px_gray] rounded-md bg-white">
              <h1 className="font-bold text-2xl mt-2 mb-4 lg:col-span-2">
                Add Branch
              </h1>
              <Field name="contactName" label="Contact Name" />
              <Field name="phoneNumber" label="Phone Number" />
              <Field name="emailId" label="Email Id" />
              <Field
                name="state"
                label="State"
                options={State?.getStatesOfCountry("IN").map(
                  (state) => state.name
                )}
                onChange={(e) => {
                  props.handleChange(e);
                  const state = State.getStatesOfCountry("IN").find(
                    (state) => state.name === e.target.value
                  );
                  if (!state) return;
                  setCities(
                    City.getCitiesOfState(state?.countryCode, state?.isoCode)
                  );
                }}
              />
              <Field
                name="city"
                label="City"
                options={cities?.map((city) => city.name)}
              />
              <Field name="address" label="Address" />
              <Field name="zipcode" label="Zip Code" />
              <div className="flex justify-center items-center w-full lg:col-span-2 flex-wrap gap-4">
                <Button variant="disable" onClick={() => navigate(-1)}>
                  Back
                </Button>
                <Button variant="approve" type="submit">
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </Laytout>
  );
};

export default BranchForm;

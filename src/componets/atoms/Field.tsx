import React from "react";
import { Field as F, ErrorMessage as E } from "formik";

type Props = {
  name: string;
  label: string;
};

const Field = ({ name, label }: Props) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-medium text-base">
        {label}
      </label>
      <F
        name={name}
        id={name}
        className="border border-gray-400 rounded-md p-2 w-full"
      />
      <E name="email" />
    </div>
  );
};

export default Field;

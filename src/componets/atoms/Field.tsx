import React from "react";
import { Field as F, ErrorMessage as E } from "formik";

type Props = {
  name: string;
  label: string;
  options?: any[];
};

const Field = ({ name, label, options }: Props) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-medium text-base">
        {label}
      </label>
      {options?.length ? (
        <F
          as="select"
          name={name}
          id={name}
          className="border border-gray-400 rounded-md p-2 w-full"
        >
          <option hidden selected>
            Select...
          </option>
          {options.map((value) => (
            <option>{value}</option>
          ))}
        </F>
      ) : (
        <F
          name={name}
          id={name}
          className="border border-gray-400 rounded-md p-2 w-full"
        />
      )}
      <E name="email" />
    </div>
  );
};

export default Field;

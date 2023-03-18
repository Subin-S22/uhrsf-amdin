import React from "react";
import { Field as F, FieldAttributes } from "formik";
import Error from "./Error";

interface Props extends FieldAttributes<any> {
  name: string;
  label: string;
  options?: any[];
  props?: FieldAttributes<any>;
}

const Field = ({ name, label, options, ...props }: Props) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-medium lg:text-base text-sm">
        {label}
      </label>
      {options?.length ? (
        <F
          as="select"
          name={name}
          id={name}
          className="border border-gray-400 rounded-md p-2 w-full"
          {...props}
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
          {...props}
        />
      )}
      <Error name={name} />
    </div>
  );
};

export default Field;

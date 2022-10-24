import { Field } from "formik";
import { Error } from "../atoms";

interface Props {
  name: string;
  label: string;
}

function FormControl({ label, name }: Props) {
  return (
    <div className="mb-4 w-full">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="username"
      >
        {label}
      </label>
      <Field
        name={name}
        className="border p-2 border-gray-400 rounded-md w-full  focus:outline-blue-400"
      />
      <Error name={name} />
    </div>
  );
}

export default FormControl;

import { Field, FieldAttributes } from "formik";
import { Error } from "../atoms";

interface Props extends FieldAttributes<any> {
  name: string;
  label: string;
}

function FormControl({ label, name, ...props }: Props) {
  return (
    <div className="mb-4 w-full">
      <label
        className="block text-gray-700 lg:text-sm text-xs font-bold mb-2"
        htmlFor="username"
      >
        {label}
      </label>
      <Field
        name={name}
        {...props}
        className="border p-2 border-gray-400 rounded-md w-full  focus:outline-blue-400"
      />
      <Error name={name} />
    </div>
  );
}

export default FormControl;

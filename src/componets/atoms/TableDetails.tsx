import React from "react";

interface Props {
  value: string | number;
}

const TableDetails = ({ value }: Props) => {
  return <td className="p-2">{value}</td>;
};

export default TableDetails;

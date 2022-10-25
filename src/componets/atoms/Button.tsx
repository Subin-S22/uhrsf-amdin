import React from "react";

type Props = {
  variant: "disable" | "approve" | "reject" | "executive";
  children: React.ReactNode;
};

const Button = (props: Props) => {
  return <div className={`${props.variant} btn`}>{props.children}</div>;
};

export default Button;

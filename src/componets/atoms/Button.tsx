import React from "react";

type Props = {
  variant: "disable" | "approve" | "reject" | "executive" | "edit";
  children: React.ReactNode;
  isVisible?: boolean;
};

const Button = ({ variant, children, isVisible = true }: Props) => {
  return (
    <div className={`${variant} btn ${isVisible ? "" : "hidden"}`}>
      {children}
    </div>
  );
};

export default Button;

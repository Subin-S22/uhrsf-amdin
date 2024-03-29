import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?:
    | "disable"
    | "approve"
    | "reject"
    | "executive"
    | "edit"
    | "save"
    | "enable";
  children: React.ReactNode;
  isVisible?: boolean;
  type?: "submit" | "button";
}

const Button = ({
  variant,
  children,
  isVisible = true,
  className,
  type = "button",
  ...props
}: Props) => {
  return (
    <button
      className={`${variant} btn ${isVisible ? "" : "hidden"} ${className}`}
      {...props}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;

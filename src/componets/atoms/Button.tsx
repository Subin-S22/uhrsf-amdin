import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  variant: "disable" | "approve" | "reject" | "executive" | "edit";
  children: React.ReactNode;
  isVisible?: boolean;
}

const Button = ({
  variant,
  children,
  isVisible = true,
  className,
  ...props
}: Props) => {
  return (
    <div
      className={`${variant} btn ${isVisible ? "" : "hidden"} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Button;

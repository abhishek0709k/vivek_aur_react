import React from "react";

const Button = ({
  className = "",
  type = "button",
  children,
  bgColor = "",
  textColor = "",
  ...props
}) => {
  return (
    <button type={`${type}`} className={`${bgColor} ${textColor} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;

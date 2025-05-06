import React, { useId } from "react";

const Input = React.forwardRef(({ type = "text", label, ...props }, ref) => {
  const id = useId();
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input type={type} {...props} id={id} ref={ref} />
    </div>
  );
});

export default Input;

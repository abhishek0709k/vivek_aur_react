import React, { useId } from "react";

const Select = ({ options = [], className = "", label, ...props }, ref) => {
  const id = useId();
  return (
    <div>
      {label && (
        <label htmlFor={id} className={className}>
          {label}
        </label>
      )}
      <select name="" id={id} {...props} ref={ref}>
        {options?.map((option) => (
          <option key={option} name={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default React.forwardRef(Select);

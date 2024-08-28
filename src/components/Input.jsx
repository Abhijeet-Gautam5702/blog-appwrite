import React, { useId, forwardRef } from "react";
/*
    There might be cases where a component is in a separate file (like this Input component) and being used somewhere else. But the local states are defined within the component but they would be used elsewhere.
    
    In such cases, a reference of that component is passed wherever the component is being used, and it allows us to access the state of this particular isolated component.


    MOREOVER,
    React-hook-form injects its own {...register("keyName",{options})} props to control the change in the input-values. So we simply take all the props into this input component as {...props} so that react-hook-form can work.
*/
// Note: Simply write the component conventionally and wrap it inside forwardRef() and take ref as an argument in the component function
const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1 pl-1">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className={` px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Input;

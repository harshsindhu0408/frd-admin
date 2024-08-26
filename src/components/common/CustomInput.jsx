import React, { useState } from "react";

const CustomInput = ({
  label,
  placeholder = "",
  id = "",
  type = "text",
  boxClassName = "",
  inputClassName = "",
  value = "",
  onChange = function () {},
  required = false,
  min,
  max,
  minLength,
  maxLength,
}) => {
  // state for input box value
  const [valueState, setValue] = useState(value);

  // on box input change
  function handleOnChange(e) {
    setValue(e.target.value);
    onChange(e);
  }
  return (
    // =============================================================
    // ####################-Custom Input Box-#################
    // =============================================================
    <div className={`${boxClassName} relative w-full m-1`}>
      {/* label */}
      {label && (
        <label className="text-gray-700">
          {label}
          {required && <span className="text-red-500 required-dot">*</span>}
        </label>
      )}
      {/* input box */}
      <input
        required={required}
        type={type}
        id={id}
        className={`${inputClassName} rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
        placeholder={placeholder || label}
        value={valueState}
        onChange={(e) => handleOnChange(e)}
        min={min}
        minLength={minLength}
        max={max}
        maxLength={maxLength}
      />
    </div>
    // =============================================================
  );
};

export default CustomInput;

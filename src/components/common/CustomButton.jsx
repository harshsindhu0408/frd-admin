import React from "react";

const CustomButton = ({
  children,
  className = "",
  onClick = function () {},
  type = "button",
}) => {
  return (
    // =============================================================
    // ####################-Custom Button-#################
    // =============================================================
    <button
      onClick={onClick}
      type={type}
      className={`${className} w-fit m-1 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg`}
    >
      {children}
    </button>
    // =============================================================
  );
};

export default CustomButton;

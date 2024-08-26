import React from "react";

const CustomDialog = ({
  className = "",
  title = "",
  children,
  closeDailog = function () {},
}) => {
  return (
    <div
      className={`${className} min-w-96 z-10 backdrop-blur-md bg-white/30 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg`}
    >
      {/* Dialog header */}
      <div className="flex items-start justify-between w-full p-2">
        <h3 className="text-lg font-normal text-gray-500 darkk:text-gray-400">
          {title}
        </h3>
        <button
          onClick={closeDailog}
          type="button"
          className="text-gray-400 bg-transparent mt-1 rounded-lg text-sm ml-auto inline-flex items-center"
          data-modal-toggle="defaultModal"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>

      <hr className="h-2" />

      {/* Dialog body */}
      <div className="p-2">{children}</div>
    </div>
  );
};

export default CustomDialog;

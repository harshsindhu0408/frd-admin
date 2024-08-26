import React from "react";

const TagView = ({
  values = [],
  children,
  handleRemoveItem = function () {},
}) => {

  return (
    <div>
      {children}
      <div className="flex items-center mt-1.5 ms-1 gap-2">
        {values.map((tag, idx) => (
          <span
            key={idx}
            className="bg-gray-200 rounded-full py-1 ps-2 text-sm font-semibold text-gray-700"
          >
            {tag}
            <span
              onClick={() => handleRemoveItem(idx)}
              className="cursor-pointer px-1 pe-2 py-1 text-red-500"
            >
              &#x2715;
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagView;

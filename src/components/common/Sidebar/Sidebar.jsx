import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../../redux/navSlice";

// add sidebar links here
const links = [
  {
    text: "Home",
    url: "/",
    icon: "https://img.icons8.com/material-outlined/24/home--v2.png",
  },
  {
    text: "Products",
    url: "/products",
    icon: "https://img.icons8.com/material-outlined/24/shopping-cart--v1.png",
  },
  {
    text: "Orders",
    url: "/orders",
    icon: "https://img.icons8.com/pastel-glyph/64/purchase-order.png",
  },
  {
    text: "Categories",
    url: "/categories",
    icon: "https://img.icons8.com/plumpy/24/sorting-answers.png",
  },
  {
    text: "Customers",
    url: "/customers",
    icon: "https://img.icons8.com/windows/32/user.png",
  },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state) => state.nav.isMenuopen);

  // if(!isMenuOpen) return null;

  // handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const togleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    // ====================================================Sidebar====================================================
    <div className="flex overflow-y-auto flex-col bg-white w-full py-4 border-r min-h-screen relative">
      {/* header */}
      <div className="flex cursor-pointer items-center justify-center gap-x-8 h-16 border-b">
        <GiHamburgerMenu onClick={() => togleMenuHandler()} size={25} />

        <Link
          to="/"
          className="text-3xl font-semibold text-gray-800 cursor-pointer"
        >
          FRD<span className="text-indigo-500 ml-1">Admin</span>
        </Link>
      </div>

      {/* links */}
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          {links.map((link, index) => {
            const { url, text, icon } = link;
            return (
              <li key={index}>
                <Link
                  to={url}
                  className={`${
                    url === location.pathname
                      ? "border-indigo-500"
                      : "border-transparent"
                  } relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800
                    border-l-4 hover:border-indigo-500 pr-6 `}
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <img width="24" height="24" src={icon} alt="" />
                  </span>
                  <span className="ml-2 mt-1 text-sm tracking-wide truncate">
                    {text}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* logout-btn */}
      <div className="m-3 flex flex-col gap-y-1">
        <button
          onClick={() => navigate("/profile")}
          className="bg-gray-800 text-white font-bold rounded-md px-3 py-2 w-full flex items-center justify-center relative inline-flex overflow-hidden font-medium transition duration-300 ease-out border-2 border-gray-800 rounded-full shadow-md group"
        >
          <span className="relative">Profile</span>
        </button>
        <button
          onClick={handleLogout}
          className="bg-indigo-500 text-white font-bold rounded-md px-3 py-2 w-full flex items-center justify-center relative inline-flex overflow-hidden font-medium transition duration-300 ease-out border-2 border-indigo-500 rounded-full shadow-md group"
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-indigo-500 group-hover:translate-x-0 ease">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABbklEQVR4nO3Wz0sWURTG8dmWucw0S3k1tD8mXWf9BaEuxL/GVNqKFESi7nMhmKuCxFa6VRDUWviLj1w6wiy0d5iZhnfhsz73+Z5759w7T5bdq9OE55jCOnbwG3+wjxXMoq9OYD/mcam9zvEBT6pCx3ESpmdYwmuMogsP0MIElgOcdITBstBpXIVRMm0VWJOa+IyDUmB/d3oVxztTqvOS3/QkdtoMNAkLN8ebNXxlLmOQWhW9vmIbPUWK0z1NWqoCDa+t8PrRFo61KJ6oAdwT0PZw/IrCF1XB4fcY38Nz586XLTfN3W0MN5TTdseBd6NgJPs/R93bccM1WeN1+lYImoRnuIgHZCirIGwWfkCS8D46/Zg1KTzNTfds0/Cx3G+xcfhULgh8wnCBNUMRBA5LJ5AkvMJxwM8iibzBSzzCw9QQ3qaZiMG8iT4DWRWhD3M5038pNbdYOezdkkzeYRU/cRrxdg9fUlqpFXivrCZdAzO2GH9s2+1iAAAAAElFTkSuQmCC" />
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
            Logout
          </span>
          <span className="relative invisible">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

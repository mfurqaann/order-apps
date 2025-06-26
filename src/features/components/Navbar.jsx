import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full z-50 flex justify-center text-white shadow-md bg-blue-600 px-6 py-4">
      <ul className="flex gap-3">
        {/* <NavLink to={'/'} className={({isActive}) => isActive ? "text-red-500" : ""}>Home</NavLink> */}
        <NavLink
          to={"/"}
          className={({ isActive }) => {
            return isActive
              ? "border-b-2 border-white-500 pb-1"
              : "border-b-2 border-transparent pb-1";
          }}
        >
          Home
        </NavLink>
        <NavLink
          to={"/create"}
          className={({ isActive }) => {
            return isActive
              ? "border-b-2 border-white-500 pb-1"
              : "border-b-2 border-transparent pb-1";
          }}
        >
          Create Order
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;

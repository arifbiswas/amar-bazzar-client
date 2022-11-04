import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="navbar bg-base-100 container mx-auto">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Dashboard</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link to='/'>Home</Link>
            <Link to='/addProducts'>Add Products</Link>
            <Link to='/updateProducts'>Update Products</Link>
          </li>
         
        </ul>
      </div>
    </div>
  );
};

export default Header;

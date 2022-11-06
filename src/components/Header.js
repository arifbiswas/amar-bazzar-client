import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthProvider } from "../AuthContext/AuthContext";

const Header = () => {
  const {logOut , user} = useContext(AuthProvider)
  const navigate = useNavigate();

  const handleLogOut =()=>{
    logOut()
    .then(()=>{
      localStorage.removeItem('authtoken')
      navigate('/login')
    })
    .catch()
  }

  return (
    <div className="navbar bg-base-100 container mx-auto">
      <div className="flex-1">
        {
          user?.email ? <h2 href="#" className="btn btn-ghost normal-case text-rose-500 text-4xl">Dashboard</h2>:<h2 href="#" className="btn btn-ghost normal-case text-rose-500 text-4xl">Amar Bazzar</h2>
        }
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
           {
            user?.email && <button> <Link to='/'>Home</Link></button>
           }
            {
              user?.email && <button><Link to='/addProducts'>Add Products</Link></button>
            }
            {
              user?.email ? <>
              <button onClick={handleLogOut}>SignOut</button>
              </>
              :<>
              <button><Link to='/login'>Login</Link></button>
            <button><Link to='/register'>Register</Link></button>
              </>
            }
          </li>
         
        </ul>
      </div>
    </div>
  );
};

export default Header;

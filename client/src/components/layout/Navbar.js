import React, { useContext } from "react";
import SearchBar from "./Searchbar";
import { Link } from "react-router-dom";
import SidebarContext from "../../context/sidebar/SidebarContext";
import AuthContext from "../../context/auth/AuthContext";

const Navbar = props => {
  const { setSidebarOpen } = useContext(SidebarContext);
  const { isAuthenticated, logout } = useContext(AuthContext);

  const linkStyle = {
    textDecoration: "none",
  };

  const onClick = () => {
    logout();
  };

  return (
    <div className='navbar navbar-dark bg-dark'>
      <div>
        <button className='btn btn-dark' onClick={() => setSidebarOpen(true)}>
          <span className='fa fa-bars fa-lg'></span>
        </button>
        <div className='navbar-brand'>
          <Link to='/' className='link'>
            ShopEase.com
          </Link>
        </div>
      </div>
      <SearchBar />
      <div>
        {!isAuthenticated ? (
          <>
            <Link to='/login' className='link' style={linkStyle}>
              Login
            </Link>
            <Link to='/signup' className='link' style={linkStyle}>
              Signup
            </Link>
          </>
        ) : (
          <Link to='/' className='link' style={linkStyle} onClick={onClick}>
            Logout
          </Link>
        )}
        <Link to='/' className='link' style={linkStyle}>
          About
        </Link>
        <Link to='/cart' className='link'>
          <div className='fa fa-shopping-cart fa-lg'></div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

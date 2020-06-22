import React, { useContext } from "react";
import SearchBar from "./Searchbar";
import { Link } from "react-router-dom";
import SidebarContext from "../../context/sidebar/SidebarContext";

const Navbar = () => {
  const { setSidebarOpen } = useContext(SidebarContext);

  const linkStyle = {
    textDecoration: "none",
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
        <Link to='/' className='link' style={linkStyle}>
          Login
        </Link>
        <Link to='/' className='link' style={linkStyle}>
          Signup
        </Link>
        <Link to='/' className='link' style={linkStyle}>
          About
        </Link>
        <Link to='/' className='link'>
          <div className='fa fa-shopping-cart fa-lg'></div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

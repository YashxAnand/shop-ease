import React, { useContext } from "react";
import Sidebar from "react-sidebar";
import SidebarContext from "../../context/sidebar/SidebarContext";
import AuthContext from "../../context/auth/AuthContext";
import { Link } from "react-router-dom";

const Sidenav = () => {
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext);
  const { user } = useContext(AuthContext);

  const onSetSidebarOpen = open => {
    setSidebarOpen(open);
  };

  return (
    <Sidebar
      sidebar={
        <div>
          <div
            style={{
              color: "white",
              backgroundColor: "#343A40",
              fontSize: "200%",
            }}
            className='pl-2 s'
          >
            Hello {user ? user.name.split(" ")[0] : "User"}
            <span
              onClick={() => onSetSidebarOpen(false)}
              className='btn'
              style={{ color: "white", fontSize: "150%" }}
            >
              &times;
            </span>
          </div>
          <div className='p-2'>
            <Link to='/orders' className='sidenav'>
              <div className='col-12 pl-2 pt-4 pb-4'>Orders</div>
            </Link>
            <Link to='/edit-profile' className='sidenav'>
              <div className='col-12 pl-2 pt-4 pb-4'>Update Profile</div>
            </Link>
            <Link to='/search/electronics' className='sidenav'>
              <div className='col-12 pl-2 pt-4 pb-4'>Electronics</div>
            </Link>
            <Link to='/search/clothing' className='sidenav'>
              <div className='col-12 pl-2 pt-4 pb-4'>
                Clothings & Accessories
              </div>
            </Link>
            <Link to='/search/furniture' className='sidenav'>
              <div className='col-12 pl-2 pt-4 pb-4'>Furnitures</div>
            </Link>
          </div>
        </div>
      }
      open={sidebarOpen}
      onSetOpen={onSetSidebarOpen}
      styles={{
        sidebar: {
          background: "white",
          color: "white",
          position: "fixed",
        },
      }}
    ></Sidebar>
  );
};

export default Sidenav;

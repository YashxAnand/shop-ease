import React, { useContext } from "react";
import Sidebar from "react-sidebar";
import SidebarContext from "../../context/sidebar/SidebarContext";

const Sidenav = () => {
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext);

  const onSetSidebarOpen = open => {
    setSidebarOpen(open);
  };

  return (
    <Sidebar
      sidebar={
        <div className='container'>
          <div style={{ color: "white", fontSize: "200%" }}>
            Hello User
            <span
              onClick={() => onSetSidebarOpen(false)}
              className='btn'
              style={{ color: "white", fontSize: "150%" }}
            >
              &times;
            </span>
          </div>
          <b>Side Content</b>
          <br />
          <b>Side Content</b>
          <br />
          <b>Side Content</b>
          <br />
          <b>Side Content</b>
          <br />
          <b>Side Content</b>
          <br />
        </div>
      }
      open={sidebarOpen}
      onSetOpen={onSetSidebarOpen}
      styles={{
        sidebar: {
          background: "#343A40",
          color: "white",
          position: "fixed",
        },
      }}
    ></Sidebar>
  );
};

export default Sidenav;

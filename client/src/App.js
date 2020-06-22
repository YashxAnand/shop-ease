import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Sidenav from "./components/layout/Sidenav";
import Home from "./components/pages/Home";
import SidebarContext from "./context/sidebar/SidebarContext";

function App() {
  const { sidebarOpen } = useContext(SidebarContext);

  return (
    <Router>
      <div className='App'>
        <Navbar />
        {sidebarOpen ? <Sidenav /> : <div></div>}

        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

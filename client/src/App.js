import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Sidenav from "./components/layout/Sidenav";
import Home from "./components/pages/Home";
import SidebarContext from "./context/sidebar/SidebarContext";
import AuthContext from "./context/auth/AuthContext";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Product from "./components/pages/Product";
import Cart from "./components/pages/Cart";
import PrivateRoute from "./utils/PrivateRoute";
import SearchResult from "./components/pages/SearchResult";
import Checkout from "./components/pages/Checkout";
import Orders from "./components/pages/Orders";
import EditProfile from "./components/pages/EditProfile";

function App() {
  const { sidebarOpen } = useContext(SidebarContext);
  const { loadUser, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
  }, [isAuthenticated]);

  return (
    <Router>
      <div className='App'>
        <Navbar />
        {sidebarOpen ? <Sidenav /> : <div></div>}
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/products/:id' component={Product} />
          <PrivateRoute exact path='/cart' component={Cart} />
          <PrivateRoute exact path='/checkout' component={Checkout} />
          <PrivateRoute exact path='/orders' component={Orders} />
          <PrivateRoute exact path='/edit-profile' component={EditProfile} />
          <Route exact path='/search/:query' component={SearchResult} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

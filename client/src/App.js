import React from "react";
import Footer from "./components/footer";
import "./App.css";
import Home from "./Pages/Home";
import Shelf from "./Pages/Shelf";
import Login from "./Pages/Login";
import Contact from "./Pages/Contact";
import SignUp from "./Pages/SignUp";
import Jar from "./Pages/Jar";
import Cookie from "./Pages/Cookie";
import LogOut from "./Pages/LogOut";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <React.StrictMode>
      <div className="app">
        <Router>
          {/* <Navbar /> */}
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/shelf" component={Shelf} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/shelf/:id" component={Jar} />
            <Route exact path="/cookies/:id" component={Cookie} />
            <Route exact path="/logout" component={LogOut} />
            <Route
              exact
              path="/resetpassword/:resetToken"
              component={ResetPassword}
            />
          </Switch>
        </Router>
        {/* <Footer /> */}
      </div>
    </React.StrictMode>
  );
}

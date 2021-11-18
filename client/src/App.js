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
import ReadList from "./Pages/ReadList";
import LogOut from "./Pages/LogOut";
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
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/shelf/:id" component={Jar} />
            <Route exact path="/cookies/:id" component={Cookie} />
            <PrivateRoute exact path="/readcookies/:id" component={ReadList} />
            <Route exact path="/logout" component={LogOut} />
          </Switch>
        </Router>
        <Footer />
      </div>
    </React.StrictMode>
  );
}

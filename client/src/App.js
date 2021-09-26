import React from "react";
import Footer from "./components/footer";
import "./App.css";
import Navbar from "./components/navbar";
import Home from "./Pages/Home";
import Shelf from "./Pages/Shelf";
import Login from "./Pages/Login";
import Contact from "./Pages/Contact";
import SignUp from "./Pages/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <React.StrictMode>
      <div className="app">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/shelf" component={Shelf} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/contact" component={Contact} />
          </Switch>
        </Router>
        <Footer />
      </div>
    </React.StrictMode>
  );
}

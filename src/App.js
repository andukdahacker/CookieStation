import React from "react";
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";
import "./App.css";
import Home from "./components/Pages/Home";
import Shelf from "./components/Pages/Shelf";
import Login from "./components/Pages/Login";
import Contact from "./components/Pages/Contact";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <div className="app">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/shelf" component={Shelf} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/contact" component={Contact}></Route>
          </Switch>
        </Router>
        <Footer />
      </div>
    </>
  );
}

import React, { Component, Suspense } from 'react'; //imrc
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router";

import Home from './components/home';
import About from './components/about';
import CounterPage from './components/counter';
import Navbar from './components/navbar';
import LoginPage from './components/auth/login';

import './App.css';


class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="container">
          <Suspense fallback={<div>Загрузка...</div>}>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/counter">
                <CounterPage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
            </Switch>
          </Suspense>
        </div>
      </>

    );
  }
}




export default App;

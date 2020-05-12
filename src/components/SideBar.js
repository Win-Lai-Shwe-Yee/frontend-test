import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import App from "../App";
import WatchMovieList from "./WatchMovieList";
import "./SideBar.css";
class SideBar extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="sidenav">
            <Navigation style={{ position: "fix" }} />
          </div>
          <div className="main">
            <Switch>
              <Route path="/" component={App} exact />
              <Route path="/frontend-test/" component={App} exact />
              <Route path="/watchmovielist" component={WatchMovieList} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default SideBar;

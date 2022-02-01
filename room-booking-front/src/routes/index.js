import React, { Component } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { Error404 } from "./pages/error";
import NewBooking from "./pages/booking/NewBooking";
import {Page} from './pages/default';
import DeleteBooking from './pages/booking/deleteBooking';
const MainRoute = (props) => {
  const { match } = props;

  return (
    <Switch>
      <Route path={`/newBooking`} component={NewBooking} />
      <Route path={`/deleteBooking`} component={DeleteBooking} />
      <Route path={`/error`} component={Error404} />
      <Route path={`${match.url}`} component={Page} />
      <Redirect to="/" />
    </Switch>
  );
};

export default withRouter(MainRoute);

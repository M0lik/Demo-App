import React from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { Error404 } from "./pages/Error404";
import NewBooking from "./pages/booking/NewBooking";
import DisplayBooking from './pages/booking/DisplayBooking';
import DeleteBooking from './pages/booking/DeleteBooking';

const MainRoute = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Route path={`/newBooking`} component={NewBooking} />
      <Route path={`/deleteBooking`} component={DeleteBooking} />
      <Route path={`/error`} component={Error404} />
      <Route path={`${match.url}`} component={DisplayBooking} />
      <Redirect to="/" />
    </Switch>
  );
};

export default withRouter(MainRoute);

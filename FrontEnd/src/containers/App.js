import React, { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import MainRoute from "../routes/index";
import { Login } from "../routes/pages/login";
import { userSelector } from "../redux/auth/userSlice";
import { useSelector } from "react-redux";
import { Error404 } from "../routes/pages/error";

const InitialPath = ({ ...rest }) => {
  const user = useSelector(userSelector);

  return (
    <Route
      {...rest}
      render={(props) =>
        user.isAuthenticated == false? (
          <MainRoute {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

function App(props) {
  const { match } = props;
  console.log("app : ", match);
  return (
    <Fragment>
      <Fragment>
        <Switch>
          <InitialPath path={`${match.url}app`} />
          <Route path={`/login`} component={Login} />
        </Switch>
      </Fragment>
    </Fragment>
  );
}

export default App;

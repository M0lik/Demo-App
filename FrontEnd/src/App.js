import React from "react";

import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Login } from "./routes/pages/login";
import ReactDOM from "react-dom";
import configureGlobalStore from "./redux/store";
import App from "./containers/App";
import { userSelector } from "./redux/auth/userSlice";
import { useSelector } from "react-redux";
import MainRoute from "./routes";

const store = configureGlobalStore();
let persistor = persistStore(store);

const InitialPath = () => {
  const user = useSelector(userSelector);

  return (
    <Route
      render={(props) => {
        console.log(props);
        return user.isAuthenticated ? (
          <MainRoute {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

const MainApp = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Switch>
          <Route path={`/login`} component={Login} />
          <InitialPath path={`/`} />
        </Switch>
      </Router>
    </PersistGate>
  </Provider>
);
export default ReactDOM.render(<MainApp />, document.getElementById("root"));

import { Grid } from "@chakra-ui/react";
import { AuthContext, useAuth } from "@echoppe/common";
import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import { ColorModeSwitcher } from "./components/shared/color/ColorModeSwitcher";
import SignIn from "./components/user/SignIn";

export const App: React.FC = () => {
  const auth = useAuth();

  return (
    <Router>
      <Grid align="center" justify="center" minH="100vh" p=".5vmax">
        <ColorModeSwitcher justifySelf="flex-end" />
        <AuthContext.Provider value={auth}>
          <Switch>
            <Route path="/sign-in">
              <SignIn />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </AuthContext.Provider>
      </Grid>
    </Router>
  );
};

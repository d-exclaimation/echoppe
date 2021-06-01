import { Box, Flex, Grid, Link, Spacer, Text } from "@chakra-ui/react";
import { AuthContext, useAuth } from "@echoppe/common";
import * as React from "react";
import {
  BrowserRouter as ReactRouter,
  Link as RouteLink,
  Route,
  Switch as RouteSwitch,
} from "react-router-dom";
import CartRoom from "./components/cart/CartRoom";
import Home from "./components/home/Home";
import { ColorModeSwitcher } from "./components/shared/color/ColorModeSwitcher";
import SignIn from "./components/user/SignIn";

export const App: React.FC = () => {
  const auth = useAuth();

  return (
    <ReactRouter>
      <Grid id="zeroth-layer" minH="calc(100vh - 1vmax)" p=".5vmax">
        <Box id="first-layer">
          <Flex id="top-navbar" flexDirection="row" mb="3vmin">
            <Box id="home-link" mx="2vmin" mt="1vmin">
              <Link as={RouteLink} to="/">
                <Text fontSize="sm">Home</Text>
              </Link>
            </Box>
            <Box id="user-session-identifier" ml="1vmin" mt="1vmin">
              <Text fontSize="sm" color="gray.500" fontWeight="light">
                {auth.user?.username ?? "Not logged in"}
              </Text>
            </Box>
            <Spacer />
            <ColorModeSwitcher id="color-mode" justifySelf="flex-end" />
          </Flex>
          <AuthContext.Provider value={auth}>
            <RouteSwitch>
              <Route exact path="/cart">
                <CartRoom />
              </Route>
              <Route exact path="/sign-in">
                <SignIn />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="*">
                <Flex alignItems="center" justifyContent="center">
                  <pre>Welp 404</pre>
                </Flex>
              </Route>
            </RouteSwitch>
          </AuthContext.Provider>
        </Box>
      </Grid>
    </ReactRouter>
  );
};

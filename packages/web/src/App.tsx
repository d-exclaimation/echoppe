import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AuthContext, useAuth, useSignOutMutation } from "@echoppe/common";
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
import SignUp from "./components/user/SignUp";

export const App: React.FC = () => {
  const auth = useAuth();
  const toast = useToast();
  const signOut = useSignOutMutation({
    onError: () =>
      toast({
        title: "Failure to log out",
        description: "Try again later",
        status: "warning",
        duration: 5000,
        isClosable: true,
      }),
    onSuccess: () =>
      toast({
        title: "Success",
        description: "You have been log out",
        status: "success",
        duration: 5000,
        isClosable: true,
      }),
  });

  // I "tagged" the Grid, First box, everything in navbar for portal purposes
  // i.e. custom buttons on navbar
  return (
    <ReactRouter>
      <Grid id="zeroth-layer" minH="calc(100vh - 1vmax)" p=".5vmax">
        <Box id="first-layer">
          <Flex
            id="top-navbar"
            flexDirection="row"
            alignItems="center"
            mb="5vmin"
          >
            <Box id="home-link" mx="2vmin">
              <Link as={RouteLink} to="/">
                <Text fontSize="sm">Home</Text>
              </Link>
            </Box>
            <Text fontSize="sm" color="gray.500" fontWeight="light" ml="1vmin">
              {auth.user?.username ?? "Not logged in"}
            </Text>
            {auth.isLoggedIn && (
              <Button
                variant="link"
                size="sm"
                colorScheme="red"
                fontWeight="light"
                ml="2vmin"
                onClick={() => signOut()}
              >
                Log out
              </Button>
            )}
            <Spacer />
            <ColorModeSwitcher id="color-mode" justifySelf="flex-end" />
          </Flex>
          <AuthContext.Provider value={auth}>
            <RouteSwitch>
              <Route exact path="/cart">
                <CartRoom />
              </Route>
              <Route exact path="/sign-up">
                <SignUp />
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

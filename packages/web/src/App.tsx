import {
  Box,
  ChakraProvider,
  Code,
  Grid,
  theme,
  VStack,
} from "@chakra-ui/react";
import { useAuth } from "@echoppe/common";
import * as React from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";

export const App: React.FC = () => {
  const { user, isLoading } = useAuth();
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            {isLoading || (
              <Code fontSize="xl" wordBreak={"break-all"}>
                {JSON.stringify(user, null, 2)}
              </Code>
            )}
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import { App } from "./App";

const queryClient = new QueryClient();

setLogger({
  error: () => {
    //console.clear();
  },
  log: console.log,
  warn: console.log,
});

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

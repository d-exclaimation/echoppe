import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import { render, RenderOptions } from "@testing-library/react";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

/** Setup all the providers for test purposes */
const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={new QueryClient()}>
        {children}
      </QueryClientProvider>
    </ChakraProvider>
  </>
);

/** Custom render function for jest + react test */
const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };

import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import { render, RenderOptions } from "@testing-library/react";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

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

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };

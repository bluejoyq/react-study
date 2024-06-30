import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "./ModalProvider";

const queryClient = new QueryClient();
export function GlobalProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>{children}</ModalProvider>
    </QueryClientProvider>
  );
}

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import { Toaster } from "@/components/ui/sonner";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
};

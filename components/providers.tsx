"use client"

import { Toast } from "@base-ui-components/react";
import { ThemeProvider } from "next-themes";
import GlobalToast from "./ui/globalToast";
import { toastManager } from "@/lib/toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toast.Provider toastManager={toastManager} timeout={2000}>
        {children}
        <GlobalToast />
      </Toast.Provider>
    </ThemeProvider>
  );
}

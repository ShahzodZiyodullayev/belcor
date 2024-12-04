import React from "react";
import ThemeRoutes from "@/app/routes/Root.tsx";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <React.Fragment>
      <SnackbarProvider maxSnack={3}>
        <ThemeRoutes />
      </SnackbarProvider>
    </React.Fragment>
  );
}

export default App;

import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { I18NProvider } from "./components/I18NProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import { routes } from "./routes";
import { TooltipProvider } from "./components/ui/tooltip";
import { AuthProvider } from "./components/AuthProvider";

const router = createBrowserRouter(routes);

function App() {
  return (
    <I18NProvider>
      <AuthProvider>
        <TooltipProvider>
          <HelmetProvider>
            <ThemeProvider>
              <RouterProvider router={router} />
            </ThemeProvider>
          </HelmetProvider>
        </TooltipProvider>
      </AuthProvider>
    </I18NProvider>
  );
}

export default App;

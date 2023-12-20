import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { I18NProvider } from "./components/I18NProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import { routes } from "./routes";

const router = createBrowserRouter(routes);

function App() {
  return (
    <I18NProvider>
      <HelmetProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </HelmetProvider>
    </I18NProvider>
  );
}

export default App;

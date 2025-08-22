import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Projects from "./pages/Projects.tsx";
import Tasks from "./pages/Tasks.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "projects",
          element: <Projects />,
        },
        {
          path: "tasks",
          element: <Tasks />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.VITE_BASE_PATH,
  }
);

// Credit: Foundation of Below code to get boot in dev mode is based on raven
// https://github.com/The-Commit-Company/raven/blob/develop/frontend/src/main.tsx
// Raven is AGPL-3.0
if (import.meta.env.DEV) {
  fetch("/api/method/the_manager.www.the_manager.get_context_for_dev", {
    method: "POST",
  })
    .then((response) => response.json())
    .then((values) => {
      const v = JSON.parse(values.message);
      //@ts-expect-error Adding frappe to window
      if (!window.frappe) window.frappe = {};
      //@ts-expect-error Adding frappe to window
      window.frappe.boot = v;
      //registerServiceWorker()
    });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

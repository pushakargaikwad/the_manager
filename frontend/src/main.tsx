import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "projects",
          element: <div>Projects</div>,
        },
        {
          path: "tasks",
          element: <div>Tasks</div>,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.VITE_BASE_PATH,
  }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

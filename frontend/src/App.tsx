import "./App.css";
import { FrappeProvider } from "frappe-react-sdk";

import Login from "./pages/Login";
import { Outlet } from "react-router";
function App() {
  return (
    <div className="App">
      <FrappeProvider
        socketPort={import.meta.env.VITE_SOCKET_PORT}
        siteName={import.meta.env.VITE_SITE_NAME}
      >
        <Outlet />
      </FrappeProvider>
    </div>
  );
}

export default App;

import "./App.css";
import { FrappeProvider } from "frappe-react-sdk";

import Login from "./pages/Login";
function App() {
  return (
    <div className="App">
      <FrappeProvider
        socketPort={import.meta.env.VITE_SOCKET_PORT}
        siteName={import.meta.env.VITE_SITE_NAME}
      >
        <Login />
      </FrappeProvider>
    </div>
  );
}

export default App;

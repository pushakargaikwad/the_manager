import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  FrappeProvider,
  useFrappeAuth,
  useFrappeGetDocList,
} from "frappe-react-sdk";
import { Button } from "@/components/ui/button";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <FrappeProvider
        socketPort={import.meta.env.VITE_SOCKET_PORT}
        siteName={import.meta.env.VITE_SITE_NAME}
      >
        <div>
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src="/vite.svg" className="logo" alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React + Pushakar!</h1>
          <TestComponent />
          <div className="card">
            <Button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </Button>
            <p>
              Edit <code>src/App.jsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </FrappeProvider>
    </div>
  );
}

const TestComponent = () => {
  const { data } = useFrappeGetDocList("User");
  const { currentUser } = useFrappeAuth();
  return <Button>Current User is {currentUser}</Button>;
};
export default App;

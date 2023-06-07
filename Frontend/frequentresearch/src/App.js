import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllRoutes from "./Allroutes/Allroutes";

function App() {
  return (
    <div className="App">
      <AllRoutes />
      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Login from "./auth/Login";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Dashboard/>}></Route> */}
        <Route path="/" element={<Login/>}></Route>
      </Routes>
    </>
  );
}

export default App;

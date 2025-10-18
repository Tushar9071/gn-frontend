import { Route, Routes } from "react-router-dom";
// import Dashboard from "./dashboard/Dashboard";
import Login from "./auth/Login";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { checkUserHaveLogedIn } from "./features/auth/authSlice";
import ForgotPassword from "./auth/ForgotPassword";

function App() {
  const distch = useAppDispatch();

  distch(checkUserHaveLogedIn());
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Dashboard/>}></Route> */}
        <Route path="/" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      </Routes>
    </>
  );
}

export default App;

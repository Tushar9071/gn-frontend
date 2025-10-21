import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Login from "./auth/Login";
import ForgotPassword from "./auth/ForgotPassword";
import { useAppSelector } from "./hooks/useAppSelector";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { checkUserHaveLogedIn } from "./features/auth/authSlice";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkUserHaveLogedIn());
  }, [dispatch]);
  const { username, role, token } = useAppSelector((state) => state.auth);

  const checkIsLoggedIn = () => {
    if (username !== "" && role !== "" && token !== "") {
      return true;
    }
    return false;
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={checkIsLoggedIn() ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/forgot-password"
        element={checkIsLoggedIn() ? <Navigate to="/" /> : <ForgotPassword />}
      />
      <Route
        path="/"
        element={checkIsLoggedIn() ? <Dashboard /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;

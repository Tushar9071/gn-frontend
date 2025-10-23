import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard/MainDashboard";
import Login from "./auth/Login";
import ForgotPassword from "./auth/ForgotPassword";
import { useAppSelector } from "./hooks/useAppSelector";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { checkUserHaveLogedIn } from "./features/auth/authSlice";
import roleFeatures from "./utils/rolefeatures";
import DefaultPage from "./dashboard/components/DefaultPage";
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkUserHaveLogedIn());
  }, [dispatch]);
  const { username, role, token } = useAppSelector((state) => state.auth);

  let pages;
  if (username && role && token) {
    pages = roleFeatures({ key: role || "" });
  }
  const checkIsLoggedIn = () => {
    if (username !== "" && role !== "" && token !== "") {
      return true;
    }
    return false;
  };

  return (
    <Routes>
      {!checkIsLoggedIn() && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to={"/login"} />} />
        </>
      )}
      {checkIsLoggedIn() && (
        <>
          <Route path="/" element={<Dashboard />}>
            {pages?.map((page, index) => (
              <Route
                path={page.feature.replace(/\s+/g, "-")}
                key={index}
                element={page.element}
              />
            ))}
            <Route index element={<DefaultPage/>}/>
          </Route>
          <Route path="*" element={<Navigate to={"/"}/>}/>
        </>
      )}
    </Routes>
  );
}

export default App;

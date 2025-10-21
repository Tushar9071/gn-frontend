import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { login } from "../features/auth/authSlice";
// import { useAppSelector } from "../hooks/useAppSelector";
import { Link, useNavigate } from "react-router-dom";
import { useFetchApi } from "../hooks/useFetchApi";
import { useAppSelector } from "../hooks/useAppSelector";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const dispatch = useAppDispatch();
  const { username, role, token } = useAppSelector((state) => state.auth);
  const { callApi, pending, response } = useFetchApi();
  const [showPassword, setShowPassword] = useState(false);
  console.log(pending);
  const [loginrole, setLoginrole] = useState("student");
  const [toastId, setToastId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.username === "" || formData.password === "") {
      toast.error("Please enter your credentials!");
      return;
    }
    const id = toast.loading("Logging in...");
    await callApi(
      `/api/${loginrole === "student" ? "CLAuth" : "CLFaculty"}/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
      { email: formData.username, password: formData.password }
    );
    setToastId(id);
  };

  useEffect(() => {
    if (!response) return;
    if (toastId) toast.dismiss(toastId);

    if (!response.isError && response.data?.token) {
      toast.success("Login successful!");
      // const time = setTimeout(() => {
      //   navigate("/");

      // }, 1000);
      dispatch(
        login({
          username: formData.username,
          token: response.data.token,
          role: loginrole,
        })
      );
      // return clearTimeout(time);
    } else if (response.isError) {
      toast.error(response.message || "Login failed!");
    }
  }, [response]);
  useEffect(() => {
    if (username && role && token) {
      console.log("Already logged in");
      navigate("/", { replace: true });
    }
  }, [username, role, token, navigate]);

  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            duration: 1000,
            iconTheme: { primary: "green", secondary: "white" },
          },
          error: {
            duration: 1000,
            iconTheme: { primary: "red", secondary: "white" },
          },
        }}
        reverseOrder={true}
      />
      <div className="bg-white w-11/12 flex justify-center p-2 rounded-2xl flex-col gap py-16 shadow-2xl sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-[25%]">
        <h2 className="text-4xl font-semibold text-gray-900 text-center pb-5">
          Login
        </h2>
        <div className="flex flex-row justify-between items-center">
          <div
            className={`w-1/2 text-center p-4 transition-all cursor-pointer rounded-lg ${
              loginrole === "student" ? "font-bold text-white bg-blue-500" : ""
            }`}
            onClick={() => setLoginrole("student")}
          >
            Student
          </div>
          <div
            className={`w-1/2 text-center p-4 transition-all cursor-pointer rounded-lg ${
              loginrole === "faculty" ? "font-bold text-white bg-blue-500" : ""
            }`}
            onClick={() => setLoginrole("faculty")}
          >
            Faculty
          </div>
        </div>
        <div className="flex flex-col gap-0">
          <div className="w-full flex flex-col p-2 gap-1">
            <label className="text-start text-gray-800">Enter Your Email</label>
            <input
              name="username"
              placeholder="Email"
              className="border rounded text-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-700 active:border-red-700 transition-colors duration-300"
              type="text"
              required
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          </div>
          <div className="w-full flex flex-col p-2 gap-1">
            <label className="text-start text-gray-800">Password</label>

            <div className="relative">
              <input
                name="password"
                placeholder="Password"
                className="border rounded text-xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-700 active:border-red-700 transition-colors duration-300"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
              />

              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="w-full p-2 flex flex-row gap-2 items-center">
            <input
              name="remember"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded cursor-pointer"
              type="checkbox"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, remember: e.target.checked }))
              }
            />
            <label className="text-gray-700">Remember Me Leater</label>
          </div>
          <div className="p-2 ">
            <button
              type="submit"
              className="w-full bg-blue-500 p-2 mt-2 rounded text-xl font-medium text-white hover:bg-blue-700 duration-200 cursor-pointer"
              onClick={formSubmitHandler}
            >
              Login
            </button>
          </div>
          <div className="flex justify-center text-gray-500 hover:text-blue-500">
            <Link to={"/forgot-password"}>forgot password</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

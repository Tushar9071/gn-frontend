import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { login } from "../features/auth/authSlice";
import { useAppSelector } from "../hooks/useAppSelector";
import { Link } from "react-router-dom";

const Login = () => {
  const { username } = useAppSelector((state) => state.auth);
  console.log(username);
  const dispatch = useAppDispatch();
  interface formdata {
    username: string;
    password: string;
    remember: boolean;
  }
  const [formData, setFormData] = useState<formdata>({
    username: "",
    password: "",
    remember: false,
  });
  const formSubmitHandler = () => {
    if(formData.username==="" || formData.password===""){
        toast.error("Please Enter Details First!")
        return
    }
    dispatch(login({ username: formData.username, token: "", role: "" }));
    toast.error("Password Not match");
    console.log(formData);
  };
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
        <div className="flex flex-col gap-0">
          <div className="w-full flex flex-col p-2 gap-1">
            <label className="text-start text-gray-800">
              Username Or Email
            </label>
            <input
              name="username"
              placeholder="Username/Email"
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
            <input
              name="password"
              placeholder="Password"
              className="border rounded text-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-700 active:border-red-700 transition-colors duration-300"
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
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
          <div className="flex justify-center text-gray-500 hover:text-blue-500"><Link to={'/forgot-password'}>forgot password</Link></div>
        </div>
      </div>
    </div>
  );
};

export default Login;

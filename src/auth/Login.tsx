import React, { useState } from "react";

const Login = () => {
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
    console.log(formData);
  };
  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-[25%] flex justify-center p-2 rounded-2xl flex-col gap py-16 shadow-2xl">
        <h2 className="text-4xl font-bold text-gray-900 text-center">Login</h2>
        <div className="flex flex-col gap-0">
          <div className="w-full flex flex-col p-2 gap-1">
            <label className="text-start text-gray-800">
              Username Or Email
            </label>
            <input
              name="username"
              placeholder="Username/Email"
              className="border-2 rounded text-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-700 active:border-red-700 transition-colors duration-300"
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
              className="border-2 rounded text-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-700 active:border-red-700 transition-colors duration-300"
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
        </div>
      </div>
    </div>
  );
};

export default Login;

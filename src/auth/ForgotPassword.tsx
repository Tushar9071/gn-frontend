import { Toaster } from 'react-hot-toast'

const ForgotPassword = () => {
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
          Forgot Password
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
              
            />
          </div>
          
          <div className="p-2 ">
            <button
              type="submit"
              className="w-full bg-blue-500 p-2 mt-2 rounded text-xl font-medium text-white hover:bg-blue-700 duration-200 cursor-pointer"
            >
              Generate OTP
            </button>
          </div>
          <div className="flex justify-center text-gray-500 hover:text-blue-500"></div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword

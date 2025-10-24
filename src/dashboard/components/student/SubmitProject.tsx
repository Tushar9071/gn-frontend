import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";

const SubmitProject = () => {
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="h-full w-full p-4 gap-2 flex flex-col">
      <div className="text-center text-xl font-bold">My Project</div>
      <div className="bg-gray-100 p-2 rounded-md text-gray-800">
        <div className="text-lg font-semibold">Description</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
        consequatur necessitatibus iste quia maiores ab officia, ratione cumque
        iure quae magnam commodi rem tenetur id numquam itaque ipsum incidunt
        nisi.Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
        consequatur necessitatibus iste quia maiores ab officia, ratione cumque
        iure quae magnam commodi rem tenetur id numquam itaque ipsum incidunt
        nisi.Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
        consequatur necessitatibus iste quia maiores ab officia, ratione cumque
        iure quae magnam commodi rem tenetur id numquam itaque ipsum incidunt
        nisi.Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
        consequatur necessitatibus iste quia maiores ab officia, ratione cumque
        iure quae magnam commodi rem tenetur id numquam itaque ipsum incidunt
        nisi.
      </div>
      <div className="p-2 rounded-md bg-gray-100 text-gray-800 flex items-center justify-between lg:w-1/3 gap-4">
        <img
          src="https://avatar.iran.liara.run/username?username=jd@a.a"
          alt=""
          className="rounded-md h-10 w-10"
        />
        <div className="leading-4">
          <div className="font-semibold whitespace-nowrap">John Doe</div>
          <div className="text-sm text-gray-500">Supervisor</div>
        </div>
        <div className="w-full flex items-center justify-around">
          <IoIosCall className="bg-green-400 h-8 w-8 rounded-full p-1.5 text-white" />
          <MdEmail className="bg-red-400 h-8 w-8 rounded-full p-1 text-white" />
          <FaInfoCircle className="bg-blue-400 h-8 w-8 rounded-full p-1 text-white" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-center text-xl font-bold">Submit Your Project</div>
        <div className="">
          <div className="flex flex-col items-center justify-center w-full">
            <label
              //   htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6H16a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">Upload Zip file</p>
              </div>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={(event) => handleFileChange(event)}
              />
            </label>

            {fileName && (
              <p className="mt-2 text-sm text-gray-600">
                <span className="font-medium">Selected:</span> {fileName}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 p-4">
        <label className="font-semibold mb-2 block">
          Project Link (if any like github):
        </label>
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        <button className="mt-2 bg-blue-500 text-white rounded-md p-2">
          Submit
        </button>
      </div>
    </div>
  );
};

export default SubmitProject;

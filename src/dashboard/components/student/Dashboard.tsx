import { FaInfoCircle } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";

const Dashboard = () => {
  return (
    <div className="h-full w-full p-4 gap-2 flex flex-col">
      <div className="text-center flex text-xl font-bold">My Project</div>
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
    </div>
  );
};

export default Dashboard;

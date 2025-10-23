import { FaInfoCircle } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";

const Card = ({
  data: { role, email, phone, degree },
}: {
  data: { role: string; email: string; phone: string; degree: string };
}) => {
  return (
    <div className="flex bg-gray-200 h-auto w-72 rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer flex-col gap-4">
      <div className="flex flex-row items-center">
        <img
          src={"https://avatar.iran.liara.run/username?username=" + email}
          alt=""
          className="rounded-2xl h-12 w-12"
        />
        <div className="m-4 flex flex-col">
          <label className="font-bold flex">{role}</label>
          <label className="text-gray-500 text-ellipsis whitespace-nowrap">
            {email}
          </label>
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <IoIosCall className="bg-green-500 text-white h-8 w-8 rounded-full p-1.5" />
        <span className="text-gray-500">{phone}</span>
      </div>
      <div className="flex flex-row items-center gap-4">
        <MdEmail className="bg-red-500 text-white h-8 w-8 rounded-full p-1.5" />
        <span className="text-gray-500">{email}</span>
      </div>
      <div className="flex flex-row items-center gap-4">
        <FaInfoCircle className="bg-blue-500 text-white h-8 w-8 rounded-full p-1.5" />
        <span className="text-gray-500">{degree}</span>
      </div>
    </div>
  );
};

export default Card;

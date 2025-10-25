import { useState } from "react";
import toast from "react-hot-toast";

const Dropdown = ({
  data,
  selected,
  setSelected,
  disabled,
  addNewOption,
  errorMessage,
}: {
  data: string[];
  selected: string;
  setSelected: any;
  disabled: any;
  addNewOption?: Function;
  errorMessage?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filteredOptions = data.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="relative">
      <div
        onClick={() => {
          if (!disabled) {
            return setIsOpen(!isOpen);
          }
          toast.error(errorMessage || "Fill Other Details First", {
            duration: 1500,
          });
        }}
        className="border border-gray-300 rounded-md px-3 py-2 cursor-pointer bg-white flex justify-between items-center"
      >
        <span className=" whitespace-nowrap text-ellipsis">
          {selected || "Select an option"}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute mt-1 w-full border border-gray-300 bg-white rounded-md shadow-lg z-10">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border-b border-gray-200 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul className="max-h-40 overflow-y-auto ">
            {filteredOptions.length ? (
              filteredOptions.map((option) => (
                <li
                  key={option}
                  onClick={() => {
                    setSelected(option);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className="p-2 hover:bg-blue-100 cursor-pointer flex justify-between items-center"
                >
                  {option}
                  {addNewOption && (
                    <button
                      onClick={() => addNewOption && addNewOption(option)}
                      className="flex items-center justify-center h-5 w-5 rounded-full hover:bg-blue-200 hover:text-blue-800 text-sm font-bold"
                    >
                      <label className="text-center h-full w-full">+</label>
                    </button>
                  )}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

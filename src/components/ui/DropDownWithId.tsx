import { useEffect, useState } from "react";
import toast from "react-hot-toast";


interface DropdownWithIdProps {
    data: { id: number; data: string }[];
    selected: number | string;
    setSelected: (option: { id: number; data: string }) => void;
    disabled?: boolean;
    addNewOption?: (option: { id: string | number; data: string }) => void;
    errorMessage?: string;
}

const DropdownWithId = ({
    data,
    selected,
    setSelected,
    disabled,
    addNewOption,
    errorMessage,
}: DropdownWithIdProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filteredOptions = data.filter((option) =>
        option.data.toLowerCase().includes(search.toLowerCase())
    );
    useEffect(() => {
        if (typeof selected !== "number" && selected !== "") {
            const matchedOption = data.find(item => item.data === selected);
            if (matchedOption) setSelected(matchedOption);
        }
    }, [selected, data]);

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
                <span className="whitespace-nowrap text-ellipsis">
                    {typeof selected === "number" ? data.find(item => item.id === selected)?.data : selected || "Select..."}
                </span>
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
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

                    <ul className="max-h-40 overflow-y-auto">
                        {filteredOptions.length ? (
                            filteredOptions.map((option) => (
                                <li
                                    key={option.id}
                                    onClick={() => {
                                        setSelected(option);
                                        setIsOpen(false);
                                        setSearch("");
                                    }}
                                    className="p-2 hover:bg-blue-100 cursor-pointer flex justify-between items-center"
                                >
                                    {option.data}

                                    {addNewOption && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addNewOption(option);
                                            }}
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

export default DropdownWithId;

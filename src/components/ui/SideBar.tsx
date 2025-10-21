import { type ReactNode } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { toggleExtendedMenu } from "../../features/ui-state/uiSlice";

const SideBar = ({ children }: { children?: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { extendedMenu } = useAppSelector((state) => state.sidebar);
  return (
    <aside
      className={`h-screen sticky top-0 w-20 ${
        extendedMenu ? "w-64" : ""
      } transition-all`}
    >
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className={`${extendedMenu?"p-4 pb-2 flex justify-between items-center":"flex flex-col items-center p-4 pb-2 gap-3"}`}>
          {extendedMenu && <div className="font-bold">Student</div>}
          <button
            onClick={() => dispatch(toggleExtendedMenu())}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {extendedMenu ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>

        <ul
          className={`${
            extendedMenu ? "flex-1 px-3" : "flex-1 flex items-center flex-col"
          }`}
        >
          {children}
        </ul>

        <div className="border-t flex p-3 items-center justify-center">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${
                extendedMenu ? "w-52 ml-3" : "w-0"
              }
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            {/* <MoreVertical size={20} /> */}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default SideBar;

export function SideBarItem({
  icon,
  text,
  active,
  alert,
}: {
  icon: any;
  text: any;
  active?: any;
  alert?: any;
}) {
  const { extendedMenu } = useAppSelector((state) => state.sidebar);
  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          extendedMenu ? "w-44 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            extendedMenu ? "" : "top-2"
          }`}
        />
      )}

      {!extendedMenu && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}

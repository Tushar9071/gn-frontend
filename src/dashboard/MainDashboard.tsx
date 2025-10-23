import SideBar, { SideBarItem } from "../components/ui/SideBar";
// import { PiStudent } from "react-icons/pi";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { setSelectedItem } from "../features/ui-state/uiSlice";
import roleFeature from "../utils/rolefeatures";
// import { Children, type ReactNode } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { selectedItem } = useAppSelector((state) => state.sidebar);
  const { role } = useAppSelector((state) => state.auth);
  const roleFeatures = roleFeature({ key: role || "" });
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-row">
        <SideBar>
          {roleFeatures.map((features, index) => (
            <button
              onClick={() => {
                dispatch(setSelectedItem(index));
                navigate(
                  `/${features.feature.replace(/\s+/g, "-").toLowerCase()}`
                );
              }}
              key={index}
            >
              <SideBarItem
                icon={features.logo}
                text={features.feature}
                active={selectedItem === index}
                // alert={true}
              ></SideBarItem>
            </button>
          ))}
          {/* <button onClick={() => dispatch(setSelectedItem(1))}>
          <SideBarItem
            icon={<PiStudent />}
            text={"Student"}
            active={selectedItem === 1}
            // alert={true}
          ></SideBarItem>
        </button>
        <button onClick={() => dispatch(setSelectedItem(2))}>
          <SideBarItem
            icon={<PiStudent />}
            text={"Student"}
            active={selectedItem === 2}
          ></SideBarItem>
        </button>
        <button onClick={() => dispatch(setSelectedItem(3))}>
          <SideBarItem
            icon={<PiStudent />}
            text={"Student"}
            active={selectedItem === 3}
          ></SideBarItem>
        </button>
        <button onClick={() => dispatch(setSelectedItem(4))}>
          <SideBarItem
            icon={<PiStudent />}
            text={"Student"}
            active={selectedItem === 4}
          ></SideBarItem>
        </button> */}
        </SideBar>
        <div className="w-full">
          {/* {Children} */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

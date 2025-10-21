import SideBar, { SideBarItem } from "../components/ui/SideBar";
// import { PiStudent } from "react-icons/pi";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { setSelectedItem } from "../features/ui-state/uiSlice";
import roleFeature from "../utils/rolefeatures";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { selectedItem } = useAppSelector((state) => state.sidebar);
  const { role } = useAppSelector((state) => state.auth);
  const roleFeatures = roleFeature({ key: role || "" });
  return (
    <>
      <SideBar>
        {roleFeatures.map((features, index) => (
          <button onClick={() => dispatch(setSelectedItem(index))} key={index}>
            <SideBarItem
              icon={features.element}
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
    </>
  );
};

export default Dashboard;

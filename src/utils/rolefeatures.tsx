import type { JSX } from "react";
import { MdManageAccounts, MdViewInAr, MdOutlineSaveAlt } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { FaBookAtlas, FaPeopleGroup } from "react-icons/fa6";
import { GoReport } from "react-icons/go";
import Dashboard from "../dashboard/components/student/Dashboard";
import MyProjectGroup from "../dashboard/components/student/MyProjectGroup";
import SubmitProject from "../dashboard/components/student/SubmitProject";
import Meetings from "../dashboard/components/student/Meetings";

const roleFeatures = ({ key }: { key?: string }) => {
  const featuresMap: { [key: string]: string[] } = {
    student: [
      "Dashboard",
      "My Project Groups",
      "Submit Project",
      // "Reports",
      "Meetings",
    ],
    faculty: [
      "Dashboard",
      "My Project Groups",
      "Submissions",
      "Reports",
      "Meetings",
    ],
  };

  const featuresLogoMap: Record<string, JSX.Element> = {
    Dashboard: <IoMdHome />,
    "My Project Groups": <FaBookAtlas />,
    "Submit Project": <MdOutlineSaveAlt />,
    Submissions: <MdOutlineSaveAlt />,
    Reports: <GoReport />,
    "Manage Student": <MdManageAccounts />,
    "View Project": <MdViewInAr />,
    Meetings: <FaPeopleGroup />,
  };

  const featuresElementsMap: Record<string, JSX.Element> = {
    Dashboard: <Dashboard />,
    "My Project Groups": <MyProjectGroup />,
    "Submit Project": <SubmitProject />,
    Reports: <GoReport />,
    "Manage Student": <MdManageAccounts />,
    "View Project": <MdViewInAr />,
    Meetings: <Meetings />,
  };
  const features = featuresMap[key || ""] || [];
  const featuresList = features.map((feature) => ({
    feature,
    logo: featuresLogoMap[feature],
    element: featuresElementsMap[feature],
  }));
  return featuresList;
};

export default roleFeatures;

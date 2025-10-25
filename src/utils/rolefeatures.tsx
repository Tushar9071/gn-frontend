import { useEffect, type JSX } from "react";
import { MdManageAccounts, MdViewInAr, MdOutlineSaveAlt } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { FaBookAtlas, FaPeopleGroup } from "react-icons/fa6";
import { GoReport } from "react-icons/go";
import SubmitProject from "../dashboard/components/student/SubmitProject";
import Meetings from "../dashboard/components/student/Meetings";

import StudentDashboard from "../dashboard/components/student/Dashboard";
import FacultyDashboard from "../dashboard/components/faculty/Dashboard";

import StudentMyProjectGroup from "../dashboard/components/student/MyProjectGroup";
import ProjectGroups from "../dashboard/components/faculty/ProjectGroup";
import { LuFileType } from "react-icons/lu";
import ProjectType from "../dashboard/components/faculty/ProjectType";

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
      "Project Groups",
      "Project Types",
      "Submissions",
      "Reports",
      "Meetings",
    ],
  };

  const featuresLogoMap: Record<string, JSX.Element> = {
    Dashboard: <IoMdHome />,
    "My Project Groups": <FaBookAtlas />,
    "Project Groups": <FaBookAtlas />,
    "Project Types": <LuFileType />,
    "Submit Project": <MdOutlineSaveAlt />,
    Submissions: <MdOutlineSaveAlt />,
    Reports: <GoReport />,
    "Manage Student": <MdManageAccounts />,
    "View Project": <MdViewInAr />,
    Meetings: <FaPeopleGroup />,
  };

  const featuresElementsMap: Record<string, JSX.Element> = {
    Dashboard: key === "student" ? <StudentDashboard /> : <FacultyDashboard />,
    "My Project Groups":
      key === "student" ? <StudentMyProjectGroup /> : <ProjectGroups />,
    "Submit Project": <SubmitProject />,
    "Project Types": <ProjectType />,
    "Project Groups": <ProjectGroups />,
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

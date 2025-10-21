import type { JSX } from "react";
import { CgLivePhoto } from "react-icons/cg";
import {
  MdOutlineUpcoming,
  MdManageAccounts,
  MdViewInAr,
  MdMeetingRoom,
} from "react-icons/md";
import { IoMdCloudDone } from "react-icons/io";
import CurrentProjects from "../dashboard/components/CurrentProjects";

const roleFeatures = ({ key }: { key?: string }) => {
  const featuresMap: { [key: string]: string[] } = {
    student: ["current projects", "upcoming projects", "submit work"],
    faculty: ["Manage Student", "View Project", "Meetings"],
  };

  const featuresLogoMap: Record<string, JSX.Element> = {
    "current projects": <CgLivePhoto />,
    "upcoming projects": <MdOutlineUpcoming />,
    "submit work": <IoMdCloudDone />,
    "Manage Student": <MdManageAccounts />,
    "View Project": <MdViewInAr />,
    Meetings: <MdMeetingRoom />,
  };

  const featuresElementsMap: Record<string, JSX.Element> = {
    "current projects": <CurrentProjects />,
    "upcoming projects": <MdOutlineUpcoming />,
    "submit work": <IoMdCloudDone />,
    "Manage Student": <MdManageAccounts />,
    "View Project": <MdViewInAr />,
    Meetings: <MdMeetingRoom />,
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

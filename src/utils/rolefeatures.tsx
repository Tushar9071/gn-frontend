import type { JSX } from "react";
import { CgLivePhoto } from "react-icons/cg";
import { MdOutlineUpcoming } from "react-icons/md";
import { IoMdCloudDone } from "react-icons/io";

const roleFeatures = ({ key }: { key?: string }) => {
  const featuresMap: { [key: string]: string[] } = {
    student: ["current projects", "upcoming projects", "submit work"],
    faculty: ["View Courses", "Manage Courses", "View Grades"],
  };

  const featuresLogoMap: Record<string, JSX.Element> = {
    "current projects": <CgLivePhoto />,
    "upcoming projects": <MdOutlineUpcoming />,
    "submit work": <IoMdCloudDone />,
  };
  const features = featuresMap[key || ""] || [];
  const featuresList = features.map((feature) => ({
    feature,
    element: featuresLogoMap[feature],
  }));
  return featuresList;
};

export default roleFeatures;

import { useEffect, useState } from "react";
import Dropdown from "../../../components/ui/Dropdown";
import { useFetchApi } from "../../../hooks/useFetchApi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { CookieService } from "../../../utils/cookies";
import Loading from "../../../components/ui/Loading";

const ProjectGroup = () => {
  const [allGroups, setAllGroups] = useState<any[]>([]);
  const [, setProjectType] = useState<any[]>([]);
  const [searchGroups, setSearchGroups] = useState<string>("");
  const [fetchGroupCallApi, fetchGroupsPending, fetchGroupsResponse] =
    useFetchApi();
  const [
    fetchProjectTypeCallApi,
    fetchProjectTypePending,
    fetchProjectTypeResponse,
  ] = useFetchApi();
  useEffect(() => {
    fetchGroupCallApi("/api/CLProjectGroup/getall", {
      headers: { Authorization: `Bearer ${CookieService.get("token")}` },
    });
    fetchProjectTypeCallApi("/api/CLProjectType/getall", {
      headers: { Authorization: `Bearer ${CookieService.get("token")}` },
    });
  }, []);
  useEffect(() => {
    if (fetchGroupsResponse && fetchGroupsResponse?.data) {
      setAllGroups(fetchGroupsResponse.data);
    }
  }, [fetchGroupsResponse]);
  useEffect(() => {
    if (fetchProjectTypeResponse && fetchProjectTypeResponse?.data) {
      setProjectType(fetchProjectTypeResponse.data);
    }
  }, [fetchProjectTypeResponse]);
  if (fetchGroupsPending || fetchProjectTypePending) {
    return <Loading width={60} height={60} />;
  }
  return (
    <div className="flex flex-col h-full w-full p-4 gap-2">
      <div className="w-full text-center bg-indigo-50 text-indigo-900 p-4 text-xl font-bold rounded">
        Manage Groups
      </div>
      <div className="w-full text-center bg-indigo-50 text-indigo-800 p-4 rounded grid">
        <div className="lg:w-1/2">
          <div className="w-full text-start p-1">Select Project Type:</div>
          <Dropdown
            data={allGroups.map((item: any) => item.projectGroupName)}
            disabled={false}
            selected={searchGroups}
            setSelected={setSearchGroups}
          />
        </div>
      </div>
      <div className="bg-indigo-50 p-4 grid grid-cols-2 gap-2 rounded">
        {allGroups.map((item: any, index: number) => {
          if (searchGroups === "" || item.projectGroupName === searchGroups) {
            return (
              <GroupCard
                key={index}
                projectGroupName={item.projectGroupName}
                projectTypeName={item.projectTypeName}
                guideStaffName={item.guideStaffName}
                projectTitle={item.projectTitle}
                projectArea={item.projectArea}
                projectDescription={item.projectDescription}
                averageCPI={item.averageCPI}
                convenerStaffName={item.convenerStaffName}
                expertStaffName={item.expertStaffName}
                description={item.description}
              />
            );
          } else {
          }
        })}
      </div>
    </div>
  );
};

export default ProjectGroup;

function GroupCard({
  projectGroupName,
  projectTypeName,
  guideStaffName,
  projectTitle,
  projectArea,
  projectDescription,
  averageCPI,
  convenerStaffName,
  expertStaffName,
  description,
}: {
  projectGroupName?: string;
  projectTypeName?: string;
  guideStaffName?: string;
  projectTitle?: string;
  projectArea?: string;
  projectDescription?: string;
  averageCPI?: string;
  convenerStaffName?: string;
  expertStaffName?: string;
  description?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=" grid gap-2 p-4 rounded">
      <div
        className={`flex flex-col gap-2 cursor-pointer p-4 hover:bg-indigo-100 duration-300 rounded-2xl ${
          isOpen ? "bg-indigo-100" : "bg-indigo-50"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="w-full text-xl font-medium flex gap-2">
              Project Group Name:{" "}
              <div className="font-semibold text-indigo-800">
                {projectGroupName}
              </div>
            </div>
            <div className="w-full flex gap-2">
              Guide:{" "}
              <div className="font-semibold text-indigo-800">
                {guideStaffName}
              </div>
            </div>
          </div>
          {isOpen ? <FaAngleUp /> : <FaAngleDown />}
        </div>
        <div
          className={`transition-all overflow-hidden duration-600 ${
            isOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="w-full flex gap-2">
            Project Type:{" "}
            <div className="font-semibold text-indigo-800">
              {projectTypeName}
            </div>
          </div>
          <div className="w-full flex gap-2">
            Project Title:{" "}
            <div className="font-semibold text-indigo-800">{projectTitle}</div>
          </div>
          <div className="w-full flex gap-2">
            Project Area:{" "}
            <div className="font-semibold text-indigo-800">{projectArea}</div>
          </div>
          <div className="w-full gap-2">
            Project Description:{" "}
            <div className="font-semibold text-indigo-800">
              {projectDescription}
            </div>
          </div>
          <div className="w-full flex gap-2">
            Project Average CPI:{" "}
            <div className="font-semibold text-indigo-800">{averageCPI}</div>
          </div>
          <div className="w-full flex gap-2">
            Project Convener Staff Name:{" "}
            <div className="font-semibold text-indigo-800">
              {convenerStaffName}
            </div>
          </div>
          <div className="w-full flex gap-2">
            Project Expert Staff Name:{" "}
            <div className="font-semibold text-indigo-800">
              {expertStaffName}
            </div>
          </div>
          <div className="w-full gap-2">
            Description:{" "}
            <div className="font-semibold text-indigo-800">{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import Dropdown from "../../../components/ui/Dropdown";
import { useFetchApi } from "../../../hooks/useFetchApi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { CookieService } from "../../../utils/cookies";
import Loading from "../../../components/ui/Loading";
import NewProjectGroup from "./NewProjectGroup";
import toast from "react-hot-toast";

const ProjectGroup = () => {
  const [allGroups, setAllGroups] = useState<any[]>([]);
  const [, setProjectType] = useState<any[]>([]);
  const [searchGroups, setSearchGroups] = useState<string>("");
  const [isNewTypeAddButton, setIsNewTypeAddButton] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [editData, setEditData] = useState<any>(null);
  const [fetchGroupCallApi, fetchGroupsPending, fetchGroupsResponse] =
    useFetchApi();
  const [deleteApi] = useFetchApi();
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
  }, [reload]);
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
  const deleteHandler = (id: number) => {
    toast.dismissAll();
    toast(
      (t) => (
        <span>
          Are you sure you want to delete {/* <br/> */}
          <button
            className="ml-4 bg-green-500 py-1 px-3 rounded-2xl text-white hover:shadow-lg transition-all duration-300 hover:bg-green-600"
            onClick={() => {
              toast.dismiss(t.id);
              let toastId = toast.loading(`Deleting...`);
              deleteApi(`/api/CLProjectGroup/id?projectGroupId=${id}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${CookieService.get("token")}`,
                },
              }).then((res) => {
                console.log(res);
                toast.dismiss(toastId);
                if (!res?.isError && res) {
                  console.log("Delete response:", res);
                  toast.success(`deleted successfully`, {
                    duration: 1500,
                  });
                  setReload((e: any) => !e);
                } else {
                  console.log(res);
                  toast.error(res?.message || `Failed to delete`, {
                    duration: 1000,
                  });
                  setReload((e: any) => !e);
                }
              });
            }}
          >
            Confirm
          </button>
          <button
            className="ml-4 bg-red-500 py-1 px-3 rounded-2xl text-white hover:shadow-lg transition-all duration-300 hover:bg-red-600"
            onClick={() => {
              toast.dismiss(t.id);
            }}
          >
            Cancel
          </button>
        </span>
      ),
      { duration: Infinity }
    );
  };
  return (
    <div className="flex flex-col h-full w-full p-4 gap-2">
      {!isNewTypeAddButton && !editData ? (
        <>
          <div className="w-full text-center bg-indigo-50 text-indigo-900 p-4 text-xl font-bold rounded flex justify-center items-center">
            Manage Project Types
            <div className=" absolute right-8">
              <button
                className="bg-indigo-500 px-3 py-1.5 rounded-lg text-white duration-300 transition-colors hover:bg-indigo-600"
                onClick={() => setIsNewTypeAddButton(!isNewTypeAddButton)}
              >
                add
              </button>
            </div>
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
                    projectGroupID={item.projectGroupID}
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
                    editHandler={setEditData}
                    deleteHandler={deleteHandler}
                  />
                );
              } else {
              }
            })}
          </div>
        </>) : (<NewProjectGroup back={setIsNewTypeAddButton} editData={editData} reload={setReload} setEditData={setEditData} />)}
    </div>
  );
};

export default ProjectGroup;

function GroupCard({
  projectGroupID,
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
  editHandler,
  deleteHandler,
}: {
  projectGroupID?: number;
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
  editHandler: React.Dispatch<React.SetStateAction<any>>;
  deleteHandler: (id: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=" grid gap-2 p-4 rounded">
      <div
        className={`flex flex-col gap-2 cursor-pointer p-4 hover:bg-indigo-100 duration-300 rounded-2xl ${isOpen ? "bg-indigo-100" : "bg-indigo-50"
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
          className={`transition-all overflow-hidden duration-600 ${isOpen ? "max-h-screen" : "max-h-0"
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
          <div className="w-full gap-3 flex flex-row mt-4">
            <button className="bg-indigo-500 text-white rounded px-4 py-2" onClick={() => editHandler({ projectGroupID, projectGroupName, projectTypeName, guideStaffName, projectTitle, projectArea, projectDescription, averageCPI, convenerStaffName, expertStaffName, description })}>
              Edit
            </button>
            <button className="bg-red-500 text-white rounded px-4 py-2" onClick={() => deleteHandler(projectGroupID ?? 0)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

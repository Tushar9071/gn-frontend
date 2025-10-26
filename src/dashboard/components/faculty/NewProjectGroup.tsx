import toast from "react-hot-toast";
import { useFetchApi } from "../../../hooks/useFetchApi";
import { CookieService } from "../../../utils/cookies";
import React, { useEffect, useState } from "react";
import DropdownWithId from "../../../components/ui/DropDownWithId";

interface NewProjectGroupProps {
  projectGroupName: string,
  projectTypeId: number,
  projectTitle: string,
  projectArea: string,
  projectDescription: string,
  averageCpi: number,
  convenerStaffId: number,
  convenerStaffName?: string,
  expertStaffName?: string,
  expertStaffId: number,
  description: string,
  guideStaffID: number,
  projectTypeName?: string,
  guideStaffName?: string,
}
const NewProjectGroup = ({
  back,
  editData,
  reload,
  setEditData
}: {
  back: React.Dispatch<React.SetStateAction<boolean>>;
  editData?: any;
  reload?: React.Dispatch<React.SetStateAction<any>>;
  setEditData?: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [formData, setFormData] = useState<NewProjectGroupProps>({
    projectGroupName: "",
    projectTypeId: 0,
    projectTypeName: "",
    projectTitle: "",
    projectArea: "",
    projectDescription: "",
    averageCpi: 0,
    convenerStaffId: 0,
    convenerStaffName: "",
    expertStaffId: 0,
    expertStaffName: "",
    description: "",
    guideStaffID: 0,
    guideStaffName: "",
  });
  useEffect(() => {
    if (editData) {
      setFormData({
        projectGroupName: editData.projectGroupName || "",
        projectTypeId: editData.projectTypeId || 0,
        projectTypeName: editData.projectTypeName || "",
        projectTitle: editData.projectTitle || "",
        projectArea: editData.projectArea || "",
        projectDescription: editData.projectDescription || "",
        averageCpi: editData.averageCPI || 0,
        convenerStaffId: editData.convenerStaffId || 0,
        convenerStaffName: editData.convenerStaffName || "",
        expertStaffId: editData.expertStaffId || 0,
        expertStaffName: editData.expertStaffName || "",
        description: editData.description || "",
        guideStaffID: editData.guideStaffID || 0,
        guideStaffName: editData.guideStaffName || "",
      });
    }
  }, [editData]);

  let toastId: string = "";
  const [createProjectGroup] = useFetchApi();
  const [ProjectTypes, setProjectTypes] = useState<any>([]);
  const [facultyList, setFacultyList] = useState<any>([]);
  const [fetchData] = useFetchApi();
  useEffect(() => {
    fetchData("/api/CLProjectType/getall").then((res) => {
      if (res && Array.isArray(res?.data)) setProjectTypes(res.data);
    });
    fetchData("/api/CLFaculty/getall").then((res) => {
      if (res && Array.isArray(res?.data)) setFacultyList(res.data);
    });
  }, []);
  const handleSubmit = async () => {
    if (formData.projectGroupName.trim() === "" || formData.projectTitle.trim() === "" || formData.projectArea.trim() === "" || formData.projectTypeId === 0 || formData.averageCpi === 0 || formData.convenerStaffId === 0 || formData.expertStaffId === 0 || formData.guideStaffID === 0) {
      toastId = toast.error("All fields are required", { duration: 1500 });
      return;
    }
    toastId = toast.loading("Creating project group...");
    console.log("Form Data Submitted: ", formData);
    await createProjectGroup(editData ? "/api/CLProjectGroup/edit/" + editData.projectGroupID : "/api/CLProjectGroup/insert", {
      method: editData ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CookieService.get("token")}`,
      },
    }, { ...formData }).then((res) => {
      if (!res?.isError) {
        if (toastId) toast.dismiss(toastId);
        toastId = toast.success(
          res?.message || editData
            ? "Project group updated successfully"
            : "Project group created successfully",
          { duration: 1500 }
        );
      }
      else {
        if (toastId) toast.dismiss(toastId);
        toastId = toast.error(
          res?.message || "Failed to create project group",
          { duration: 1500 }
        );
      }
      setTimeout(() => {
        back(false);
        if (reload) {
          reload((e: boolean) => !e);
          setEditData?.(null);
        }
      }, 1500)
    });
  }

  return (
    <>
      {/* <Toaster position="top-right" /> */}
      <div className="w-full p-4 bg-indigo-50 flex flex-col gap-16 rounded-lg items-center">
        <div className="text-xl font-semibold text-indigo-800">
          {editData ? "Edit Project Type" : "Add New Project Type"}
        </div>
        <div className="w-full gap-8 flex flex-col">
          <div className="flex flex-row items-center gap-2">
            <label className="font-medium text-indigo-700 w-56 text-right">
              Enter Project Group Name:
            </label>
            <input
              value={formData.projectGroupName}
              type="text"
              className="flex-1 border-[1.5px] rounded border-indigo-400 p-1"
              onChange={(e) =>
                setFormData({ ...formData, projectGroupName: e.target.value })
              }
            />
          </div>

          <div className="flex flex-row items-center gap-2">
            <label className="font-medium text-indigo-700 w-56 text-right">
              Enter Project Type:
            </label>
            <DropdownWithId data={ProjectTypes?.map((item: any) => { return { id: item.projectTypeID, data: item.projectTypeName } })} selected={formData.projectTypeId > 0 ? formData.projectTypeId : formData.projectTypeName ? formData.projectTypeName : formData.projectTypeId} setSelected={(option) => { setFormData({ ...formData, projectTypeId: option?.id }) }} />
          </div>

          <div className="flex flex-row items-center gap-2">
            <label className="font-medium text-indigo-700 w-56 text-right">
              Enter Project Title:
            </label>
            <input
              value={formData.projectTitle}
              type="text"
              className="flex-1 border-[1.5px] rounded border-indigo-400 p-1"
              onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
            />
          </div>

          <div className="flex flex-row items-center gap-2">
            <label className="font-medium text-indigo-700 w-56 text-right">
              Enter Project Area:
            </label>
            <input
              value={formData.projectArea}
              type="text"
              className="flex-1 border-[1.5px] rounded border-indigo-400 p-1"
              onChange={(e) => setFormData({ ...formData, projectArea: e.target.value })}
            />
          </div>

          <div className="flex flex-row items-center gap-2">
            <label className="font-medium text-indigo-700 w-56 text-right">
              Average Cpi:
            </label>
            <input
              value={formData.averageCpi}
              type="number"
              className="flex-1 border-[1.5px] rounded border-indigo-400 p-1"
              onChange={(e) => setFormData({ ...formData, averageCpi: Number(e.target.value) })}
            />
          </div>

          <div className="flex flex-row items-center gap-2">
            <label className="font-medium text-indigo-700 w-56 text-right">
              Convenor Staff:
            </label>
            <DropdownWithId data={facultyList?.map((item: any) => { return { id: item.staffID, data: item.staffName } })} selected={formData.convenerStaffId > 0 ? formData.convenerStaffId : formData.convenerStaffName ? formData.convenerStaffName : formData.convenerStaffId} setSelected={(option) => { setFormData({ ...formData, convenerStaffId: option?.id }) }} />
          </div>

          <div className="flex flex-row items-center gap-2">
            <label className="font-medium text-indigo-700 w-56 text-right">
              Expert StaffId:
            </label>
            <DropdownWithId data={facultyList?.map((item: any) => { return { id: item.staffID, data: item.staffName } })} selected={formData.expertStaffId > 0 ? formData.expertStaffId : formData.expertStaffName ? formData.expertStaffName : formData.expertStaffId} setSelected={(option) => { setFormData({ ...formData, expertStaffId: option?.id }) }} />
          </div>

          <div className="flex flex-row items-center gap-2">
            <label className="font-medium text-indigo-700 w-56 text-right">
              Guide Staff:
            </label>
            <DropdownWithId data={facultyList?.map((item: any) => { return { id: item.staffID, data: item.staffName } })} selected={formData.guideStaffID > 0 ? formData.guideStaffID : formData.guideStaffName ? formData.guideStaffName : formData.guideStaffID} setSelected={(option) => { setFormData({ ...formData, guideStaffID: option?.id }) }} />
          </div>

          <div className="flex items-start gap-2">
            <label className="font-medium text-indigo-700 w-56 text-right pt-2">
              Project Description:
            </label>
            <textarea
              value={formData.description}
              className="flex-1 border-[1.5px] rounded border-indigo-400 h-32 p-2"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="flex justify-center">
            <button
              className="bg-indigo-500 px-6 py-1.5 rounded-lg text-white duration-300 transition-colors hover:bg-indigo-600"
              onClick={handleSubmit}
            >
              {editData ? "Save Changes" : "Create Project Type"}
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default NewProjectGroup;

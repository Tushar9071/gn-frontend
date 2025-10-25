import toast, { Toaster } from "react-hot-toast";
import { useFetchApi } from "../../../hooks/useFetchApi";
import { CookieService } from "../../../utils/cookies";
import React, { useState } from "react";

interface NewProjectTypeProps {
  projectTypeName: string;
  description?: string;
}

const NewProjectType = ({
  back,
  editData,
  setEditData,
  reload,
}: {
  back: React.Dispatch<React.SetStateAction<boolean>>;
  editData?: any;
  setEditData?: React.Dispatch<React.SetStateAction<any>>;
  reload?: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [formData, setFormData] = useState<NewProjectTypeProps>({
    projectTypeName: editData ? editData.typeName : "",
    description: editData ? editData.description : "",
  });
  let toastId: string = "";
  const [createProjectType, , createProjectTypeResponse] = useFetchApi();
  const handleSubmit = async () => {
    if (formData.projectTypeName.trim() === "") {
      toast.error("Project Type Name is required", { duration: 1500 });
      return;
    }
    toastId = toast.loading("Creating project type...");
    await createProjectType(
      editData
        ? `/api/CLProjectType/edit/${editData.id}`
        : "/api/CLProjectType/insert",
      {
        method: editData ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CookieService.get("token")}`,
        },
      },
      {
        projectTypeName: formData.projectTypeName,
        description: formData.description || "",
      }
    ).then(() => {
      if (!createProjectTypeResponse?.isError) {
        if (toastId) toast.dismiss(toastId);
        toastId = toast.success(
          createProjectTypeResponse?.message || editData
            ? "Project type updated successfully"
            : "Project type created successfully",
          { duration: 1500 }
        );
        setTimeout(() => {
          back((e) => !e);
          if (setEditData) {
            back(false);
            setEditData(null);
            reload ? reload((e: boolean) => !e) : null;
          }
        }, 1500);
      } else {
        if (toastId) toast.dismiss(toastId);
        toastId = toast.error(
          createProjectTypeResponse?.message || "Failed to create project type",
          { duration: 1500 }
        );
      }
    });
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="w-full p-4 bg-indigo-50 flex flex-col gap-16 rounded-lg items-center">
        <div className="text-xl font-semibold text-indigo-800">
          {editData ? "Edit Project Type" : "Add New Project Type"}
        </div>
        <div className="w-full gap-8 flex flex-col">
          <div className="flex flex-row gap-2">
            <label className="font-medium text-indigo-700">
              Project Type Name:
            </label>
            <input
              value={formData.projectTypeName}
              type="text"
              className=" border-[1.5px] rounded border-indigo-400"
              onChange={(e) =>
                setFormData({ ...formData, projectTypeName: e.target.value })
              }
            />
          </div>
          <div className="flex">
            <label className="font-medium text-indigo-700">Description:</label>
            <textarea
              value={formData.description}
              className="border-[1.5px] rounded border-indigo-400 w-full h-32 ml-2 p-2"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div>
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

export default NewProjectType;

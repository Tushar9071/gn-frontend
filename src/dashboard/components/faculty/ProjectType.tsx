import { useEffect, useState } from "react";
import NewProjectType from "./NewProjectType";
import { useFetchApi } from "../../../hooks/useFetchApi";
import Loading from "../../../components/ui/Loading";
import { CookieService } from "../../../utils/cookies";
import toast from "react-hot-toast";
// import { Toaster } from "react-hot-toast";

const ProjectType = () => {
  const [isNewTypeAddButton, setIsNewTypeAddButton] = useState<boolean>(false);
  const [allTypes, setAllTypes] = useState<any[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [editData, setEditData] = useState<any>(null);
  const [fetchAllType, fetchAllTypePending, fetchAllTypeResponse] =
    useFetchApi();
  useEffect(() => {
    fetchAllType("/api/CLProjectType/getall", {
      headers: { Authorization: `Bearer ${CookieService.get("token")}` },
    });
  }, [isNewTypeAddButton, reload]);
  useEffect(() => {
    if (fetchAllTypeResponse && fetchAllTypeResponse?.data) {
      setAllTypes(fetchAllTypeResponse.data);
      //   console.log(fetchAllTypeResponse.data);
    }
  });
  if (fetchAllTypePending) {
    return <Loading width={60} height={60} />;
  }
  return (
    <div className="w-full h-full p-4">
      {/* <Toaster position="top-right" toastOptions={{ duration: 1000 }} /> */}
      {!isNewTypeAddButton && !editData ? (
        <div className="w-full h-full flex flex-col gap-4">
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
          <div className="w-full bg-indigo-50 p-4 gap-3 flex flex-col justify-center items-center">
            <h2 className="text-indigo-800 font-semibold text-lg">
              All Project Types
            </h2>
            {allTypes.map((type: any, index: number) => (
              <TypeCard
                key={index}
                typeName={type.projectTypeName}
                description={type.description}
                id={type.projectTypeID}
                setReload={setReload}
                editHandler={setEditData}
              />
            ))}
          </div>
        </div>
      ) : (
        <NewProjectType
          back={setIsNewTypeAddButton}
          editData={editData}
          setEditData={setEditData}
          reload={setReload}
        />
      )}
    </div>
  );
};

export default ProjectType;

function TypeCard({
  typeName,
  description,
  id,
  setReload,
  editHandler,
}: {
  typeName: string;
  description: string;
  id: number;
  setReload: any;
  editHandler: any;
}) {
  const [deleteProjectType] = useFetchApi();
  //   const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const deleteHandler = () => {
    toast.dismissAll();
    toast(
      (t) => (
        <span>
          Are you sure you want to delete <b>{typeName}</b>?{/* <br/> */}
          <button
            className="ml-4 bg-green-500 py-1 px-3 rounded-2xl text-white hover:shadow-lg transition-all duration-300 hover:bg-green-600"
            onClick={() => {
              toast.dismiss(t.id);
              let toastId = toast.loading(`Deleting ${typeName}...`);
              deleteProjectType(`/api/CLProjectType/id?projectTypeId=${id}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${CookieService.get("token")}`,
                },
              }).then((res) => {
                console.log(res);
                toast.dismiss(toastId);
                if (!res?.isError && res) {
                  console.log("Delete response:", res);
                  toast.success(`${typeName} deleted successfully`, {
                    duration: 1500,
                  });
                  setReload((e: any) => !e);
                } else {
                  console.log(res);
                  toast.error(res?.message || `Failed to delete ${typeName}`, {
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
    <div className="w-full flex flex-row p-4 bg-indigo-100 rounded-2xl justify-between items-center">
      <div>
        <div className="font-medium">{typeName}</div>
        <div className="flex flex-row gap-2 text-gray-800">
          Description:
          <label className="text-gray-600">
            {description || "No Description"}
          </label>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <button
          //   disabled={buttonDisabled}
          onClick={() => editHandler({ id, typeName, description })}
          className="bg-indigo-500 px-4 py-1.5  rounded-lg text-white duration-300 transition-colors hover:bg-indigo-600"
        >
          Edit
        </button>
        <button
          //   disabled={buttonDisabled}
          className="bg-red-500 px-2 py-1.5  rounded-lg text-white duration-300 transition-colors hover:bg-red-600"
          onClick={deleteHandler}
        >
          delete
        </button>
      </div>
    </div>
  );
}

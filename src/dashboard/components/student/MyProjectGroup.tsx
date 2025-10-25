import { useEffect, useState } from "react";
import Card from "../../../components/ui/Card";
import Dropdown from "../../../components/ui/Dropdown";
import toast, { Toaster } from "react-hot-toast";
import { useFetchApi } from "../../../hooks/useFetchApi";
import { CookieService } from "../../../utils/cookies";
import Loading from "../../../components/ui/Loading";

const MyProjectGroup = () => {
  // const projectsType = ["Major Project", "Mini Project", "Research Project"];
  const studentsList = ["Student 1", "Student 2", "Student 3"];
  const [selectedType, setSelectedType] = useState("");
  const [selectedProject, ] = useState("");
  const [callApi, pending, response] = useFetchApi();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    callApi("/api/CLProjectType/getall", {
      headers: { Authorization: `Bearer ${CookieService.get("token")}` },
    });
  }, []);

  useEffect(() => {
    if (response?.data) {
      setProjects(response.data);
    }
  }, [response]);

  // const projects = [
  //   {
  //     type: "Major Project",
  //     names: [
  //       "AI-Powered Disease Prediction System",
  //       "Smart City Traffic Management Using IoT",
  //       "Blockchain-Based Voting Application",
  //       "Cloud-Based Inventory Management System",
  //       "Autonomous Drone Navigation System",
  //     ],
  //   },
  //   {
  //     type: "Mini Project",
  //     names: [
  //       "Student Attendance Tracker",
  //       "Weather Forecast Dashboard",
  //       "Expense Management App",
  //       "Chat Application Using Socket.io",
  //       "Portfolio Website with React",
  //     ],
  //   },
  //   {
  //     type: "Research Project",
  //     names: [
  //       "Deep Learning for Image Captioning",
  //       "Quantum Computing Simulation Analysis",
  //       "Ethical AI and Data Privacy Study",
  //       "Renewable Energy Optimization Model",
  //       "5G Network Security Evaluation",
  //     ],
  //   },
  // ];

  // if (projects) {
  //   const flattenedProjects = projects.flatMap((project) =>
  //     project.type === selectedType ? project.names : []
  //   );
  // }

  if (pending) {
    return <Loading width={60} height={60} />;
  }

  const newStudentHandler = (studentname: string) => {
    toast(
      (t) => (
        <span>
          Are you sure you want to invite <b>{studentname}</b> to your project
          {/* <br/> */}
          <button
            className="ml-4 bg-green-500 py-1 px-3 rounded-2xl text-white hover:shadow-lg transition-all duration-300 hover:bg-green-600"
            onClick={() => {
              toast.dismiss(t.id);
              toast.success(`Sent invitation to ${studentname}`);
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

    console.log("Adding new student: ", studentname);
  };

  const ProjectTypeList = projects.map(
    (project: any) => project.projectTypeName
  );

  return (
    <div className="h-full w-full">
      <Toaster position="top-right" />
      <div className="flex items-center justify-center text-2xl p-4 font-bold">
        Your Team
      </div>
      <div className="grid gap-y-8 2xl:grid-cols-2 p-4 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols -1 sm:grid-cols-1 xs:grid-cols-1 place-items-center">
        <div className="w-full items-center flex justify-center gap-1">
          {" "}
          Project Type:
          <Dropdown
            data={ProjectTypeList}
            selected={selectedType}
            setSelected={setSelectedType}
            disabled={false}
          />
        </div>
        {/* <div className="w-full items-center flex justify-center gap-1">
          {" "}
          Select Your Project:
          <Dropdown
            projects={flattenedProjects}
            selected={selectedProject}
            setSelected={setSelectedProject}
            disabled={selectedType === "" ? true : false}
            errorMessage="Please select project type first!"
          />
        </div> */}
        <div className="w-full items-center flex justify-center gap-1">
          {" "}
          Add Team Member:
          <Dropdown
            data={studentsList}
            selected={""}
            setSelected={newStudentHandler}
            disabled={selectedProject === "" ? true : false}
            addNewOption={newStudentHandler}
            errorMessage={"Please select a project first"}
          />
        </div>
      </div>
      <div className="grid gap-y-8 2xl:grid-cols-4 p-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 place-items-center">
        <Card
          data={{
            role: "Student",
            degree: "B.Sc(Hons)CS",
            email: "jhondow@gamil.com",
            phone: "1234567890",
          }}
        />
        <Card
          data={{
            role: "Student",
            degree: "B.Sc(Hons)CS",
            email: "jhondow@gamil.com",
            phone: "1234567890",
          }}
        />
        <Card
          data={{
            role: "Student",
            degree: "B.Sc(Hons)CS",
            email: "jhondow@gamil.com",
            phone: "1234567890",
          }}
        />
        <Card
          data={{
            role: "Student",
            degree: "B.Sc(Hons)CS",
            email: "jhondow@gamil.com",
            phone: "1234567890",
          }}
        />
        <Card
          data={{
            role: "Student",
            degree: "B.Sc(Hons)CS",
            email: "jhondow@gamil.com",
            phone: "1234567890",
          }}
        />
      </div>
      <PendingInvitations />
    </div>
  );
};

function PendingInvitations() {
  return (
    <div className="w-full">
      <div className="text-2xl p-4 font-bold">
        <h2 className="text-center h-full">Pending Invitations</h2>
      </div>
      <div className="flex flex-col items-center justify-start p-4 font-medium gap-4">
        <div className="bg-gray-50 p-4 grid gap-6 rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer grid-cols-1 items-center hover:bg-gray-100 duration-300 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 place-items-center">
          <img
            src={"https://avatar.iran.liara.run/username?username=J+D"}
            alt=""
            className="rounded-2xl h-12 w-12"
          />
          <div className="flex flex-col leading-4">
            <label className="font-md flex">John Doe</label>
            <label className="text-gray-500">B.Sc.(Hons)CS</label>
          </div>
          <div className="flex flex-col leading-4 items-center">
            <label className="font-md flex">Project:</label>
            <label className="text-gray-500">
              AI-Powered Disease Prediction System
            </label>
          </div>
          <div className="flex flex-row gap-5 w-full items-center justify-center md:col-span-3 lg:col-span-1">
            <div className="flex flex-col leading-4 items-center">
              <button className="bg-green-500 py-3 px-5 rounded-2xl text-white hover:shadow-lg transition-all duration-300 hover:bg-green-600">
                Accept
              </button>
            </div>
            <div className="flex flex-col leading-4 items-center ">
              <button className="bg-red-500 py-3 px-5 rounded-2xl text-white hover:shadow-lg transition-all duration-300 hover:bg-red-600">
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProjectGroup;

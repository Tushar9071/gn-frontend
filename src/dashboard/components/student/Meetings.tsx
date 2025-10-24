const Meetings = () => {
  return (
    <div className="flex flex-col w-full h-full p-4 gap-4">
      {/* <div className="text-center h-full flex w-full justify-center items-center text-2xl">
        No upcoming meetings
      </div> */}
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-lg font-semibold bg-indigo-100 p-4 rounded text-indigo-800">
          Upcoming Meetings
        </h2>
        <MeetingCard
          faculty="Dr. Smith"
          date="27-10-2025"
          location="Room 101"
          isUpcoming={true}
        />
        <MeetingCard
          faculty="Dr. Smith"
          date="27-10-2025"
          location="Room 101"
          isUpcoming={true}
        />
        <MeetingCard
          faculty="Dr. Smith"
          date="27-10-2025"
          location="Room 101"
          isUpcoming={true}
        />
        <MeetingCard
          faculty="Dr. Smith"
          date="27-10-2025"
          location="Room 101"
          isUpcoming={true}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-lg font-semibold bg-red-100 p-4 rounded text-red-800">
          Completed Meetings
        </h2>
        <MeetingCard
          faculty="Dr. Smith"
          date="27-10-2025"
          location="Room 101"
          isUpcoming={false}
        />
        <MeetingCard
          faculty="Dr. Smith"
          date="27-10-2025"
          location="Room 101"
          isUpcoming={false}
        />
      </div>
    </div>
  );
};

export default Meetings;

function MeetingCard({
  faculty,
  date,
  location,
  isUpcoming,
}: {
  faculty: string;
  date: string;
  location: string;
  isUpcoming: boolean;
}) {
  return (
    <div className="w-full border border-gray-300 rounded-md p-4 flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 items-center justify-center place-items-center">
        <div className="flex flex-row gap-4 items-center">
          <img
            src={"https://avatar.iran.liara.run/username?username=" + faculty}
            alt=""
            className="rounded-2xl h-12 w-12"
          />
          <div className="leading-4">
            <h2>Faculty:</h2>
            <label className="font-bold">{faculty}</label>
          </div>
        </div>
        <div className="leading-4">
          <h2>Data:</h2>
          <label className="font-bold">{date}</label>
        </div>
        <div className="leading-4">
          <h2>Location:</h2>
          <label className="font-bold">{location}</label>
        </div>
        <div className="flex justify-end">
          {isUpcoming && (
            <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-1.5 rounded">
              Upcoming
            </span>
          )}
          {!isUpcoming && (
            <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-1.5 rounded">
              Meeting Ended
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

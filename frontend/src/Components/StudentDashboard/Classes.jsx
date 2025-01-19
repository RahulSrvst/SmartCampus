const Classes = () => {
  const classes = [
    { subject: "English", time: "09:00 - 09:45 AM", status: "Completed" },
    { subject: "Chemistry", time: "10:45 - 11:30 AM", status: "Completed" },
    { subject: "Physics", time: "11:30 - 12:15 PM", status: "Inprogress" },
  ];

  return (
    <div className="bg-white  rounded-lg shadow-lg">
      <h2 className="text-lg font-normal border-b p-4 mb-4">Today's Classes</h2>
      <div className="px-4 pb-4" >
      {classes.map((cls, idx) => (
        <div key={idx} className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-medium">{cls.subject}</h3>
            <p className="text-sm text-blue-800">{cls.time}</p>
          </div>
          <span
            className={`px-3 py-1 rounded text-sm ${
              cls.status === "Completed"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {cls.status}
          </span>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Classes;

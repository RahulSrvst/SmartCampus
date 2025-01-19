const Exams = () => {
  const exams = [
    {
      quarter: "1st Quarterly",
      subject: "Mathematics",
      date: "06 May 2024",
      room: "15",
    },
  ];

  return (
    <div className="bg-white  rounded-lg shadow-lg">
      <h2 className="text-lg font-normal border-b p-4  mb-4">Exams</h2>
      <div className="px-4 pb-7" >
      {exams.map((exam, idx) => (
        <div key={idx} className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-medium">{exam.quarter}</h3>
            <p className="text-sm text-gray-600">{exam.subject}</p>
            <p className="text-sm text-gray-600">{exam.date}</p>
          </div>
          <p className="text-sm text-gray-600">Room: {exam.room}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Exams;

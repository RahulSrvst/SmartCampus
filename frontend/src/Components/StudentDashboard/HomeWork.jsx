import React from "react";

const HomeWorks = () => {
  const assignments = [
    {
      subject: "Physics",
      title: "Write about Theory of Pendulum",
      teacher: "Aaron",
      dueDate: "16 Jun 2024",
      progress: 90,
      color: "text-blue-500",
    },
    {
      subject: "Chemistry",
      title: "Chemistry - Change of Elements",
      teacher: "Hellana",
      dueDate: "16 Jun 2024",
      progress: 65,
      color: "text-green-500",
    },
    {
      subject: "Maths",
      title: "Maths - Problems to Solve Page 21",
      teacher: "Morgan",
      dueDate: "21 Jun 2024",
      progress: 30,
      color: "text-red-500",
    },
    {
      subject: "English",
      title: "English - Vocabulary Introduction",
      teacher: "Daniel Josua",
      dueDate: "21 Jun 2024",
      progress: 10,
      color: "text-indigo-500",
    },
  ];

  return (
    <div className="bg-white  rounded-lg shadow-lg pb-8">
      <div className="flex items-center p-4 border-b justify-between mb-4 pb-3">
        <h2 className="text-lg font-normal">Home Works</h2>
        <button className="text-sm text-gray-500">All Subject ▼</button>
      </div>
      <ul className="px-5" >
        {assignments.map((work, idx) => (
          <li key={idx} className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center bg-opacity-20 ${work.color} bg-blue-100`}
              >
                <span className={`${work.color} font-normal`}>{work.subject[0]}</span>
              </div>
              <div className="ml-4">
                <h3 className="font-normal text-base">{work.title}</h3>
                <p className="text-sm text-gray-500">
                  {work.teacher} &nbsp;|&nbsp; Due by: {work.dueDate}
                </p>
              </div>
            </div>
            <div className="relative w-12 h-12">
              <svg className="absolute inset-0" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3.8"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={work.color.replace("text-", "#")}
                  strokeWidth="3.8"
                  strokeDasharray={`${work.progress}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-semibold">{work.progress}%</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeWorks;

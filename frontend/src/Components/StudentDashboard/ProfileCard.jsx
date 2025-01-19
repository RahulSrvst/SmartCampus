import { baseURL } from "../Configs/axios";
import bg from "../../Assests/gradient_2.jpg";

const ProfileCard = ({StudentData}) => {
  return (
    <div className=" text-white rounded-lg p-6 shadow-lg"
     style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center">
        <img
          src={`${baseURL}${StudentData?.[0]?.student_image}`}
          alt="Profile"
          className="w-28 h-20  border-4 border-white"
        />
        <div className="ml-4">
          <h2 className="text-xl font-bold">{StudentData?.[0]?.student_firstname}{" "}{StudentData?.[0]?.Student_lastname}</h2>
          <p>Course: {StudentData?.[0]?.course_name}</p>
          <p>Batch: {StudentData?.[0]?.batch_name}</p>
          <p> Roll No: {StudentData?.[0]?.rollnumber || "Not Listed" }</p>
        </div>
      </div>
      {/* <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-100">
        Edit Profile
      </button> */}
    </div>
  );
};

export default ProfileCard;

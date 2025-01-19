import React from "react";

const PerformanceWidget = ({ performance }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <h3 className="font-bold text-xl mb-2">Performance Metrics</h3>
      <div className="flex space-x-80" >
      <p>Completed Tasks: {performance.completedTasks}</p>
      <p>Rating: {performance.rating} ⭐</p>
      <p>Goals Achieved: {performance.goalsAchieved}%</p>
      </div>
    </div>
  );
};

export default PerformanceWidget;

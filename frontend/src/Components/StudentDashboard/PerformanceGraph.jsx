import ReactApexChart from "react-apexcharts";

const PerformanceGraph = () => {
  const chartOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Quarter 1", "Quarter 2", "Half yearly", "Model", "Final"],
    },
    colors: ["#007BFF", "#00C8FF"],
    legend: {
      position: "top",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
      },
    },
  };

  const series = [
    { name: "Avg. Exam Score", data: [86, 82, 76, 70, 84] },
    { name: "Avg. Attendance", data: [74, 72, 68, 64, 80] },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="flex items-center p-4 border-b justify-between mb-4">
        <h2 className="text-lg font-normal">Performance</h2>
        <button className="text-sm text-gray-500">2024 - 2025 ▼</button>
      </div>
      <ReactApexChart
        options={chartOptions}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default PerformanceGraph;

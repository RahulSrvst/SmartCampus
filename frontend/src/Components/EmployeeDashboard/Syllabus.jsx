import React from "react";
import Chart from "react-apexcharts";

const SyllabusChart = () => {
  const chartOptions = {
    series: [95, 5],
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Completed", "Pending"],
      colors: ["#00008B", "#4169E1"],
      legend: {
        show: true,
        position: "left",
        labels: {
          colors: "#000",
        },
        fontSize: "12px",
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val.toFixed(0)}%`,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "60%",
          },
        },
      },
      title: {
        text: "Syllabus Progress",
        align: "left",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
          color: "#333",
          padding: "10px 0",
        },
      },
    },
  };

  return (
    <div className="bg-white  rounded-lg shadow-lg w-[100%] h-auto">
      <Chart
        options={chartOptions.options}
        series={chartOptions.series}
        type="donut"
        width="100%"
        height="105px"
        className="p-4"
      />
    </div>
  );
};

export default SyllabusChart;

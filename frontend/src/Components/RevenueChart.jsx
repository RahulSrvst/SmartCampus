import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function RevenueChart() {
  const currentSatisfaction = 35;
  const don = 61;
  const In = 87;
  const Ex = 42;
  const [state] = useState({
    series: [
      {
        name: "Fees",
        type: "column",
        data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
      },
      {
        name: "Donation",
        type: "line",
        data: [45, 55, 41, 67, 22, 43, 21, 35, 22, 42, 22, 16],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      stroke: {
        width: [0, 3],
        colors: ["#FFA500"],
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      labels: [
        "01 Jan",
        "",
        "03 Jan",
        "",
        "05 Jan",
        "",
        "07 Jan",
        "",
        "09 Jan",
        "",
        "11 Jan",
        "",
      ],
      xaxis: {
        type: "category",
        labels: {
          show: true,
          rotate: -45,
        },
      },
      yaxis: [
        {
          title: {
            text: "Fees",
          },
          labels: {
            style: {
              colors: "black",
            },
          },
        },
        {
          opposite: true,
          title: {
            text: "Donation",
          },
          labels: {
            style: {
              colors: "black",
            },
          },
        },
      ],
      colors: ["#1E90FF", "#FFA500"],
      legend: {
        position: "top",
        horizontalAlign: "center",
      },
      plotOptions: {
        bar: {
          columnWidth: "45%",
          borderRadius: 0,
          dataLabels: {
            position: "top",
          },
        },
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            xaxis: {
              tickAmount: 11,
            },
          },
        },
        {
          breakpoint: 640,
          options: {
            xaxis: {
              tickAmount: 3,
            },
          },
        },
        {
          breakpoint: 480,
          options: {
            xaxis: {
              tickAmount: 2,
            },
          },
        },
      ],
    },
  });

  return (
    <div className="" >
     <div className="bg-white rounded-t-2xl shadow-md">
  <div className="py-5 rounded-t-2xl border-b bg-white">
    <span className="text-lg font-normal text-slate-800 pl-5">
      Revenue Report
    </span>
  </div>
  </div>
      <div id="chart" className="bg-white">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="line"
          height={350}
        />
      </div>
      <div className="flex p-5 border-t gap-5 bg-white rounded-b-lg shadow-md mb-5">
        <div className="xl:flex grid grid-cols-1 lg:grid-cols-2 xl:gap-0 gap-4 xl:w-[960px] lg:w-[1080px] md:w-[920px] w-full max-w-full">
          <div className="w-full mx-2">
            <div className="text-md font-normal">
              <div className="flex justify-between">
                <span>Fees</span> <span>35%</span>
              </div>
            </div>
            <div className="relative pt-2 w-full">
              <div className="overflow-hidden h-1 text-xs flex rounded bg-slate-200">
                <div
                  style={{ width: `${currentSatisfaction}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-purple-600"
                />
              </div>
              <span className="text-xs">COMPARED TO LAST YEAR</span>
            </div>
          </div>

          <div className="w-full mx-2">
            <div className="text-md font-normal">
              <div className="flex justify-between">
                <span>Donation</span> <span>61%</span>
              </div>
            </div>
            <div className="relative pt-2 w-full">
              <div className="overflow-hidden h-1 text-xs flex rounded bg-slate-200">
                <div
                  style={{ width: `${don}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-yellow-500"
                />
              </div>
              <span className="text-xs">COMPARED TO LAST YEAR</span>
            </div>
          </div>

          <div className="w-full mx-2">
            <div className="text-md font-normal">
              <div className="flex justify-between">
                <span>Income</span> <span>87%</span>
              </div>
            </div>
            <div className="relative pt-2 w-full">
              <div className="overflow-hidden h-1 text-xs flex rounded bg-slate-200">
                <div
                  style={{ width: `${In}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-green-700"
                />
              </div>
              <span className="text-xs">COMPARED TO LAST YEAR</span>
            </div>
          </div>

          <div className="w-full mx-2">
            <div className="text-md font-normal">
              <div className="flex justify-between">
                <span>Expenses</span> <span>42%</span>
              </div>
            </div>
            <div className="relative pt-2 w-full">
              <div className="overflow-hidden h-1 text-xs flex rounded bg-slate-200">
                <div
                  style={{ width: `${Ex}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-red-700"
                />
              </div>
              <span className="text-xs">COMPARED TO LAST YEAR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenueChart;

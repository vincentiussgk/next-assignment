import { fetcher } from "@/lib/fetcher";
import { IPurchase } from "@/types/dataTypes";
import { CChart } from "@coreui/react-chartjs";
import React from "react";
import useSWR from "swr";

const Chart = () => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const { data, error, isLoading } = useSWR(`purchases`, fetcher, {
    revalidateOnMount: true,
  });

  const generateChartData = (data: IPurchase[]) => {
    const profitData = Array(12).fill(0);

    for (let i = 1; i <= 12; i++) {
      for (const dataItem of data) {
        if (new Date(dataItem.purchaseDate).getMonth() === i - 1) {
          profitData[i - 1] = profitData[i - 1] + dataItem.paymentTotal;
        }
      }
    }

    const totalProfit = profitData.reduce((sum, value) => sum + value, 0);

    return {
      profitData,
      totalProfit,
    };
  };

  if (!data || isLoading) return <div>Loading...</div>;

  return (
    <CChart
      className="text-black w-full h-full"
      type="line"
      data={{
        labels: labels,
        datasets: [
          {
            label: "Total Sales, 2023",
            backgroundColor: "rgba(220, 220, 220, 0.2)",
            borderColor: "rgba(220, 220, 220, 1)",
            pointBackgroundColor: "rgba(225, 0, 0, 1)",
            pointBorderColor: "#fff",
            data: generateChartData(data).profitData,
          },
        ],
      }}
      options={{
        plugins: {
          legend: {
            labels: {
              //   color: getStyle("--cui-body-color"),
              color: "#000",
            },
          },
        },
        scales: {
          x: {
            grid: {
              //   color: getStyle("--cui-border-color-translucent"),
              color: "#000",
            },
            ticks: {
              color: "#000",
            },
          },
          y: {
            grid: {
              //   color: getStyle("--cui-border-color-translucent"),
              color: "#000",
            },
            ticks: {
              //   color: getStyle("--cui-body-color"),
              color: "#000",
            },
          },
        },
      }}
    />
  );
};

export default Chart;

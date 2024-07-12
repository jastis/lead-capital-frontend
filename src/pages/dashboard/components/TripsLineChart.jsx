import { Chart } from "chart.js";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
import { Flex, Text } from "@chakra-ui/react";

const TripsLineChart = ({ data }) => {
  const {
    totalTripsFromLastThreeMonths = {},
    deliveredTripsFromLastThreeMonths = {},
  } = data || {};
  // console.log(data, "tripsAnalytics");
  if (!data || data < 0 || typeof data !== "object") {
    return (
      <Flex justify={"center"} align={"center"} h={"400px"} bg="#ECECEE">
        <Text fontWeight={"semibold"} fontSize={"22px"}>
          No data available
        </Text>
      </Flex>
    );
  }

  const labels = Object?.keys(totalTripsFromLastThreeMonths);
  const totalTripsData = labels?.map(
    (date) => totalTripsFromLastThreeMonths?.[date]
  );
  const deliveredTripsData = Object?.keys(
    deliveredTripsFromLastThreeMonths
  )?.map((date) => deliveredTripsFromLastThreeMonths?.[date]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Total Trips",
        data: totalTripsData,
        borderColor: "#FEE7E6",
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: "pink",
        pointBorderWidth: 2,
        tension: 0.4,
        cubicInterpolationMode: "monotone",
      },
      {
        label: "Trips Delivered",
        data: deliveredTripsData,
        borderColor: "#F6E6C0",
        fill: false,
        pointRadius: 5,
        pointBackgroundColor: "#DFA113",
        pointBorderWidth: 2,
        tension: 0.4,
        cubicInterpolationMode: "monotone",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        title: {
          display: false,
        },
      },
      y: {
        display: true,
        title: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: Math.max(...totalTripsData, ...deliveredTripsData) + 10,
        ticks: {
          stepSize: 25,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <Line style={{ height: "300px" }} data={chartData} options={options} />
    </div>
  );
};

export default TripsLineChart;

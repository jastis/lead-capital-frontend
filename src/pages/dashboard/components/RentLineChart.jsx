import { Flex, Text } from "@chakra-ui/react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

const RentLineChart = ({ data }) => {
  const { totalRemainingBalance = {} } = data || {};
  if (!data || data < 0 || typeof data !== "object") {
    return (
      <Flex justify={"center"} align={"center"} h={"400px"} bg="#ECECEE">
        <Text fontWeight={"semibold"} fontSize={"22px"}>
          No data available
        </Text>
      </Flex>
    );
  }
  const colors = ["#FEE7E6", "#FFF9DF", "#ECFDF1"];
  // const pointColors = ["pink", "#FED93D", "#3C9910"];
  const months = Object?.keys(totalRemainingBalance || {});

  const datasets = Object?.keys(data)?.map((label, index) => ({
    label: label?.replace("total", ""),
    data: months?.map((month) => data?.[label]?.[month]),
    // borderColor: getRandomColor(),
    // borderColor: colors.map((colors) => colors),
    borderColor: colors?.[index],
    fill: false,
    pointRadius: 5,
    // pointBackgroundColor: getRandomColor(),
    // pointBackgroundColor: pointColors.map((pointColors) => pointColors),
    pointBackgroundColor: colors?.[index],
    pointBorderWidth: 2,
    tension: 0.4,
    cubicInterpolationMode: "monotone",
  }));

  const chartData = {
    labels: months,
    datasets: datasets,
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
        suggestedMax: Math.max(
          ...datasets?.map((dataset) => Math.max(...dataset?.data))
        ),
        ticks: {
          stepSize: 20000,
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

export default RentLineChart;

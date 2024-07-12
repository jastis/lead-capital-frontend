import { Box, Flex } from "@chakra-ui/react";
import { AllCards } from "./components/AllCards";
import { TripsCard } from "./components/TripsCard";
import { _COLORS } from "../../constant";
import { RentCard } from "./components/RentCard";
import { useGetState } from "../../GlobalStateContext/useGetState";
import { useQuery } from "@tanstack/react-query";
import { getCards, getDashboard, getIncomeChart, getTripsChart } from "./sevices/dashboard";
import FullPageLoader from "../../components/FullPageLoader";

function Dashboard() {
  const { data: dashboardData = [], isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });
  const { data: cards = [] } = useQuery({
    queryKey: ["cards"],
    queryFn: getCards,
  });
  const { data: incomeChart = [] } = useQuery({
    queryKey: ["incomeChart"],
    queryFn: getIncomeChart,
  });
  const { data: tripsChart = [] } = useQuery({
    queryKey: ["tripsChart"],
    queryFn: getTripsChart,
  });

  const { state } = useGetState();
  console.log("useGetState", state);
  return isLoading ? (
    <FullPageLoader />
  ) : (
    <Box>
      <Flex
        justify={"space-between"}
        direction={["column", "column", "column", "row"]}
        gap={["20px", "20px", "20px", "0px"]}
      >
        <AllCards data={dashboardData} />
        <Box
          w={["100%", "100%", "100%", "55%"]}
          bg={_COLORS.white}
          rounded={"md"}
          shadow={"sm"}
          p={"20px"}
        >
          <TripsCard data={tripsChart} />
        </Box>
      </Flex>
      <Box
        w={"100%"}
        bg={_COLORS.white}
        rounded={"md"}
        shadow={"sm"}
        p={"20px"}
        mt={"25px"}
      >
        <RentCard data={incomeChart} />
      </Box>
    </Box>
  );
}

export default Dashboard;

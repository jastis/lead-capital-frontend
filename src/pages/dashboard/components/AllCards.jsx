/* eslint-disable react/prop-types */
import { Box, Flex } from "@chakra-ui/react";
import { TbCurrencyNaira } from "react-icons/tb";
import { BsTruck } from "react-icons/bs";
import { _COLORS } from "../../../constant";
import { Cards } from "./Cards";
import { getDrivers } from "../../transport-control/service/driver";
import { useQuery } from "@tanstack/react-query";

export const AllCards = ({ data }) => {
  console.log(data, "ddd");
  const { data: drivers = [], isLoading } = useQuery({
    queryKey: ["drivers"],
    queryFn: getDrivers,
  });
  return (
    <Box w={["100%", "100%", "100%", "42%"]}>
      <Cards
        title="Total Income"
        amount={data?.totalIncome?.toLocaleString() || 0}
        bg={_COLORS.white}
        icon={<TbCurrencyNaira size={"1.4rem"} color={_COLORS.white} />}
        iconBg={_COLORS.brand}
        iconColor={_COLORS.white}
        NGN={"NGN"}
        width={"100%"}
      />
      <Flex justify={"space-between"} mt={"10px"} w={"100%"}>
        <Cards
          title="Pending Income"
          amount={data?.totalBalanceReamininng?.toLocaleString() || 0}
          bg={_COLORS.ligherPink}
          icon={<TbCurrencyNaira size={"1.4rem"} />}
          iconBg={_COLORS.lightPink}
          width={"49%"}
          NGN={"NGN"}
        />
        <Cards
          title="Paid Advance"
          amount={data?.totalPaidDeposit?.toLocaleString() || 0}
          bg={_COLORS.lightYellow}
          icon={<TbCurrencyNaira size={"1.4rem"} />}
          iconBg={_COLORS.yellow}
          width={"49%"}
          NGN={"NGN"}
        />
      </Flex>
      {/* <Flex justify={"space-between"} mt={"15px"} w={"100%"}>
        <Cards
          title="Recievable Advance"
          amount="not done"
          bg={_COLORS.lighterGreen}
          icon={<TbCurrencyNaira size={"1.4rem"} />}
          iconBg={_COLORS.lightGreen}
          width={"49%"}
        />
        <Cards
          title="Declined Advance"
          amount="not done"
          bg={_COLORS.ligherPink}
          icon={<TbCurrencyNaira size={"1.4rem"} />}
          iconBg={_COLORS.lightPink}
          width={"49%"}
        />
      </Flex> */}
      <Flex justify={"space-between"} mt={"15px"} w={"100%"}>
        <Cards
          title="Delivered Trips"
          amount={data?.totalDeliveredTrips?.toLocaleString() || 0}
          bg={_COLORS.lightOrange}
          icon={<BsTruck size={"1rem"} />}
          iconBg={_COLORS.orange}
          width={"49%"}
        />
        <Cards
          title="Total Trips"
          amount={data?.totalTrips?.toLocaleString() || 0}
          bg={_COLORS.lighterGreen}
          icon={<BsTruck size={"1rem"} />}
          iconBg={_COLORS.lightGreen}
          width={"49%"}
        />
      </Flex>
      <Flex justify={"space-between"} mt={"15px"} w={"100%"}>
        <Cards
          title="Flag Trips"
          amount={data?.totalFlaggedTrips?.toLocaleString() || 0}
          bg={_COLORS.lightYellow}
          icon={<BsTruck size={"1rem"} />}
          iconBg={_COLORS.yellow}
          width={"49%"}
        />
        <Cards
          title="Truck Drivers"
          amount={drivers?.length || 0}
          bg={_COLORS.ligherPink}
          icon={<BsTruck size={"1rem"} />}
          iconBg={_COLORS.lightPink}
          width={"49%"}
        />
      </Flex>
    </Box>
  );
};

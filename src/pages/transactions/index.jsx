/* eslint-disable react/jsx-key */
import { Flex, Text, Tr } from "@chakra-ui/react";
import CustomTable, { DATA_ROWS } from "../../components/CustomTable";
import OverviewCard from "../../components/OverviewCard";
import { _COLORS } from "../../constant";
import Filter from "../../components/Filter";
import { useState } from "react";
import { getTransactions } from "./services/transaction";
import { useQuery } from "@tanstack/react-query";
import { useGetState } from "../../GlobalStateContext/useGetState";
import { formatToNaira } from "../../utils/numberFormat";
import FullPageLoader from "../../components/FullPageLoader";
import { getDashboard } from "../dashboard/sevices/dashboard";

function Transactions() {
  const { state } = useGetState();
  const partnerId = state?._id;

  const [skip, setSkip] = useState(0);

  const { data: dashboardData = [], isLoading } = useQuery({
    queryFn: getDashboard,
    queryKey: ["dashboard"],
  });

  const { data: transactionData = [] } = useQuery({
    queryFn: () => getTransactions(partnerId, skip),
    queryKey: ["transaction", { partnerId }, skip],
  });
  const [filterBy, setFilterBy] = useState(null);

  console.log(transactionData, "@@@@@@@@@");
  return isLoading ? (
    <FullPageLoader />
  ) : (
    <>
      {console.log(transactionData, ">>>")}
      <Filter
        searchPlaceholder="Search Company Name"
        searchFilter={"partner.name "}
        filters={["paymentStatus"]}
        filterBy={setFilterBy}
        info={transactionData}
      />
      <Flex
        flexDir={["column", "row"]}
        alignItems="center"
        gap={["5px", "20px"]}
      >
        <OverviewCard
          icon={"₦"}
          title={"Total Earnings"}
          value={`NGN ${dashboardData?.totalIncome?.toLocaleString() || "N/A"}`}
        />
        <OverviewCard
          // icon={"₦"}
          title={"Total Trips"}
          value={dashboardData?.totalTrips?.toLocaleString() || "N/A"}
          color={"#FED93D"}
        />
      </Flex>
      <CustomTable head={r}>
        {transactionData
          ?.filter((data) => CustomTable.filterFunc(data, filterBy))
          .map((data) => (
            <Tr>
              {console.log(data, "{{}}")}
              <CustomTable.Td>
                <Text {...CustomTable.style}>
                  {data?.tripId?.tripId || "N/A"}
                </Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>
                  {data?.partner?.name || "N/A"}
                </Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>
                  {formatToNaira(data?.totalAmountDue || "N/A")}
                </Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>
                  {formatToNaira(data?.paidDeposit || "N/A")}
                </Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>
                  {formatToNaira(data?.remainingBalance || "N/A")}
                </Text>
              </CustomTable.Td>

              <CustomTable.Td>
                <Text
                  color={
                    data?.status?.toLowerCase() === "completed"
                      ? _COLORS.green
                      : _COLORS.red
                  }
                >
                  {data?.paymentStatus || "N/A"}
                </Text>
              </CustomTable.Td>

              <CustomTable.Td>
                <CustomTable.ActionType
                  type={3}
                  data={data}
                  dashboardData={dashboardData}
                />
              </CustomTable.Td>
            </Tr>
          ))}
      </CustomTable>
      {!filterBy && (
        <CustomTable.Pagination
          length={transactionData?.length}
          updateTable={(page) => {
            setSkip(page * DATA_ROWS.LIMIT);
          }}
        />
      )}
    </>
  );
}

export default Transactions;

const r = [
  "Trip ID",
  "Name of Company",
  "Total Amount (₦)",
  "Deposit Amount(₦)",
  "Balance(₦)",
  "Status",
  "Action",
];

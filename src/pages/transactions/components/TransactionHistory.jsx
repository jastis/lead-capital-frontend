import { Flex, Text, Tr } from "@chakra-ui/react";
import React, { useState } from "react";
import { useGetState } from "../../../GlobalStateContext/useGetState";
import axiosInstance from "../../../service/api";
import { useQuery } from "@tanstack/react-query";
import Filter from "../../../components/Filter";
import CustomTable, { DATA_ROWS } from "../../../components/CustomTable";
import dayjs from "dayjs";

export default function TransactionHistory() {
  const { state } = useGetState();
  const partnerId = state?._id;
  const [skip, setSkip] = useState(0);
  const [filterBy, setFilterBy] = useState(null);

  const { data } = useQuery({
    queryFn: () =>
      axiosInstance
        .get(
          `payout?partnerId=${partnerId}&limit=${DATA_ROWS.LIMIT}${
            skip ? `&skip=${skip}` : ""
          }`
        )
        .then((res) => {
          console.log(res);
          return res.data;
        })
        .catch((er) => console.log(er)),
    queryKey: ["transaction-history"],
  });

  console.log(data, "trans", partnerId);
  return (
    <>
      <Filter
        searchPlaceholder="Search Company Name"
        searchFilter={"partner.name "}
        filters={["paymentStatus"]}
        filterBy={setFilterBy}
        info={data?.data}
      />
      {console.log(data, "::::")}
      <CustomTable head={head}>
        {data?.data
          ?.filter((data) => CustomTable.filterFunc(data, filterBy))
          .map((data) => (
            <Tr>
              {console.log(data, "{{}}")}
              <CustomTable.Td>
                <Text {...CustomTable.style}>
                  {data?.amount?.toLocaleString() || "N/A"}
                </Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>
                  {dayjs(data?.createdAt).format("DD MMM YYYY") || "N/A"}
                </Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.approvalStatus}</Text>
              </CustomTable.Td>
            </Tr>
          ))}
      </CustomTable>
    </>
  );
}

const head = ["Amount", "Date", "Status"];

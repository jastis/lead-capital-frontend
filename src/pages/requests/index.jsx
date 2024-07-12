/* eslint-disable react/jsx-key */
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tr,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CustomTable, { DATA_ROWS } from "../../components/CustomTable";
import { _COLORS } from "../../constant";
import { getAcceptedRequest } from "./services/request";
import { getAllRequest } from "./services/request";
import { useQuery } from "@tanstack/react-query";
import FullPageLoader from "../../components/FullPageLoader";
import dayjs from "dayjs";
import Filter from "../../components/Filter";
import { useState } from "react";
import axiosInstance, { AUTH_ROUTES } from "../../service/api";
import { useGetState } from "../../GlobalStateContext/useGetState";

function Requests() {
  const [filterBy, setFilterBy] = useState(null);

  const [allReqSkip, setAllReqSkip] = useState(0);
  const [acceptedReqSkip, setAcceptedReqSkip] = useState(0);

  const { state } = useGetState();
  const partnerId = state?._id;

  const live = true;
  const navigate = useNavigate();

  const { data: requestData = [], isLoading } = useQuery({
    queryFn: () =>
      axiosInstance.get(
        AUTH_ROUTES.GET_ALL_REQUEST(live, allReqSkip)
      ),
    queryKey: ["requests", allReqSkip],
  });

  const { isLoading: isLoadingAcceptedData, data: accepted } = useQuery({
    queryFn: () =>
      axiosInstance.get(
        AUTH_ROUTES.ACCEPTED_REQUEST(acceptedReqSkip, partnerId)
      ),
    queryKey: ["acceptedRequests", acceptedReqSkip],
  });

  const { data } = useQuery({
    queryFn: () => axiosInstance.get(`/request/pre-assign/${partnerId}`),
    queryKey: ["acceptedRequests", acceptedReqSkip],
  });

  const acceptedData = accepted?.data?.data;
  const preassignedReq = data?.data?.data;
 

  return (
    <Tabs>
      <TabList>
        <Tab
          _selected={{
            color: _COLORS.brand,
            fontWeight: "bold",
            borderBottom: `2px solid ${_COLORS.brand}`,
          }}
        >
          Market Place{" "}
        </Tab>
        <Tab
          _selected={{
            color: _COLORS.brand,
            fontWeight: "bold",
            borderBottom: `2px solid ${_COLORS.brand}`,
          }}
        >
          Accepted Request
        </Tab>

        <Tab
          _selected={{
            color: _COLORS.brand,
            fontWeight: "bold",
            borderBottom: `2px solid ${_COLORS.brand}`,
          }}
        >
          Pre Assigned Request
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel p="0" mt="30px">
          <>
            <Filter
              searchPlaceholder="Search Customer"
              searchFilter={"customerId.name"}
              filters={["truckType", "status", "customerId.name"]}
              filterBy={setFilterBy}
              info={requestData}
            />
            <CustomTable head={r}>
              {requestData?.data?.data?.filter((data) => CustomTable.filterFunc(data, filterBy))?.map((data) => (
                  <Tr>
                    <CustomTable.Td>
                      <Text {...CustomTable.style}>
                        {data?.truckType || "N/A"}
                      </Text>
                    </CustomTable.Td>
                    <CustomTable.Td>
                      <Text {...CustomTable.style}>
                        {data?.customerId?.name || "N/A"}
                      </Text>
                    </CustomTable.Td>
                    <CustomTable.Td>
                      <Text {...CustomTable.style}>
                        {data?.pickUpAddress || "N/A"}
                      </Text>
                    </CustomTable.Td>
                    <CustomTable.Td>
                      <Text {...CustomTable.style}>
                        {data?.numberOfTrucks || "N/A"}
                      </Text>
                    </CustomTable.Td>
                    <CustomTable.Td>
                      <Text {...CustomTable.style}>
                        {dayjs(data?.expiryDate).format("DD MMM YYYY")}
                      </Text>
                    </CustomTable.Td>

                    <CustomTable.Td>
                      <Text
                        color={
                          data?.status.toLowerCase() === "assigned"
                            ? _COLORS.green
                            : data?.status.toLowerCase() === "open"
                            ? "blue"
                            : "red"
                        }
                      >
                        {data?.status}
                      </Text>
                    </CustomTable.Td>

                    <CustomTable.Td>
                      <Text
                        cursor={"pointer"}
                        onClick={() =>
                          navigate("/requests/detail/1234", {
                            state: { data },
                          })
                        }
                        fontWeight={"bold"}
                        fontSize=".86em"
                        color={_COLORS.brand}
                      >
                        View
                      </Text>
                    </CustomTable.Td>
                  </Tr>
                ))}
            </CustomTable>

            <CustomTable.Pagination
              length={requestData?.length}
              updateTable={(page) => {
                setAllReqSkip(page * DATA_ROWS.LIMIT);
              }}
            />
          </>
        </TabPanel>
        <TabPanel p="0" mt="30px">
          <>
            <Filter
              searchPlaceholder="Search Customer"
              searchFilter={"customerData.name"}
              filters={["requestData.truckType", "status", "customerData.name"]}
              filterBy={setFilterBy}
              info={acceptedData}
            />

            <CustomTable head={r1}>
              {acceptedData
                ?.filter((data) => CustomTable.filterFunc(data, filterBy))
                ?.map?.((data) => (
                  <Tr>
                    <CustomTable.Td>
                      <Text {...CustomTable.style}>
                        {data?.requestData?.truckType || "N/A"}
                      </Text>
                    </CustomTable.Td>
                    {/* <CustomTable.Td>
                    <Text {...CustomTable.style}>
                      {data?.customerId?.name || "N/A"}
                    </Text>
                  </CustomTable.Td> */}
                    <CustomTable.Td>
                      <Text {...CustomTable.style}>
                        {data?.requestData?.pickUpAddress || "N/A"}
                      </Text>
                    </CustomTable.Td>
                    <CustomTable.Td>
                      <Text {...CustomTable.style}>
                        {data?.requestData?.numberOfTrucks || "N/A"}
                      </Text>
                    </CustomTable.Td>
                    <CustomTable.Td>
                      <Text {...CustomTable.style}>
                        {data?.response?.[0]?.trucksAvailable || "N/A"}
                      </Text>
                    </CustomTable.Td>
                    <CustomTable.Td>
                      <Text {...CustomTable.style}>
                        {dayjs(data?.expiryDate).format("DD MMM YYYY")}
                      </Text>
                    </CustomTable.Td>

                    <CustomTable.Td>
                      <Text
                        color={
                          data?.response?.[0]?.status.toLowerCase() ===
                          "accepted"
                            ? _COLORS.green
                            : _COLORS.red
                        }
                      >
                        {data?.response?.[0]?.status || "N/A"}
                      </Text>
                    </CustomTable.Td>
                  </Tr>
                ))}
            </CustomTable>
            <CustomTable.Pagination
              length={acceptedData?.length}
              updateTable={(page) => {
                console.log(page, ">>???");
                setAcceptedReqSkip(page * DATA_ROWS.LIMIT /*limit */);
              }}
            />
          </>
        </TabPanel>

        <TabPanel p="0" mt="30px">
          <>
            <Filter
              searchPlaceholder="Search Customer"
              searchFilter={"customerData.name"}
              filters={["requestData.truckType", "status", "customerData.name"]}
              filterBy={setFilterBy}
              info={preassignedReq}
            />

            <CustomTable head={r1}>
              {preassignedReq
                ?.filter((data) => CustomTable.filterFunc(data, filterBy))
                ?.map?.((data) => (
                  <Tr>
                    <CustomTable.Td>
                      <Text {...CustomTable.style}>
                        {data?.requestData?.truckType || "N/A"}
                      </Text>
                    </CustomTable.Td>
                    {/* <CustomTable.Td>
                    <Text {...CustomTable.style}>
                      {data?.customerId?.name || "N/A"}
                    </Text>
                  </CustomTable.Td> */}
                    <CustomTable.Td>
                      <Text {...CustomTable.style}>
                        {data?.requestData?.pickUpAddress || "N/A"}
                      </Text>
                    </CustomTable.Td>
                    <CustomTable.Td>
                      <Text {...CustomTable.style}>
                        {data?.requestData?.numberOfTrucks || "N/A"}
                      </Text>
                    </CustomTable.Td>
                    <CustomTable.Td>
                      <Text {...CustomTable.style}>
                        {data?.response?.[0]?.trucksAvailable || "N/A"}
                      </Text>
                    </CustomTable.Td>
                    <CustomTable.Td>
                      <Text {...CustomTable.style}>
                        {dayjs(data?.expiryDate).format("DD MMM YYYY")}
                      </Text>
                    </CustomTable.Td>

                    <CustomTable.Td>
                      <Text
                        color={
                          data?.response?.[0]?.status.toLowerCase() ===
                          "accepted"
                            ? _COLORS.green
                            : _COLORS.red
                        }
                      >
                        {data?.response?.[0]?.status || "N/A"}
                      </Text>
                    </CustomTable.Td>
                  </Tr>
                ))}
            </CustomTable>
            <CustomTable.Pagination
              length={preassignedReq?.length}
              updateTable={(page) => {
                console.log(page, ">>???");
                setAcceptedReqSkip(page * DATA_ROWS.LIMIT /*limit */);
              }}
            />
          </>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default Requests;
const r = [
  "Truck type",
  "Customer",
  "Pick up Address",
  "Total Trucks Requested",
  "Expiry Date/Time",
  "Status",
  "Action",
];

const r1 = [
  "Truck type",
  // "Customer",
  "Pick up Address",
  "Total Trucks Requested",
  "Trucks Available",
  "Expiry Date/Time",
  "Status",
];

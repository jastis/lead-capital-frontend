import { HStack, Text, Tr } from "@chakra-ui/react";
import { _COLORS } from "../../constant";
import CustomTable, { DATA_ROWS } from "../../components/CustomTable";
import { TopSection } from "./TopSection";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import FullPageLoader from "../../components/FullPageLoader";
import { getPartnerTrips } from "./services/trips";
import { useGetState } from "../../GlobalStateContext/useGetState";
import { getDashboard } from "../dashboard/sevices/dashboard";
import Filter from "../../components/Filter";
import { useState } from "react";

function Trips() {
  const [filterBy, setFilterBy] = useState(null);
  const [tripSkip, setTripSkip] = useState(0);

  const { state } = useGetState();
  const partnerId = state?._id;
  const navigate = useNavigate();

  const { data: tripsData = [] } = useQuery({
    queryKey: ["trips", tripSkip],
    queryFn: () => getPartnerTrips(partnerId, tripSkip),
  });
  const { data: dashboardData = [], isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });
  return isLoading ? (
    <FullPageLoader />
  ) : (
    <>
      <TopSection data={tripsData} dashboardData={dashboardData} />
      <Filter
        searchPlaceholder="Search Customer"
        searchFilter={"requestId.customerId.name"}
        filters={["requestId.truckType", "status"]}
        filterBy={setFilterBy}
        info={tripsData}
      />
      <CustomTable head={r}>
        {tripsData
          ?.filter((data) => CustomTable.filterFunc(data, filterBy))
          ?.map((data) => (
            <Tr key={data?._id} cursor={"pointer"}>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.tripId}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>
                  {data?.requestId?.customerId?.name || "N/A"}
                </Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <HStack>
                  <Text {...CustomTable.style}>
                    {data?.personel?.driver?.firstName}
                  </Text>
                  <Text {...CustomTable.style}>
                    {data?.personel?.driver?.lastName}
                  </Text>
                </HStack>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>
                  {data?.personel?.driver?.licenseNumber || "N/A"}
                </Text>
              </CustomTable.Td>

              <CustomTable.Td>
                <Text {...CustomTable.style}>
                  {data?.requestId?.deliveryLocation || "N/A"}
                </Text>
              </CustomTable.Td>

              <CustomTable.Td>
                <Text
                  color={
                    data?.status.toLowerCase() === "delivered"
                      ? _COLORS.green
                      : _COLORS.red
                  }
                >
                  {data?.status || "N/A"}
                </Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text
                  onClick={() =>
                    navigate(`/trips/${data?._id}`, { state: { data } })
                  }
                >
                  View Trip
                </Text>
              </CustomTable.Td>
            </Tr>
          ))}
      </CustomTable>
      <CustomTable.Pagination
        length={tripsData?.length}
        updateTable={(page) => {
          setTripSkip(page * DATA_ROWS.LIMIT /*limit */);
        }}
      />
    </>
  );
}

export default Trips;

const r = [
  "Trip ID",
  "Customer",
  "Driver",
  "Plate Number",
  "Delivery address",
  "Status",
  "Action",
];

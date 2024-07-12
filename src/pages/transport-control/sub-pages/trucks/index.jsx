/* eslint-disable react/jsx-key */
import { Text, Tr, Input as ChakraInput } from "@chakra-ui/react";
import CustomTable, { DATA_ROWS } from "../../../../components/CustomTable";
import OverviewCard from "../../../../components/OverviewCard";
import { useGetState } from "../../../../GlobalStateContext/useGetState";
import { CreateTruckModal } from "../../components/CreateNewTruckModal";
import { getTrucks } from "../../service/truck";
import { useQuery } from "@tanstack/react-query";
import FullPageLoader from "../../../../components/FullPageLoader";
import Filter from "../../../../components/Filter";
import { useState } from "react";

function Trucks() {
  const [filterBy, setFilterBy] = useState(null);
  const [skip, setSkip] = useState(0);
  const { state } = useGetState();
  const partnerId = state?._id;
  const { data: truckData = [], isLoading } = useQuery({
    queryKey: ["trucks", skip],
    queryFn: () => getTrucks(partnerId, skip),
  });

  return (
    <>
      <OverviewCard title="Active Trucks" value={truckData.length}>
        <CreateTruckModal />
      </OverviewCard>
      {console.log(truckData, ":::")}
      <Filter
        searchPlaceholder="Search Registration Number"
        searchFilter={"registrationNumber"}
        // filters={["firstName","lastName", "status", "customerData.name"]}
        filterBy={setFilterBy}
        info={truckData}
      />

      <CustomTable head={r}>
        {truckData
          ?.filter((data) => CustomTable.filterFunc(data, filterBy))
          ?.map((data) => (
            <Tr key={data?._id}>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.registrationNumber}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.make}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.assetSize}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.model}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.make}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.chassisNumber}</Text>
              </CustomTable.Td>
            </Tr>
          ))}
      </CustomTable>
      <CustomTable.Pagination
        length={truckData?.length}
        updateTable={(page) => {
          setSkip(page * DATA_ROWS.LIMIT);
        }}
      />
    </>
  );
}

export default Trucks;

const r = [
  "Registration Number",
  "Asset Class",
  "Asset Size",
  "Model",
  "Make",
  "Chassis Number",
];

export const Input = ({ ...props }) => {
  return <ChakraInput {...props} _focusVisible={{ boxShadow: "none" }} />;
};

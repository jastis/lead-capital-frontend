/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import {
  Box,
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import CustomTable, { DATA_ROWS } from "../../components/CustomTable";
import { _COLORS } from "../../constant";
import { AiOutlinePlus } from "react-icons/ai";
import Filter from "../../components/Filter";
import { useEffect, useState } from "react";
import { getAssignedRequest } from "./services/startTrip";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetState } from "../../GlobalStateContext/useGetState";
import dayjs from "dayjs";
import FullPageLoader from "../../components/FullPageLoader";
import { getDrivers } from "../transport-control/service/driver";
import { getTrucks } from "../transport-control/service/truck";
import { PiArrowRightFill } from "react-icons/pi";
import CustomModal from "../../components/CustomModal";
import BeginTripModal from "../../components/BeginTripModal";
import { assignPersonal } from "./services/startTrip";

function AcceptedRequests() {
  const [filterBy, setFilterBy] = useState(null);
  const [skip, setSkip] = useState(0);

  const { state } = useGetState();
  const partnerId = state?._id;

  const { data: assignData = [], isLoading } = useQuery({
    queryFn: () => getAssignedRequest(skip, partnerId),
    queryKey: ["assign", skip],
  });

  return (
    <>
      <Filter
        searchPlaceholder="Search Customer"
        searchFilter={"customerData.name"}
        filters={["requestData.truckType", "status", "customerData.name"]}
        filterBy={setFilterBy}
        info={assignData}
      />
      <CustomTable head={r}>
        {assignData
          ?.filter((data) => CustomTable.filterFunc(data, filterBy))
          .map((data) => (
            <Tr>
              {console.log(data, "LLL")}
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.truckType || "N/A"}</Text>
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

              <Td>
                <Text
                  color={
                    data?.status.toLowerCase() === "accepted" ||
                    data?.status.toLowerCase() === "open" ||
                    data?.status.toLowerCase() === "active" ||
                    data?.status.toLowerCase() === "assigned"
                      ? _COLORS.green
                      : _COLORS.red
                  }
                >
                  {data?.status}
                </Text>
              </Td>

              <CustomTable.Td>
                <HStack spacing={"10px"}>
                  <StartTripModal data={data} />
                  <CustomModal
                    title={"start trip"}
                    icon={
                      <PiArrowRightFill
                        fontSize={"1.5em"}
                        color={_COLORS.green}
                      />
                    }
                  >
                    <BeginTripModal data={data} />
                  </CustomModal>
                </HStack>
              </CustomTable.Td>
            </Tr>
          ))}
      </CustomTable>
      {!filterBy && (
        <CustomTable.Pagination
          length={assignData?.length}
          updateTable={(page) => {
            setSkip(page * DATA_ROWS.LIMIT);
          }}
        />
      )}
    </>
  );
}

export default AcceptedRequests;

const r = [
  "Truck type",
  "Customer",
  "Pick up Address",
  "Total Trucks Assigned",
  "Expiry Date/Time",
  "Status",
  "Action",
];

export const StartTripModal = ({ data }) => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state } = useGetState();
  const partnerId = state?._id;
  const requestId = data?._id;

  const { data: truckData = [] } = useQuery({
    queryKey: ["trucks"],
    queryFn: () => getTrucks(partnerId),
  });

  const [formValues, setFormValues] = useState({
    assignedPersonal: [],
  });
  const [truckListItems, setTruckListItems] = useState(1);
  const [v, setV] = useState({});

  useEffect(() => {
    const { driver, truck } = v;
    if (driver && truck) {
      setFormValues((formValues) => ({
        ...formValues,
        assignedPersonal: [...formValues.assignedPersonal, { driver, truck }],
      }));
      setV({});
    }
  }, [v]);
  console.log(data, "alies");

  const { data: driverData = [] } = useQuery({
    queryKey: ["drivers"],
    queryFn: getDrivers,
  });
  const { mutate: assign, isLoading } = useMutation({
    mutationFn: () => assignPersonal(requestId, { ...formValues }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      onClose();
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formValues };
    assign(requestId, payload);
  };

  return (
    <>
      <Text onClick={onOpen} backgroundColor="none" cursor="pointer">
        View
      </Text>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent height={"500px"} overflowY="scroll">
          <ModalHeader>Start Trip</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"} gap="20px" pb="10px">
              <Flex justifyContent="space-between" align="center">
                <Box>
                  <Text>Customer:</Text>
                </Box>
                <Box textTransform="uppercase">
                  {data?.customerId?.name || "N/A"}
                </Box>
              </Flex>
              <Flex justifyContent="space-between" align="center">
                <Box>
                  <Text>PickUp Address:</Text>
                </Box>
                <Box textTransform="uppercase">
                  {data?.pickUpAddress || "N/A"}
                </Box>
              </Flex>
              <Flex justifyContent="space-between" align="center">
                <Box>
                  <Text>Truck Type:</Text>
                </Box>
                <Box textTransform="uppercase">{data?.truckType || "N/A"}</Box>
              </Flex>
              <Flex justifyContent="space-between" align="center">
                <Box>
                  <Text>Number(s) of Truck:</Text>
                </Box>
                <Box textTransform="uppercase">
                  {data?.numberOfTrucks || "N/A"}
                </Box>
              </Flex>
              <AiOutlinePlus
                size={"16px"}
                color="#3C7B79"
                cursor="pointer"
                onClick={() => {
                  setTruckListItems((prev) =>
                    prev >= parseInt(data?.numberOfTrucks) ? prev : prev + 1
                  );
                }}
              />
              {[...Array(truckListItems)].map(() => {
                return (
                  <>
                    <Select
                      name="driver"
                      placeholder="Driver Name"
                      // value={formValues?.driver}
                      onChange={(e) =>
                        setV((v) => ({ ...v, [e.target.name]: e.target.value }))
                      }
                    >
                      {driverData?.map((driver) => (
                        <option key={driver?._id} value={driver?._id}>
                          {driver?.firstName}
                        </option>
                      ))}
                    </Select>
                    {console.log(v, "v")}
                    <Select
                      mb="20px"
                      name="truck"
                      placeholder="Truck Type"
                      // value={formValues?.truck}
                      onChange={(e) =>
                        setV((v) => ({ ...v, [e.target.name]: e.target.value }))
                      }
                    >
                      {truckData?.map((truck) => (
                        <option key={truck?._id} value={truck?._id}>
                          {truck?.truckType}
                        </option>
                      ))}
                    </Select>
                  </>
                );
              })}
              {/* {[...Array(addFields)]?.map((field, index) => (
                <Flex flexDir={"column"} pb="10px" key={index}>
                  <Flex width="100%" align={"center"}>
                    <AiOutlineMinus
                      cursor={"pointer"}
                      color="red"
                      onClick={() => setAddFields((prev) => prev - 1)}
                    />
                  </Flex>
                  <Box display="flex" alignItems="center" mb={"20px"}>
                    <Select
                      // name="driver"
                      placeholder="Driver Name"
                      name={index?.toString()}
                      value={formValues?.index}
                      // value={formValues?.driver}
                      onChange={handleChange}
                    >
                      {driverData?.map((driver) => (
                        <option key={driver?._id} value={driver?._id}>
                          {driver?.firstName}
                        </option>
                      ))}
                    </Select>
                  </Box>

                  <Box>
                    <Select
                      // name="truck"
                      placeholder="Truck Type"
                      // value={formValues?.truck}
                      name={index?.toString()}
                      value={formValues?.index}
                      onChange={handleChangeTruck}
                    >
                      {truckData?.map((truck) => (
                        <option key={truck?._id} value={truck?._id}>
                          {truck?.truckType}
                        </option>
                      ))}
                    </Select>
                  </Box>
                </Flex>
              ))} */}
              <Button
                bg={_COLORS.brand}
                color="#fff"
                _hover={{ background: `${_COLORS.brand}50` }}
                px="50px"
                fontSize={".86em"}
                alignSelf={"center"}
                onClick={handleSubmit}
                isLoading={isLoading}
              >
                Assign
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

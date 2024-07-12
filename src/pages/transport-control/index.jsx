import { useState } from "react";
import {
  Button,
  Flex,
  Text,
  Tr,
  useDisclosure,
  FormLabel,
  FormControl,
  Input as ChakraInput,
} from "@chakra-ui/react";
import CustomTable, { DATA_ROWS } from "../../components/CustomTable";
import { _COLORS } from "../../constant";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi";
import OverviewCard from "../../components/OverviewCard";
import { createDriver, getDrivers } from "./service/driver";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Filter from "../../components/Filter";

function TransportControl() {
  const [filterBy, setFilterBy] = useState(null);
  const [skip, setSkip] = useState(0);
  const { data: driverData = [] } = useQuery({
    queryKey: ["drivers", skip],
    queryFn: () => getDrivers(skip),
  });

  return (
    <>
      <OverviewCard title={"Active Drivers"} value={driverData?.length}>
        <CreateDriverModal />
      </OverviewCard>
      {console.log(driverData, ":::")}
      <Filter
        searchPlaceholder="Search First Name"
        searchFilter={"firstName"}
        // filters={["firstName","lastName", "status", "customerData.name"]}
        filterBy={setFilterBy}
        info={driverData}
      />

      <CustomTable head={r}>
        {driverData
          ?.filter((data) => CustomTable.filterFunc(data, filterBy))
          ?.map((data) => (
            <Tr key={data?._id}>
              <CustomTable.Td>
                <Text
                  {...CustomTable.style}
                >{`${data?.firstName} ${data?.lastName}`}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>
                  {dayjs(data?.expiryDate).format("DD MMM YYYY")}
                </Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>
                  {dayjs(data?.issuedDate).format("DD MMM YYYY")}
                </Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.mobile}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.licenseNumber}</Text>
              </CustomTable.Td>
            </Tr>
          ))}
      </CustomTable>
      <CustomTable.Pagination
        length={driverData?.length}
        updateTable={(page) => {
          setSkip(page * DATA_ROWS.LIMIT);
        }}
      />
    </>
  );
}

export default TransportControl;

const r = [
  "Name",
  "Expiry Date",
  "Issued Date",
  "Mobile",
  "Driver’s License Number",
];

export const CreateDriverModal = () => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    password: "",
    expiryDate: "",
    issuedDate: "",
    mobile: "",
    licenseNumber: "",
  });

  const [driverImage, setDriverImage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const { mutate: createNewDriver, isLoading } = useMutation({
    mutationFn: createDriver,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      onClose();
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      password,
      expiryDate,
      issuedDate,
      mobile,
      licenseNumber,
    } = formValues;

    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("password", password);
    formData.append("expiryDate", expiryDate);
    formData.append("issuedDate", issuedDate);
    formData.append("mobile", mobile);
    formData.append("licenseImage", driverImage);
    formData.append("licenseNumber", licenseNumber);

    createNewDriver(formData);
  };

  return (
    <>
      <Button
        onClick={onOpen}
        _hover={{ background: _COLORS.green }}
        bg={_COLORS.green}
        color="#fff"
      >
        <Flex alignItems={"center"} gap="5px" fontWeight={"500"}>
          <BiPlus />
          <Text>Create Driver</Text>
        </Flex>
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Driver</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"} gap="20px" pb="10px">
              <Input
                placeholder="First Name"
                fontSize=".86em"
                name="firstName"
                value={formValues.firstName}
                onChange={handleChange}
              />
              <Input
                placeholder="Last Name"
                fontSize=".86em"
                name="lastName"
                value={formValues.lastName}
                onChange={handleChange}
              />

              <Input
                placeholder="Password"
                fontSize=".86em"
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
              <FormControl>
                <FormLabel color={"gray.500"} fontSize={".8rem"}>
                  Expiry Date
                </FormLabel>
                <Input
                  type="date"
                  placeholder="Expiry Date"
                  fontSize=".86em"
                  name="expiryDate"
                  value={formValues.expiryDate}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel color={"gray.500"} fontSize={".8rem"}>
                  Issued Date
                </FormLabel>
                <Input
                  type="date"
                  placeholder="Issued Date"
                  fontSize=".86em"
                  name="issuedDate"
                  value={formValues.issuedDate}
                  onChange={handleChange}
                />
              </FormControl>
              <Input
                type="tel"
                placeholder="Mobile"
                fontSize=".86em"
                name="mobile"
                value={formValues.mobile}
                onChange={handleChange}
              />
              <Input
                placeholder="Driver’s License Number"
                fontSize=".86em"
                name="licenseNumber"
                value={formValues.licenseNumber}
                onChange={handleChange}
              />
              <Input
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                placeholder="Driver’s License Image"
                name="licenseImage"
                onChange={(e) => setDriverImage(e.target.files[0])}
              />

              <Button
                bg={_COLORS.brand}
                color="#fff"
                _hover={{ background: `${_COLORS.brand}50` }}
                px="50px"
                fontSize={".86em"}
                alignSelf={"flex-end"}
                onClick={handleSubmit}
                isLoading={isLoading}
              >
                Create
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export const Input = ({ ...props }) => {
  return <ChakraInput {...props} _focusVisible={{ boxShadow: "none" }} />;
};

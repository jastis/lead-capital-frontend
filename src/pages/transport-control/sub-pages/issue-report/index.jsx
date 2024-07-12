/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
import {
  Text,
  Tr,
  Input as ChakraInput,
  Button,
  useDisclosure,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import CustomTable, { DATA_ROWS } from "../../../../components/CustomTable";
import OverviewCard from "../../../../components/OverviewCard";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi";
import { BsDatabaseExclamation } from "react-icons/bs";
import { _COLORS } from "../../../../constant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createReport, getReports } from "../../service/report";
import { useGetState } from "../../../../GlobalStateContext/useGetState";
import { useState } from "react";
import FullPageLoader from "../../../../components/FullPageLoader";
import Filter from "../../../../components/Filter";
function IssueReport() {
  const [filterBy, setFilterBy] = useState(null);
  const [skip, setSkip] = useState(0);
  const { state } = useGetState();
  const partnerId = state?._id;

  const { data: reportData = [], isLoading } = useQuery({
    queryKey: ["reports", partnerId, skip],
    queryFn: () => getReports(partnerId, skip),
  });

  return (
    <>
      <OverviewCard
        icon={BsDatabaseExclamation}
        title={"Issued Reports"}
        value={reportData?.length?.toLocaleString()}
      >
        <CreateIssueReportModal />
      </OverviewCard>

      {console.log(reportData, ":::")}
      <Filter
        searchPlaceholder="Search Title"
        searchFilter={"reason"}
        // filters={["firstName","lastName", "status", "customerData.name"]}
        filterBy={setFilterBy}
        info={reportData}
      />

      <CustomTable head={r}>
        {reportData
          ?.filter((data) => CustomTable.filterFunc(data, filterBy))
          ?.map((data) => (
            <Tr>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.reason || "N/A"}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style} maxW="250px">
                  {data?.message || "N/A"}
                </Text>
              </CustomTable.Td>
            </Tr>
          ))}
      </CustomTable>
      <CustomTable.Pagination
        length={reportData?.length}
        updateTable={(page) => {
          setSkip(page * DATA_ROWS.LIMIT);
        }}
      />
    </>
  );
}

export default IssueReport;

const r = ["Title", "Logged Issues"];

export const CreateIssueReportModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState();
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    reason: "",
    message: "",
    userType: "Partner",
    type: "report",
  });
  const queryClient = useQueryClient();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  const { mutate: createNewReport } = useMutation({
    mutationFn: createReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      onClose();
      console.log("w");
    },
    onError: (e) => {
      console.log("error", e);
    },
  });

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const payload = { ...formValues };
    createNewReport(payload);
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
          <Text>Issue Report</Text>
        </Flex>
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Issue Report</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"} gap="20px" pb="10px">
              <Input
                type="text"
                name="fullName"
                placeholder="Enter FullName"
                fontSize=".86em"
                onChange={handleChange}
                value={formValues?.fullName}
              />
              <Input
                type="email"
                name="email"
                placeholder="Enter Email"
                fontSize=".86em"
                onChange={handleChange}
                value={formValues?.email}
              />

              <Input
                type="text"
                name="reason"
                placeholder="Enter Title"
                fontSize=".86em"
                onChange={handleChange}
                value={formValues?.reason}
              />

              <Textarea
                placeholder="Log issue"
                resize={"none"}
                fontSize=".86em"
                type="text"
                name="message"
                onChange={handleChange}
                value={formValues?.message}
              />

              <Button
                isLoading={loading}
                bg={_COLORS.brand}
                color="#fff"
                _hover={{ background: `${_COLORS.brand}50` }}
                px="50px"
                fontSize={".86em"}
                alignSelf={"flex-end"}
                onClick={handleSubmit}
                isDisabled={
                  !formValues.fullName ||
                  !formValues.email ||
                  !formValues.reason ||
                  !formValues.message
                }
              >
                Issue Report
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

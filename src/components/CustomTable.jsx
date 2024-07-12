/* eslint-disable react/prop-types */
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td as ChakraTd,
  TableContainer,
  Box,
  Text,
  Flex,
  useDisclosure,
  HStack,
  Stack,
  Input,
  Divider,
} from "@chakra-ui/react";
import { _COLORS } from "../constant";
import { BsStopFill } from "react-icons/bs";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { LiaTimesSolid } from "react-icons/lia";
import { useEffect, useState } from "react";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { PiArrowRightFill } from "react-icons/pi";
import AddItemModal from "./AddItemModal";
import RequestPayoutModal from "./RequestPayoutModal";
import CustomModal from "../components/CustomModal";

function CustomTable({
  head = [],
  actionType = 0,
  endpoint = [],
  children,
  data,
}) {
  return (
    <Box bg="#fff">
      <TableContainer>
        <Table variant="simple" bg="#fff" size="sm">
          <Thead>
            <Tr>
              {head?.map((data) => (
                <Th
                  p="15px"
                  color={_COLORS.black}
                  fontWeight={"600"}
                  key={data}
                >
                  {data}
                </Th>
              ))}
            </Tr>
          </Thead>

          <Tbody>{children}</Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default CustomTable;

export const DATA_ROWS = {
  LIMIT: 100,
};
const limit = DATA_ROWS.LIMIT;

export const Pagination = ({ updateTable, length = 0, total = 0 }) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isEmpty, setEmpty] = useState(false);
  const [maxPageLimit] = useState(5);

  useEffect(() => {
    if (length < 1) {
      setEmpty(({}, () => true));
    } else {
      setEmpty(({}, () => false));
    }
  }, [length]);

  const NUMBER_OF_PAGES = Math.ceil(Number(total) / DATA_ROWS.LIMIT);

  const getPageNumbers = () => {
    let currentPage = page;
    let p = NUMBER_OF_PAGES >= maxPageLimit ? maxPageLimit : NUMBER_OF_PAGES;
    let start = Math.floor(currentPage / p) * p;
    return new Array(p).fill().map((_, idx) => start + idx + 1); //get range 1-5, 6-10
  };
  console.log(page, "page");
  const goBack = () => {
    if (page === 0) return;
    setLoading(true);

    setPage((initial) => {
      console.log("back", initial - 1);
      updateTable(initial - 1);
      setLoading(false);
      return initial - 1;
    });
    // .then(() => setLoading(false));
  };

  const isLastPage = total && limit * (page + 1) >= total;

  const goNext = () => {
    // if (!length) {
    //   return;
    // }

    // if (length < limit || isLastPage) {
    //   return;
    // }
    // setLoading(true);

    setPage((initial) => {
      console.log("next", initial + 1);

      updateTable(initial + 1);
      // setLoading(false);
      return initial + 1;
    });
    // setLoading(true);
    // updateTable(page + 1);
    // then(() =>
    // setLoading(false);
    // );
  };

  const ARROW_STYLE = {
    borderRadius: "10px",
    bg: "transparent",
    _hover: { background: "transparent" },
    _focus: { boxShadow: "none" },
    p: "5px",
    cursor: "pointer",
  };

  const goToPageX = (page) => {
    setLoading(true);
    setPage(page);
    updateTable(page)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        console.log("Encountered error");
      });
  };

  return (
    <Box p="10px 0px" my="20px">
      <HStack spacing="2px" justifyContent="flex-end">
        <Text fontSize={".9em"}>
          Showing 1 - {limit}
          {/* of {NUMBER_OF_PAGES} */}
        </Text>
        <Button
          {...ARROW_STYLE}
          onClick={goBack}
          // disabled={page === 0}
        >
          <BiChevronLeft fontSize={"1.5em"} />
        </Button>
        <Stack direction="row">
          {getPageNumbers()?.map((pageNumber) => {
            let t = pageNumber - 1;
            return pageNumber <= NUMBER_OF_PAGES ? (
              <Text
                border="1px solid #8080806b"
                borderRadius={"5px"}
                fontSize=".8em"
                paddingX="7px"
                cursor={"pointer"}
                onClick={() => (page === t ? null : goToPageX(t))}
                bg={page === t ? _COLORS.brand : "transparent"}
                color={page === t ? "#fff" : "#000"}
              >
                {pageNumber}
              </Text>
            ) : null;
          })}
        </Stack>
        <Button
          {...ARROW_STYLE}
          onClick={goNext}
          // disabled={length < limit || isLastPage}
        >
          <BiChevronRight fontSize={"1.5em"} />
        </Button>
      </HStack>
    </Box>
  );
};

export const ActionType = ({
  type,
  endpoint = [],
  handleAccept,
  handleSubmit,
  handleDecline,
  handleEnd,
  requestId,
  dashboardData,
  data,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(data, "$$$$$$");
  switch (type) {
    case 0:
      return (
        <Flex alignItems={"center"} gap="10px">
          <CustomModal
            title="Accept"
            fontWeight={"500"}
            fontSize=".86em"
            color={_COLORS.green}
            border={`1px solid ${_COLORS.green}`}
            px="10px"
            py="5px"
            borderRadius="4px"
          >
            <AddItemModal
              data={data}
              handleAccept={handleAccept}
              requestId={requestId}
            />
          </CustomModal>

          <>
            <Text
              fontWeight={"500"}
              fontSize=".86em"
              color={_COLORS.red}
              onClick={onOpen}
              cursor="pointer"
              border={`1px solid ${_COLORS.red}`}
              p="5px 10px"
              borderRadius={"4px"}
            >
              Decline
            </Text>
            <AlertDialog
              motionPreset="slideInBottom"
              onClose={onClose}
              isOpen={isOpen}
              isCentered
              size={"sm"}
            >
              <AlertDialogOverlay />

              <AlertDialogContent>
                <AlertDialogBody textAlign={"center"}>
                  <Text fontSize={".9em"}>
                    Are you sure you want to decline this request?
                  </Text>
                  <Flex
                    alignItems={"center"}
                    justifyContent="space-between"
                    mt="40px"
                    mb="10px"
                  >
                    <Button
                      onClick={onClose}
                      border={`2px solid ${_COLORS.brand}`}
                      bg="transparent"
                      _hover={{ background: "transparent" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      bg={_COLORS.brand}
                      color="#fff"
                      _hover={{ background: `${_COLORS.brand}50` }}
                      ml={3}
                      onClick={handleDecline}
                    >
                      Confirm
                    </Button>
                  </Flex>
                </AlertDialogBody>
              </AlertDialogContent>
            </AlertDialog>
          </>
        </Flex>
      );
    case 1:
      return (
        <>
          <Flex
            onClick={onOpen}
            cursor="pointer"
            alignItems={"center"}
            gap="6px"
          >
            <BsStopFill fontSize={"1.5em"} color={_COLORS.red} />
            <Text fontWeight={"500"} fontSize=".86em" color={_COLORS.red}>
              End Trip
            </Text>
          </Flex>

          <AlertDialog
            motionPreset="slideInBottom"
            onClose={onClose}
            isOpen={isOpen}
            isCentered
            size={"sm"}
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogBody textAlign={"center"}>
                <Text fontSize={".9em"}>
                  Are you sure you want to end this trip?
                </Text>

                <Flex
                  alignItems={"center"}
                  justifyContent="space-between"
                  mt="40px"
                  mb="10px"
                >
                  <Button
                    onClick={onClose}
                    border={`2px solid ${_COLORS.brand}`}
                    bg="transparent"
                    _hover={{ background: "transparent" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg={_COLORS.brand}
                    color="#fff"
                    _hover={{ background: `${_COLORS.brand}50` }}
                    ml={3}
                    onClick={handleEnd}
                  >
                    Confirm
                  </Button>
                </Flex>
              </AlertDialogBody>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );

    case 2:
      return (
        <>
          <Flex
            onClick={onOpen}
            cursor="pointer"
            alignItems={"center"}
            gap="6px"
          >
            <PiArrowRightFill fontSize={"1.5em"} color={_COLORS.green} />
            <Text color={_COLORS.green} fontSize=".86em" fontWeight={"500"}>
              Start Trip{" "}
            </Text>
          </Flex>

          <AlertDialog
            motionPreset="slideInBottom"
            onClose={onClose}
            isOpen={isOpen}
            isCentered
            size={"sm"}
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogBody textAlign={"center"}>
                <Text fontSize={".9em"}>
                  Are you sure you want to start this trip?
                </Text>
                <Flex
                  alignItems={"center"}
                  justifyContent="space-between"
                  mt="40px"
                  mb="10px"
                >
                  <Button
                    onClick={onClose}
                    border={`2px solid ${_COLORS.brand}`}
                    bg="transparent"
                    _hover={{ background: "transparent" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg={_COLORS.brand}
                    color="#fff"
                    _hover={{ background: `${_COLORS.brand}50` }}
                    ml={3}
                    onClick={handleSubmit}
                  >
                    Confirm
                  </Button>
                </Flex>
              </AlertDialogBody>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    case 3:
      return (
        <>
          <CustomModal
            header="Request Payout"
            title="Request Payout"
            fontWeight={"bold"}
            fontFamily="Montserrat"
            fontSize=".86em"
            color={_COLORS.brand}
          >
            <RequestPayoutModal data={data} />
          </CustomModal>
        </>
      );

    default:
      return "0000";
  }
};

const style = {
  whiteSpace: "break-spaces",
  maxW: "120px",
  lineHeight: "1.8",
  fontWeight: "400",
};

export const Td = ({ children }) => {
  return (
    <ChakraTd py="10px" fontSize={".8em"}>
      {children}
    </ChakraTd>
  );
};

export const filterFunc = (data, filterBy) => {
  return filterBy?.key &&
    String(filterBy?.key?.split(".")?.reduce((a, b) => a?.[b], data))
    ? String(filterBy?.key?.split(".")?.reduce((a, b) => a?.[b], data)) ===
        filterBy?.value
    : filterBy?.search
    ? String(filterBy?.searchFilter?.split(".")?.reduce((a, b) => a?.[b], data))
        ?.toLowerCase()
        ?.includes(String(filterBy?.search)?.toLowerCase())
    : data;
};

CustomTable.Td = Td;

CustomTable.ActionType = ActionType;

CustomTable.style = style;

CustomTable.Pagination = Pagination;
CustomTable.filterFunc = filterFunc;

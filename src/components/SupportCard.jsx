import React from "react";
import { Box, Flex, Text, HStack, Avatar, Tooltip } from "@chakra-ui/react";
import ResponseModal from "./ResponseModal";
import { BsTrash } from "react-icons/bs";
import CustomModal from "./CustomModal";
import DeleteModal from "./DeleteModal";
import dayjs from "dayjs";

const SupportCard = ({ data }) => {
  return (
    <>
      {data?.map((datum) => (
        <Box
          key={datum?._id}
          bg={"white"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          padding={"15px"}
          borderRadius={"10px"}
          my={"6"}
        >
          <Flex alignItems={"flex-start"} justifyContent="flex-start" mt="10px">
            <Avatar
              src={datum?.userId?.image}
              name={"image"}
              size={["md"]}
              alt={"image"}
            />
            <Box ml="20px">
              <Text color="#4A4949" fontWeight={800} fontSize="16px">
                {datum?.reason}
              </Text>
              {/* <Tooltip label={datum?.message}>
                <Text color="#4A4949" fontWeight={400} fontSize="14px">
                  {datum?.message}
                </Text>
              </Tooltip> */}
                <Tooltip label={datum?.response?.length > 0 ? datum?.response[0]?.message : datum?.message}>
                <Text color="#4A4949" fontWeight={400} fontSize="14px">
                  {datum?.response?.length > 0 ? datum?.response[0]?.message : datum?.message}
                </Text>
              </Tooltip>
              <HStack>
                <Text color={"#3C0B71"} pt={"5px"} fontSize="13px">
                  {dayjs(datum?.createdAt).format("DD MMM YYYY")}
                </Text>
                <Text color={"#3C0B71"} pt={"5px"} fontSize="13px">
                  {datum?.userType}
                </Text>
                <Text
                  fontSize={"12px"}
                  pt={"5px"}
                  color={"#3C0B71"}
                  fontWeight={"bold"}
                >
                  {datum?.status === "closed" ? "Ticked resolved" : ""}
                </Text>
              </HStack>
            </Box>
          </Flex>
          <Box display={"flex"} alignItems={"center"}>
            <ResponseModal data={datum} />
            <CustomModal
              icon={<BsTrash size="18px" color={"red"} />}
              header={`Delete Ticket`}
              iconColor={"#154141"}
            >
              <DeleteModal text="Delete Ticket" />
            </CustomModal>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default SupportCard;

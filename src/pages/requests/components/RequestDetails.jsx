/* eslint-disable react/prop-types */
import { _COLORS } from "../../../constant";
import { Flex, Text, Avatar, Input } from "@chakra-ui/react";
import { BiChevronLeft } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import CustomTable from "../../../components/CustomTable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { declineRequest } from "../services/request";
import { formatToNaira } from "../../../utils/numberFormat";
import dayjs from "dayjs";

function RequestDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  return (
    <Flex flexDir={"column"} borderRadius="5px">
      <Flex
        flexDir={"row"}
        alignItems="center"
        gap="10px"
        mb="20px"
        cursor={"pointer"}
        onClick={() => navigate(-1)}
      >
        <BiChevronLeft fontSize={"1.5em"} />
        <Text fontWeight={"500"}>Back</Text>
      </Flex>

      <Flex
        gap="20px"
        flexDir={["column", "row"]}
        alignItems="initial"
        w="100%"
        justifyContent={"space-between"}
      >
        <Flex flexDir="column" gap="20px" flex="1">
          <CustomerInfo data={data} />
          <RouteInfo data={data} />
          <ExpireDateTime data={data} />
        </Flex>
        <Flex flexDir="column" gap="20px" flex="1">
          <AcceptDecline data={data} />
          <OtherInfo data={data} />
          <TotalReqStatus data={data} />
        </Flex>
        <Flex flexDir="column" gap="20px">
          <TruckType data={data} />
          {/* <Chat /> */}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default RequestDetails;

export const CustomerInfo = ({ data }) => {
  return (
    <Flex flexDir={"column"} w="100%" bg="#fff" p="20px" borderRadius="5px">
      <Flex alignItems="center" gap="10px" mb="20px">
        <Text fontWeight="700" fontSize={".86em"} color="#000">
          Customer Information
        </Text>
      </Flex>
      <Flex flexDir={"column"}>
        <Text color="#7E7C73" fontSize={".86em"}>
          Name
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {data?.data?.customerId?.name || "N/A"}
        </Text>
        <Text color="#7E7C73" mt="20px" fontSize={".86em"}>
          Phone number
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {data?.data?.customerId?.phone || "N/A"}
        </Text>
      </Flex>
    </Flex>
  );
};

export const RouteInfo = ({ data }) => {
  return (
    <Flex flexDir={"column"} w="100%" bg="#fff" p="20px" borderRadius="5px">
      <Flex alignItems="center" gap="10px" mb="20px">
        <Text fontWeight="700" fontSize={".86em"} color="#000">
          Route Information
        </Text>
      </Flex>
      <Flex flexDir={"column"}>
        <Text color="#7E7C73" fontSize={".86em"}>
          Pickup Location
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {data?.data?.pickUpAddress || "N/A"}
        </Text>
        <Text color="#7E7C73" mt="20px" fontSize={".86em"}>
          Delivery Location
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {data?.data?.deliveryLocation || "N/A"}
        </Text>
      </Flex>
    </Flex>
  );
};

export const ExpireDateTime = ({ data }) => {
  return (
    <Flex flexDir={"column"} w="100%" bg="#fff" p="20px" borderRadius="5px">
      <Flex alignItems="center" gap="10px" mb="20px">
        <Text fontWeight="700" fontSize={".86em"} color="#000">
          Expiry Date/Time
        </Text>
      </Flex>
      <Flex flexDir={"column"}>
        <Text color="#7E7C73" fontSize={".86em"}>
          Expiry Date
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {dayjs(data?.data?.expiryDate || "N/A").format("DD MMM YYYY")}
        </Text>
        <Text color="#7E7C73" mt="20px" fontSize={".86em"}>
          Storage Date
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {dayjs(data?.data?.storageDate || "N/A").format("DD MMM YYYY")}
        </Text>
        <Text color="#7E7C73" mt="20px" fontSize={".86em"}>
          Time
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {data?.data?.deliveryTime || "N/A"}
        </Text>
      </Flex>
    </Flex>
  );
};

export const AcceptDecline = () => {
  const location = useLocation();
  const data = location.state;
  const requestId = data?.data?._id;
  const queryClient = useQueryClient();
  const Declinemutation = useMutation({
    mutationFn: () => declineRequest(requestId, { action: "decline" }),
    onSuccess: () => {
      queryClient.invalidateQueries(["request"], requestId);
    },
  });

  const handleDecline = () => {
    Declinemutation.mutate({ requestId, action: "decline" });
  };

  return (
    <Flex flexDir={"column"} w="100%" bg="#fff" p="20px" borderRadius="5px">
      <Flex alignItems="center" gap="10px" mb="20px">
        <Text fontWeight="700" fontSize={".86em"} color="#000">
          Action
        </Text>
      </Flex>

      <Flex flexDir={"row"} alignItems="center">
        <CustomTable.ActionType
          requestId={requestId}
          type={0}
          data={data}
          // handleAccept={handleAccept}
          handleDecline={handleDecline}
        />
      </Flex>
    </Flex>
  );
};

export const OtherInfo = ({ data }) => {
  return (
    <Flex flexDir={"column"} w="100%" bg="#fff" p="20px" borderRadius="5px">
      <Flex alignItems="center" gap="10px" mb="20px">
        <Text fontWeight="700" fontSize={".86em"} color="#000">
          Other Information
        </Text>
      </Flex>
      <Flex flexDir={"column"}>
        <Text color="#7E7C73" fontSize={".86em"}>
          Comment
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {data?.data?.requestData?.comment || "N/A"}
        </Text>
      </Flex>
    </Flex>
  );
};

export const TotalReqStatus = ({ data }) => {
  const [showMessaging, setShowMessaging] = useState(false);
  return (
    <Flex
      borderRadius="5px"
      flexDir={"column"}
      w="100%"
      bg="#fff"
      p="20px"
      alignItems={"initial"}
      h="-webkit-fill-available"
    >
      <Flex alignItems="center" gap="10px" mb="20px">
        <Text fontWeight="700" fontSize={".86em"} color="#000">
          Total request status
        </Text>
      </Flex>
      <Text fontSize={".86em"} color={_COLORS.green} fontWeight="600" mb="20px">
        {data?.data?.status || "N/A"}
      </Text>

      <Flex flexDir={"column"}>
        <Text color="#7E7C73" fontSize={".86em"}>
          Transporter name
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {data?.data?.requestData?.transporterName || "N/A"}
        </Text>
        <Flex alignItems={"center"} mt="20px" gap="10px">
          <Text color="#7E7C73" fontSize={".86em"}>
            Suggested Price
          </Text>{" "}
        </Flex>

        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {formatToNaira(data?.data?.suggestedPrice)}
        </Text>

        {showMessaging && (
          <Flex mt="30px" flexDir={"column"}>
            <Flex flexDir={"column"} gap="10px">
              {CHAT_LIST.map((data, idx) => (
                <Flex
                  key={idx}
                  {...(data.me ? { flexDirection: "row-reverse" } : {})}
                  gap="5px"
                  alignItems={"center"}
                >
                  <Avatar size="sm" src={data.img} />
                  <Text
                    w="100%"
                    p="10px 8px"
                    borderRadius={"4px"}
                    bg={!data.me ? _COLORS.lightBrand : "#F6F6F6"}
                    fontSize={".7em"}
                  >
                    {data?.chat}
                  </Text>
                </Flex>
              ))}
            </Flex>
            <Flex alignItems={"center"} gap="20px" mt="30px">
              <Input
                placeholder="Type a message"
                fontFamily={"Montserrat"}
                _placeholder={{ color: "#2E150073", fontFamily: "Montserrat" }}
                _focus={{
                  outline: "none",
                  boxShadow: "none",
                  borderColor: "none",
                }}
                _focusVisible={{ boxShadow: "none", borderColor: "none" }}
                boxShadow="-1px 2px 2px 0px #80808059"
              />
              <Flex p="7px" bg={_COLORS.brand} borderRadius={"50%"}>
                <BsArrowRight color="#fff" />
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export const TruckType = ({ data }) => {
  return (
    <Flex
      flexDir={"column"}
      w="100%"
      bg="#fff"
      p="20px"
      alignItems={"initial"}
      borderRadius="5px"
    >
      <Flex alignItems="center" gap="10px" mb="20px">
        <Text fontWeight="700" fontSize={".86em"} color="#000">
          Truck Type (Closed)
        </Text>
      </Flex>

      <Flex flexDir={"column"}>
        <Text color="#7E7C73" fontSize={".86em"}>
          Truck Type
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {data?.data?.truckType || "N/A"}
        </Text>
        <Text color="#7E7C73" fontSize={".86em"} mt="20px">
          Remaining Trucks Allocation{" "}
        </Text>

        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {data?.data?.remainingTruckAllocation || "N/A"}
        </Text>
        <Text color="#7E7C73" fontSize={".86em"} mt="20px">
          Transporter name
        </Text>

        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {data?.data?.requestData?.transporterName || "N/A"}
        </Text>
      </Flex>
    </Flex>
  );
};

export const Chat = () => {
  return (
    <Flex flexDir={"column"} w="100%" bg="#fff" p="20px" borderRadius="5px">
      <Flex alignItems="center" gap="10px" mb="20px">
        <Text fontWeight="700" fontSize={".86em"} color="#000">
          Chat
        </Text>
      </Flex>
      <Flex flexDir={"column"} gap="10px">
        {CHAT_LIST.map((data, idx) => (
          <Flex
            key={idx}
            {...(data.me ? { flexDirection: "row-reverse" } : {})}
            gap="5px"
            alignItems={"center"}
          >
            <Avatar src={data.img} />
            <Text
              w="100%"
              p="10px 8px"
              borderRadius={"4px"}
              bg={!data.me ? _COLORS.lightBrand : "#F6F6F6"}
              fontSize={".7em"}
            >
              {data?.chat}
            </Text>
          </Flex>
        ))}
      </Flex>
      <Flex alignItems={"center"} gap="20px" mt="30px">
        <Input
          placeholder="Type a message"
          fontFamily={"Montserrat"}
          _placeholder={{ color: "#2E150073", fontFamily: "Montserrat" }}
          _focus={{
            outline: "none",
            boxShadow: "none",
            borderColor: "none",
          }}
          _focusVisible={{ boxShadow: "none", borderColor: "none" }}
          boxShadow="-1px 2px 2px 0px #80808059"
        />
        <Flex p="7px" bg={_COLORS.brand} borderRadius={"50%"}>
          <BsArrowRight color="#fff" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export const CHAT_LIST = [
  {
    img: "https://bit.ly/kent-c-dodds",
    chat: "Do you mean we have to carry two loaders?",
  },
  {
    img: "https://bit.ly/ryan-florence",
    chat: "Yes",
    me: true,
  },
  {
    img: "https://bit.ly/kent-c-dodds",
    chat: "Do you mean we have to carry two loaders?",
  },
  {
    img: "https://bit.ly/ryan-florence",
    chat: "Yes",
    me: true,
  },
];

/* eslint-disable react/prop-types */
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { _COLORS } from "../constant";
import { formatToNaira } from "../utils/numberFormat";
import { useState } from "react";
import { useGetState } from "../GlobalStateContext/useGetState";
import { requestPayout } from "../pages/transactions/services/transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const RequestPayoutModal = ({ data, onClose }) => {
  const queryClient = useQueryClient();
  const { state } = useGetState();

  console.log(data, state, "<<<<>>>");

  const [formData, setFormData] = useState({
    amount: "",
    partnerId: state?._id,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  console.log(formData, data?.tripId?.tripId, ")))))))))");

  const { mutate: requestPayouts } = useMutation({
    mutationFn: requestPayout,
    onSuccess: () => {
      queryClient.invalidateQueries(["transaction"]);
      onClose();
    },
  });

  const handlePayout = async (e) => {
    e.preventDefault();
    console.log(formData);
    // return;
    const payload = { ...formData, tripId: data?.tripId?.tripId };
    requestPayouts(payload);
  };

  console.log("SSSSS", data);
  return (
    <Box>
      <Flex
        flexDir={"column"}
        alignItems="flex-start"
        bg={_COLORS.brand}
        borderRadius="5px"
        p="15px"
        gap="10px"
      >
        <Text color="#fff" fontFamily={"Montserrat"} fontWeight="bold">
          Amount in Wallet
        </Text>
        <Flex
          flexDir={"row"}
          alignItems="center"
          fontFamily={"Montserrat"}
          gap="10px"
        >
          <Flex
            bg="#fff"
            borderRadius={"50%"}
            w="20px"
            h="20px"
            justifyContent={"center"}
            alignItems="center"
          >
            ₦
          </Flex>
          <Text color="#fff" fontFamily={"Montserrat"} fontWeight="bold">
            {formatToNaira(state?.wallet || "N/A")}
          </Text>
        </Flex>
      </Flex>
      <Flex flexDir={"column"} my="20px" gap="20px">
        <Input
          placeholder="Enter Amount"
          _focusVisible={{ boxShadow: "none" }}
          type="number"
          name="amount"
          value={formData?.amount}
          onChange={handleChange}
        />
        <Button
          color={"#fff"}
          _hover={{ background: `${_COLORS.brand}50` }}
          bg={_COLORS.brand}
          onClick={handlePayout}
        >
          Request Payout
        </Button>
      </Flex>
    </Box>
  );
};

export default RequestPayoutModal;

/* eslint-disable react/prop-types */
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { CustomBtn } from "../../src/components/CustomBtn";
import { _COLORS } from "../constant";
import { deleteCustomer } from "../pages/settings/services/customer";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const DeleteCustomerModal = ({data}) => {
      const queryClient = useQueryClient();
    const requestId= data?._id
    const partnerId = data?.partnerId;


    const DeleteCustomer = useMutation({
      mutationFn: () => deleteCustomer(requestId, partnerId),
      onSuccess: () => {
        queryClient.invalidateQueries(["customer"], requestId, partnerId);
      },
    });

    const handleDelete = () => {
      DeleteCustomer.mutate({ requestId, partnerId});
    }
  return (
    <Box p="10px 40px">
      <Text textAlign="center" pb="20px">
        Do you want to delete customer ?
      </Text>
      <Flex justifyContent="space-between">
        <CustomBtn text={"Cancle"} />
        <CustomBtn
          handleClick={handleDelete}
          text={"Delete"}
          bg={_COLORS.white}
          color={_COLORS.red}
          border={`1px solid ${_COLORS.red}`}
        />
      </Flex>
    </Box>
  );
};

export default DeleteCustomerModal;

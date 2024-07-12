/* eslint-disable react/prop-types */
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { updateRequest } from "../pages/requests/services/request";
import { _COLORS } from "../constant";

const AddItemModal = ({ requestId, data, onClose }) => {
  const [loading, setLoading] = useState();
  const [formValues, setFormValues] = useState({
    trucksAvailable: "",
  });
  const queryClient = useQueryClient();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  const mutation = useMutation({
    mutationFn: () =>
      updateRequest(requestId, {
        action: "accept",
        trucksAvailable: formValues?.trucksAvailable,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests".requestId] });
      onClose();
      console.log("gren");
    },
    onError: (e) => {
      console.log("ee", e);
    },
  });

  const handleAccept = (e) => {
    setLoading(true);
    e.preventDefault();
    mutation.mutate({
      requestId,
      actions: "accept",
      trucksAvailable: formValues?.trucksAvailable,
    });
  };

  return (
    <Box width="100%">
      <Box>
        <Text pb="20px" textAlign={"center"} fontWeight={"bold"}>
          Select Numbers of Trucks
        </Text>
        <Flex justifyContent="space-between" px="50px">
          <Text pb="20px" textAlign={"center"} fontWeight={"semi-bold"}>
            Numbers of Trucks Requested:
          </Text>
          <Text>{data?.data?.numberOfTrucks}</Text>
        </Flex>

        <Input
          name="trucksAvailable"
          type="number"
          value={formValues.trucksAvailable}
          onChange={handleChange}
          placeholder="Enter Number of Truck"
          fontSize=".86em"
        />
      </Box>
      <Flex justifyContent="center" mt="30px">
        <Button
          bgColor={_COLORS.primaryBtn}
          color={_COLORS.white}
          onClick={handleAccept}
          isLoading={loading}
          isDisabled={!formValues?.trucksAvailable}
        >
          Accept Request
        </Button>
      </Flex>
    </Box>
  );
};

export default AddItemModal;

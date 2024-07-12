/* eslint-disable react/prop-types */
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { _COLORS } from "../constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { beginTrip } from "../pages/accepted-requests/services/startTrip";

const BeginTripModal = ({ data, onClose }) => {
  const requestId = data?.requestId;
  const queryClient = useQueryClient();

  const { mutate: start } = useMutation({
    mutationFn: () => beginTrip(requestId, { action: "start-trip" }),
    onSuccess: () => {
      queryClient.invalidateQueries(["assign"]);
      onClose();
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { requestId, action: "start-trip" };
    start(payload);
  };
  return (
    <Box p={"20px 50px"}>
      <Text textAlign={"center"} pb="30px">
        Are you sure you want to start this trip?
      </Text>
      <Flex justifyContent={"space-between"}>
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
    </Box>
  );
};

export default BeginTripModal;

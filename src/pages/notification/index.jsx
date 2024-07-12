import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import React from "react";
import { _COLORS } from "../../constant";
import { getNotification } from "./services/notifications";
import { useQuery } from "@tanstack/react-query";

const index = () => {
  const { data: notificationData = [], isLoading } = useQuery({
    queryFn: getNotification,
    queryKey: ["notification"],
  });
  return (
    <Box width={"100%"} mt="20px">
      {/* <Text color={_COLORS.brand} fontWeight="700" fontSize="24px" pb="10px">
        Notification Settings
      </Text>
      <Text pb="50px" fontWeight="500" fontSize="18px">
        Update your personal details here
      </Text> */}
      <Box width="100%">
        {notificationData.map((item) => (
          <Box
            key={item.id}
            width="100%"
            bgColor={_COLORS.white}
            borderRadius="16px"
            padding="20px 20px"
            paddingBottom="30px"
            mb="20px"
          >
            <Flex
              width="100%"
              justifyContent="space-between"
              alignItems="center"
              mb="10px"
            >
              <Text fontWeight="500" fontSize="16px">
                {item?.title || "N/A"}
              </Text>
            </Flex>
            <Text color="#7E7C73" maxW="700px" fontSize={".8em"}>
              {item?.message || "N/A"}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default index;

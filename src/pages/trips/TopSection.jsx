/* eslint-disable react/prop-types */
import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { BsTruck } from "react-icons/bs";
import { _COLORS } from "../../constant";

export const TopSection = ({data, dashboardData}) => {
  const FONTS = {
    small: "14px",
    large: "18px",
  };
  return (
    <Flex
      flexWrap={"wrap"}
      flexDir={["column", "row"]}
      gap={["20px", "0"]}
      py={"30px"}
      justify={"space-between"}
    >
      <Box>
        <Stack flexDir={["column", "row"]} spacing={["10px", 14]}>
          <Box
            shadow={"md"}
            bg={_COLORS.lighterGreen}
            p={"12px"}
            rounded={"md"}
            w={["100%", "200px"]}
          >
            <HStack spacing={3}>
              <Box bg={_COLORS.lightGreen} p={"5px"} rounded={"50%"}>
                <BsTruck size={"1rem"} />
              </Box>
              <Stack>
                <Text fontWeight={"light"} fontSize={FONTS.small}>
                  {"Active trips"}
                </Text>
                <Text fontWeight={"bold"} fontSize={FONTS.large}>
                  {data?.length}
                </Text>
              </Stack>
            </HStack>
          </Box>
          <Box
            shadow={"md"}
            bg={_COLORS.ligherPink}
            p={"12px"}
            rounded={"md"}
            w={["100%", "200px"]}
          >
            <HStack spacing={3}>
              <Box bg={_COLORS.lightPink} p={"5px"} rounded={"50%"}>
                <BsTruck size={"1rem"} />
              </Box>
              <Stack>
                <Text fontWeight={"light"} fontSize={FONTS.small}>
                  {"Flagged trips"}
                </Text>
                <Text fontWeight={"bold"} fontSize={FONTS.large}>
                 {dashboardData?.totalFlaggedTrips}
                </Text>
              </Stack>
            </HStack>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
};

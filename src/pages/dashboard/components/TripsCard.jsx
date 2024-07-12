import { Box, Flex, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import { BsTruck } from "react-icons/bs";
import { _COLORS } from "../../../constant";
import TripsLineChart from "./TripsLineChart";

export const TripsCard = ({ data }) => {
  const FONTS = {
    small: "14px",
    large: "18px",
    mobileLarge: "16px",
    mobileSmall: "14px",
  };
  return (
    <Box>
      <Flex
        justify={"space-between"}
        w={"100%"}
        align={"center"}
        mb={"20px"}
        px={["10px", "10px", "30px"]}
      >
        <Box>
          <Heading fontSize={[FONTS.mobileLarge, FONTS.large]}>
            Trips in the last 3 months
          </Heading>
        </Box>
        <HStack>
          <Box shadow={"sm"} bg={_COLORS.ligherPink} p={"12px"} rounded={"md"}>
            <Stack align={"center"} spacing={0.7}>
              <BsTruck size={"1rem"} />
              <Text
                fontWeight={"light"}
                fontSize={[FONTS.mobileSmall, FONTS.small]}
              >
                {"Total trips"}
              </Text>
            </Stack>
          </Box>
          <Box shadow={"sm"} bg={_COLORS.lightOrange} p={"12px"} rounded={"md"}>
            <Stack align={"center"} spacing={0.7}>
              <BsTruck size={"1rem"} />
              <Text
                fontWeight={"light"}
                fontSize={[FONTS.mobileSmall, FONTS.small]}
              >
                {"Delivered trips"}
              </Text>
            </Stack>
          </Box>
        </HStack>
      </Flex>
      <TripsLineChart data={data} />
    </Box>
  );
};

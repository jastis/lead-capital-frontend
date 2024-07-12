import { Box, Flex, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import { BsTruck } from "react-icons/bs";
import { _COLORS } from "../../../constant";
import RentLineChart from "./RentLineChart";

export const RentCard = ({ data }) => {
  console.log(data, "income");
  const FONTS = {
    small: "14px",
    large: "18px",
  };
  return (
    <Box>
      <Flex
        justify={"space-between"}
        direction={["column", "column", "row"]}
        w={"100%"}
        align={["center"]}
        mb={"20px"}
        px={"30px"}
        gap={["10px", "10px", "0px"]}
      >
        <Box>
          <Heading fontSize={FONTS.large}>Recent Income</Heading>
        </Box>
        <HStack>
          <Box shadow={"sm"} bg={_COLORS.ligherPink} p={"12px"} rounded={"md"}>
            <Stack align={"center"} spacing={0.7}>
              <BsTruck size={"1rem"} />
              <Text fontWeight={"light"} fontSize={FONTS.small}>
                {"Balance"}
              </Text>
            </Stack>
          </Box>
          {/* <Box shadow={"sm"} bg={_COLORS.lightPink} p={"12px"} rounded={"md"}>
            <Stack align={"center"} spacing={0.7}>
              <BsTruck size={"1rem"} />
              <Text fontWeight={"light"} fontSize={FONTS.small}>
                {"Target"}
              </Text>
            </Stack>
  </Box>*/}
          <Box shadow={"sm"} bg={_COLORS.lightYellow} p={"12px"} rounded={"md"}>
            <Stack align={"center"} spacing={0.7}>
              <BsTruck size={"1rem"} />
              <Text fontWeight={"light"} fontSize={FONTS.small}>
                {"Advance"}
              </Text>
            </Stack>
          </Box>
          <Box shadow={"sm"} bg={_COLORS.lightGreen} p={"12px"} rounded={"md"}>
            <Stack align={"center"} spacing={0.7}>
              <BsTruck size={"1rem"} />
              <Text fontWeight={"light"} fontSize={FONTS.small}>
                {"Total"}
              </Text>
            </Stack>
          </Box>
        </HStack>
      </Flex>
      <RentLineChart data={data} />
    </Box>
  );
};

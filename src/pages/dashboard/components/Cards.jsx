import { Box, HStack, Stack, Text } from "@chakra-ui/react";

export const Cards = ({ title, amount, bg, iconBg, width, NGN, icon }) => {
  const FONTS = {
    small: "14px",
    large: "18px",
    mobileLarge: "16px",
    mobileSmall: "14px",
  };
  return (
    <Box shadow={"sm"} bg={bg} p={"12px"} rounded={"md"} w={width}>
      <HStack spacing={3}>
        <Box bg={iconBg} p={"5px"} rounded={"50%"}>
          {icon}
        </Box>
        <Stack>
          <Text
            fontWeight={"light"}
            fontSize={[FONTS.mobileSmall, FONTS.small]}
          >
            {title}
          </Text>
          <Text fontWeight={"bold"} fontSize={[FONTS.mobileLarge, FONTS.large]}>
            {NGN} {amount}
          </Text>
        </Stack>
      </HStack>
    </Box>
  );
};

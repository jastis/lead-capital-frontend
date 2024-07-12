import { Flex, Text } from "@chakra-ui/react";
import { TbSteeringWheel } from "react-icons/tb";
import { _COLORS } from "../constant";

function OverviewCard({ title, value, icon: Icon, color, children }) {
  return (
    <Flex
      justifyContent={"space-between"}
      flexDir={["column", "row"]}
      gap={["10px", "0"]}
      alignItems={["unset", "center"]}
      mb="20px"
      w={["100%", children ? "100%" : "300px"]}
    >
      <Flex
        bg={color ? `${color}30` : "#F9FEFA"}
        borderRadius="7px"
        p="15px"
        alignItems={"center"}
        gap="10px"
        w="100%"
        maxW={["100%", "300px"]}
        boxShadow={"0px 2px 2px #8080802b"}
      >
        <Flex
          bg={color ? color : _COLORS.lightGreen}
          borderRadius="50%"
          w="30px"
          h="30px"
          alignItems={"center"}
          justifyContent="center"
        >
          {typeof Icon === "string" ? (
            Icon
          ) : Icon ? (
            <Icon />
          ) : (
            <TbSteeringWheel />
          )}
        </Flex>
        <Flex flexDir={"column"} gap="5px">
          <Text color="#535353" fontSize={".86em"} fontWeight="300">
            {title}
          </Text>
          <Text fontFamily={"Montserrat"} fontWeight="700">
            {value}
          </Text>
        </Flex>
      </Flex>

      {children && children}
    </Flex>
  );
}

export default OverviewCard;

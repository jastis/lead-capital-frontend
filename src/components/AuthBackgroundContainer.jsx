import { Flex, Image, Img } from "@chakra-ui/react";
import logo from "../assets/auth_icon.png";
import truck from "../assets/truck.svg";

import { _COLORS } from "../constant";

export const AuthBackgroundContainer = ({ children }) => {
  return (
    <Flex alignItems={"flex-start"} h="100vh">
      <Flex
        flex="1"
        flexDir={"column"}
        justifyContent="center"
        alignItems={"center"}
        w="100%"
        h="100%"
      >
        {children}
      </Flex>
      <Flex
        display={["none", "flex"]}
        // bg={_COLORS.brand}
        flex="1"
        w="100%"
        h="100%"
        justifyContent={"center"}
        alignItems="center"
        position={"relative"}
      >
        <Flex
          w="100%"
          h="100%"
          zIndex={"2"}
          position={"absolute"}
          bg={"#3c0b71ed"}
        />
        <Image
          src={truck}
          h="100vh"
          w="100%"
          position="absolute"
          objectFit={"cover"}
          alt="truck"
          zIndex={"1"}
        />
        <Image
          position={"relative"}
          w="500px"
          maxW="500px"
          src={logo}
          alt="logo"
          zIndex={"3"}
        />
      </Flex>
    </Flex>
  );
};

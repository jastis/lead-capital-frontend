import { BsFacebook } from "react-icons/bs";
import { AiFillGoogleCircle } from "react-icons/ai";
import { Flex, Text } from "@chakra-ui/react";

export const SocialAuth = () => {
  return (
    <Flex flexDir={"column"} gap="10px">
      <Text textAlign={"center"} fontSize=".7em">
        Continue with social media
      </Text>

      <Flex alignItems={"center"} justifyContent="center" gap="30px">
        <BsFacebook color="#0276C5" fontSize={"1.5em"} />
        <AiFillGoogleCircle color="#E15100" fontSize={"1.8em"} />
      </Flex>
    </Flex>
  );
};

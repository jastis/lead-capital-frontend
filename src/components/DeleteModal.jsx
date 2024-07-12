import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { CustomBtn } from "./CustomBtn";

function DeleteModal({ text,onClose }) {
 
  return (
    <Box>
      <Text align="center" fontSize="16px" fontWeight={"bold"}>
        Are you sure you want to delete this {text}?
      </Text>
      <Flex direction="column" gap="20px" mt="50px">
        <CustomBtn text={text}/>
        <CustomBtn
          text="No, Cancel"
          bg="#fff"
          color="#000"
          border="1px solid #000"
          handleClick={onClose}
        />
      </Flex>
    </Box>
  );
}

export default DeleteModal;

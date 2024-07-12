/* eslint-disable react/prop-types */
import { Children, cloneElement, isValidElement } from "react";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Flex,
  Text,
  useDisclosure,
  ModalCloseButton,
  ModalHeader,
  Box,
} from "@chakra-ui/react";

const CustomModal = ({
  children,
  icon,
  header,
  fontWeight,
  px,
  py,
  border,
  borderRadius,
  fontSize,
  title,
  cursor,
  color,
  textAlign,
  overflow,
  maxH
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const btnRef = React.useRef();
  const childrenWithProps = Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a TS error too.
    if (isValidElement(child)) {
      return cloneElement(child, { onClose });
    }

    return child;
  });

  return (
    <>
      <Flex cursor="pointer" onClick={onOpen} align="center">
        {icon}
        <Text
          m="auto"
          color={color}
          cursor={cursor}
          textAlign={textAlign}
          fontWeight={fontWeight}
          border={border}
          py={py}
          px={px}
          borderRadius={borderRadius}
          fontSize={fontSize}
        >
          {title}
        </Text>
      </Flex>
      <Modal isOpen={isOpen} placement="right" onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#fff">
          <ModalHeader> {header}</ModalHeader>
          <ModalCloseButton />
           <Box overflowY={overflow} maxH={maxH}>
          <ModalBody mb="10px">{childrenWithProps}</ModalBody>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;

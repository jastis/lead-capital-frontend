import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { _COLORS } from "../constant";
import { APP_CONSTANTS } from "../constants/app";

export const LogOutModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogOut = () => {
    sessionStorage.removeItem(APP_CONSTANTS.token);
    location.reload();
  };

  return (
    <>
      <Flex
        justifySelf={"flex-end"}
        marginRight="20px"
        padding="7px"
        paddingLeft="30px"
        flexDir={"row"}
        alignItems="center"
        cursor="pointer"
        gap="10px"
        onClick={onOpen}
      >
        <FiLogOut color={_COLORS.red} />
        <Text
          color={_COLORS.red}
          fontFamily={"Montserrat"}
          fontSize=".86em"
          fontWeight="700"
        >
          Log out
        </Text>
      </Flex>
      <AlertDialog
        motionPreset="slideInBottom"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size={"sm"}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogBody textAlign={"center"}>
            <Flex flexDir={"column"} alignItems="center" py="10px">
              <Flex flexDir={"column"} gap="10px">
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap="10px"
                >
                  <FiLogOut color={_COLORS.red} />
                  <Text
                    color={_COLORS.red}
                    fontFamily={"Montserrat"}
                    fontWeight="700"
                  >
                    Log out
                  </Text>
                </Flex>
                <Text fontSize={".9em"}>
                  Are you sure you want to log out ?
                </Text>
              </Flex>

              <Flex
                alignItems={"center"}
                justifyContent="space-between"
                mt="20px"
                mb="10px"
                alignSelf={"stretch"}
                gap="20px"
              >
                <Button
                  w="100%"
                  onClick={onClose}
                  border={`2px solid ${_COLORS.brand}`}
                  bg="transparent"
                  _hover={{ background: "transparent" }}
                >
                  Cancel
                </Button>
                <Button
                  w="100%"
                  bg={_COLORS.brand}
                  color="#fff"
                  _hover={{ background: `${_COLORS.brand}50` }}
                  ml={3}
                  onClick={handleLogOut}
                >
                  Confirm
                </Button>
              </Flex>
            </Flex>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

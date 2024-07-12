import {
  Button,
  Flex,
  Input as ChakraInput,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { _COLORS } from "../../constant";
import { Link } from "react-router-dom";

import { AuthBackgroundContainer } from "../../components/AuthBackgroundContainer";

import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";
import { HiOutlineHandThumbUp } from "react-icons/hi2";
import { useState } from "react";
import { errorNotifier, successNotifier } from "../../components/notifier";
import axiosInstance from "../../service/api";

function ResetPassword() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [state, setState] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);

  const sendOTP = () => {
    setLoading(true);
    axiosInstance
      .post(`/auth/send-otp`, { userDetail: formValues?.email })
      .then(() => {
        setState(1);
        onOpen();
      })
      .catch((e) =>
        errorNotifier(
          e.response?.data?.message || e.response?.data?.data?.message
        )
      )
      .finally(() => setLoading(false));
  };

  const verifyOTP = () => {
    setLoading(true);
    axiosInstance
      .post(`/auth/verify/otp`, {
        otp: formValues?.otp,
        userDetail: formValues?.email,
      })
      .then(() => {
        setState(1);

        axiosInstance
          .post(`/auth/reset/password`, {
            email: formValues?.email,
            newPassword: formValues.newPassword,
            confirmPassword: formValues?.confirmPassword,
          })
          .then(() => {
            successNotifier("Password Reset Successful");
            window.location.pathname = "/";
          })
          .catch((e) =>
            errorNotifier(
              e.response?.data?.message || e.response?.data?.data?.message
            )
          );
      })
      .catch((e) =>
        errorNotifier(
          e.response?.data?.message || e.response?.data?.data?.message
        )
      )
      .finally(() => setLoading(false));
  };

  return (
    <AuthBackgroundContainer>
      {state === 0 ? (
        <Flex
          flexDir={"column"}
          alignSelf="stretch"
          px={["20px", "150px"]}
          gap="40px"
        >
          <Flex flexDir={"column"}>
            <Text fontFamily={"Montserrat"} fontWeight="700" fontSize="2.2em">
              Reset Password
            </Text>
            <Text fontSize=".86em">
              Kindly input the email you used to sign up
            </Text>
          </Flex>

          <Flex flexDir={"column"} fontSize=".86em" gap="10px">
            <Text> Enter Your Email Address</Text>
            <Input
              name="email"
              value={formValues?.email}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </Flex>

          <Flex flexDir={"column"} gap="6px">
            <Button
              isLoading={loading}
              bg={_COLORS.brand}
              py="25px"
              color="#fff"
              _hover={{ background: `${_COLORS.brand}50` }}
              fontWeight="bold"
              onClick={sendOTP}
            >
              Reset Password
            </Button>
          </Flex>

          <Flex flexDir={"column"} gap="10px">
            <Text textAlign={"center"}>
              Already have an account ?{" "}
              <span style={{ color: _COLORS.brand, fontWeight: "bold" }}>
                <Link to="/">Log In</Link>{" "}
              </span>
            </Text>
            {/* <Text textAlign={"center"} fontSize=".7em">
              Or{" "}
            </Text> */}

            {/* <SocialAuth /> */}
          </Flex>
        </Flex>
      ) : (
        <Flex
          flexDir={"column"}
          alignSelf="stretch"
          px={["20px", "150px"]}
          gap="40px"
        >
          <Flex flexDir={"column"}>
            <Text fontFamily={"Montserrat"} fontWeight="700" fontSize="2.2em">
              Reset Password
            </Text>
          </Flex>

          <Flex flexDir={"column"} fontSize=".86em" gap="10px">
            <Text> Enter OTP</Text>
            <Input
              type="text"
              name="otp"
              value={formValues?.otp}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </Flex>
          <Flex flexDir={"column"} fontSize=".86em" gap="10px">
            <Text> Enter New Password</Text>
            <Input
              type="password"
              name="newPassword"
              value={formValues?.newPassword}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </Flex>

          <Flex flexDir={"column"} fontSize=".86em" gap="10px">
            <Text> Confirm New Password</Text>
            <Input
              type="password"
              name="confirmPassword"
              value={formValues?.confirmPassword}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </Flex>

          <Flex flexDir={"column"} gap="6px">
            <Button
              isLoading={loading}
              bg={_COLORS.brand}
              py="25px"
              color="#fff"
              _hover={{ background: `${_COLORS.brand}50` }}
              fontWeight="bold"
              onClick={verifyOTP}
            >
              Reset Password
            </Button>
          </Flex>

          <Flex flexDir={"column"} gap="10px">
            <Text textAlign={"center"}>
              Already have an account ?{" "}
              <span style={{ color: _COLORS.brand, fontWeight: "bold" }}>
                <Link to="/">Log In</Link>{" "}
              </span>
            </Text>
            {/* <Text textAlign={"center"} fontSize=".7em">
              Or{" "}
            </Text> */}

            {/* <SocialAuth /> */}
          </Flex>
        </Flex>
      )}
      <SuccessModal isOpen={isOpen} onClose={onClose} />
    </AuthBackgroundContainer>
  );
}

export default ResetPassword;

export const Input = ({ ...props }) => {
  return <ChakraInput {...props} _focusVisible={{ boxShadow: "none" }} />;
};

export const SuccessModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Flex
              flexDir={"column"}
              justifyContent="center"
              alignItems={"center"}
              py="20px"
              gap="20px"
            >
              <Flex bg={_COLORS.lightGreen} borderRadius="50%" p="20px">
                <HiOutlineHandThumbUp fontSize={"1.5em"} />
              </Flex>

              <Flex
                flexDir={"column"}
                gap="10px"
                justifyContent={"center"}
                alignItems="center"
              >
                <Text
                  fontSize={"1.5em"}
                  fontWeight={"700"}
                  color={_COLORS.brand}
                >
                  Sent !
                </Text>
                <Text color="#7E7C73" textAlign={"center"} fontSize={".86em"}>
                  Check your email and follow the instructions
                </Text>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

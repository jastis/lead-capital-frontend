import { Button, Flex, Input as ChakraInput, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput";
import { AuthBackgroundContainer } from "../../components/AuthBackgroundContainer";
import { SocialAuth } from "../../components/SocialAuth";
import { _COLORS } from "../../constant";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../service/api";
import { useState } from "react";
import { errorNotifier, successNotifier } from "../../components/notifier";

function Register() {
  const [formValues, setFormValues] = useState({});
  const { mutate: register, isPending } = useMutation({
    mutationFn: (payload) => axiosInstance.post("/partner", payload),
    onSuccess: () => {
      successNotifier(
        "Signed Up Successfully, Please check you mail for your Login Details"
      );
      window.location.href = "/login";
    },
    onError: (er) => errorNotifier(er.response?.data?.message),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  console.log(formValues, "LL");
  return (
    <AuthBackgroundContainer>
      <Flex
        flexDir={"column"}
        alignSelf="stretch"
        px={["20px", "150px"]}
        gap="15px"
      >
        <Flex flexDir={"column"}>
          <Text fontFamily={"Montserrat"} fontWeight="700" fontSize="2.2em">
            Register Here
          </Text>
          <Text fontSize=".86em">Kindly input your details correctly</Text>
        </Flex>

        <Flex flexDir={"column"} fontSize=".86em" gap="10px">
          <Text> Enter Your Full Name</Text>
          <Input
            onChange={handleChange}
            name={"name"}
            value={formValues?.name}
          />
        </Flex>
        <Flex flexDir={"column"} fontSize=".86em" gap="10px">
          <Text> Enter Your Email Address</Text>
          <Input
            onChange={handleChange}
            name="email"
            value={formValues?.email}
          />
        </Flex>

        {/* <Flex alignItems={"flex-start"} gap="10px">
          <Flex flexDir={"column"} fontSize=".86em" gap="10px">
            <Text> Enter Your Password</Text>
            <Input type="password" />
          </Flex>
          <Flex flexDir={"column"} fontSize=".86em" gap="10px">
            <Text> Re-enter Your Password</Text>
            <Input type="password" />
          </Flex>
        </Flex> */}

        <Flex flexDir={"column"} fontSize=".86em" gap="10px">
          <Text> Enter Your Company Name</Text>
          <Input
            onChange={handleChange}
            name="businessName"
            value={formValues?.businessName}
          />
        </Flex>
        <Flex flexDir={"column"} fontSize=".86em" gap="10px">
          <Text> Enter Your Company Address</Text>
          <Input
            onChange={handleChange}
            name="address"
            value={formValues?.address}
          />
        </Flex>
        <Flex flexDir={"column"} fontSize=".86em" gap="10px">
          <Text> Enter Your Phone Number</Text>
          <Input
            onChange={handleChange}
            name="phone"
            value={formValues?.phone}
          />
        </Flex>

        <Flex flexDir={"column"} gap="6px">
          <Button
            isDisabled={
              !formValues?.phone ||
              !formValues?.email ||
              !formValues?.address ||
              !formValues?.businessName ||
              !formValues?.name
            }
            onClick={() => register(formValues)}
            isLoading={isPending}
            bg={_COLORS.brand}
            py="25px"
            color="#fff"
            _hover={{ background: `${_COLORS.brand}50` }}
            fontWeight="bold"
            // onClick={handleSignUp}
            // isLoading={isLoading}
            // isDisabled={
            //   !formValues?.businessName ||
            //   !formValues?.address ||
            //   !formValues?.email ||
            //   !formValues?.name ||
            //   !formValues?.phone
            // }
          >
            Sign Up
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
    </AuthBackgroundContainer>
  );
}

export const Input = ({ ...props }) => {
  return <ChakraInput {...props} _focusVisible={{ boxShadow: "none" }} />;
};

export default Register;

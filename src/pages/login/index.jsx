import { Button, Flex, Input as ChakraInput, Text } from "@chakra-ui/react";
import { _COLORS } from "../../constant";
import { Link } from "react-router-dom";

import { SocialAuth } from "../../components/SocialAuth";
import { AuthBackgroundContainer } from "../../components/AuthBackgroundContainer";
import { useState } from "react";
import { loginUser } from "./service/login";

function Login() {
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    setLoading(true);
    const payload = { ...formValues };
    await loginUser(payload, setLoading);
  };

  return (
    <AuthBackgroundContainer>
      <Flex
        flexDir={"column"}
        alignSelf="stretch"
        px={["20px", "150px"]}
        gap="40px"
      >
        <Flex flexDir={"column"}>
          <Text fontFamily={"Montserrat"} fontWeight="700" fontSize="2.2em">
            Log In
          </Text>
          <Text fontSize=".86em">Kindly input your details correctly</Text>
        </Flex>

        <Flex flexDir={"column"} fontSize=".86em" gap="10px">
          <Text> Enter Your Email Address</Text>
          <Input
            name="email"
            type="email"
            value={formValues?.email}
            onChange={handleChange}
          />
        </Flex>
        <Flex flexDir={"column"} fontSize=".86em" gap="10px">
          <Text> Enter Your Password</Text>
          <Input
            name="password"
            type="password"
            value={formValues?.password}
            onChange={handleChange}
          />
        </Flex>

        <Flex flexDir={"column"} gap="6px">
          <Button
            bg={_COLORS.brand}
            py="25px"
            color="#fff"
            _hover={{ background: `${_COLORS.brand}50` }}
            fontWeight="bold"
            onClick={handleLogin}
            isLoading={loading}
          >
            Login
          </Button>

          <Text alignSelf={"flex-end"} fontSize=".86em">
            <Link to="/reset-password">Forgot Password?</Link>
          </Text>
        </Flex>

        <Flex flexDir={"column"} gap="10px">
          <Text textAlign={"center"}>
            Don't have an account ?{" "}
            <span style={{ color: _COLORS.brand, fontWeight: "bold" }}>
              <Link to="/register">Sign up</Link>{" "}
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

export default Login;

export const Input = ({ ...props }) => {
  return <ChakraInput {...props} _focusVisible={{ boxShadow: "none" }} />;
};

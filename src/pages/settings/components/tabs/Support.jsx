import {
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { _COLORS } from "../../../../constant";
import { CiSearch } from "react-icons/ci";
import FormInput from "../../../../components/FormInput";
import { CustomBtn } from "../../../../components/CustomBtn";
import { createSupport } from "../../services/support";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import FullPageLoader from "../../../../components/FullPageLoader"

function Support() {
  
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
   const [formData , setFormData] = useState({
    fullName: "",
    email:"",
    message:"",
    userType: "Partner",
    reason:""
   })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const { mutate: createNewSupport, isLoading } = useMutation({
    mutationFn: createSupport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["support"] });
      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
   const payload={...formData}
   createNewSupport(payload)
   setFormData("")
  };

  return isLoading ? (
    <FullPageLoader />
  ) : (
    <Box width="100%" mt="20px">
      <Box
        bgColor={_COLORS.white}
        borderRadius="10px"
        padding={"20px 30px"}
        maxW={["100%", "57%"]}
        mb="50px"
      >
        <Text fontWeight="500" pb="10px">
          How can we help you ?
        </Text>
        <InputGroup maxW="350px">
          <InputLeftElement pointerEvents="none">
            <CiSearch color="gray.300" />
          </InputLeftElement>
          <Input type="text" placeholder="Search" />
        </InputGroup>
      </Box>

      <Flex
        flexDir={["column", "row"]}
        width="100%"
        justifyContent="space-between"
        alignItems="start"
        gap={["20px", "0"]}
      >
        <Box
          bgColor={_COLORS.white}
          borderRadius="10px"
          padding={"20px 30px"}
          w={["100%", "35%"]}
        >
          <Text fontWeight="500" fontSize="16px" pb="30px">
            Popular Topics
          </Text>
          <Text
            fontWeight="500"
            fontSize="14px"
            color={_COLORS.brand}
            pb="20px"
          >
            Account
          </Text>
          <Text
            fontWeight="500"
            fontSize="14px"
            color={_COLORS.brand}
            pb="20px"
          >
            Billings
          </Text>
          <Text
            fontWeight="500"
            fontSize="14px"
            color={_COLORS.brand}
            pb="20px"
          >
            Privacy
          </Text>
          <Text
            fontWeight="500"
            fontSize="14px"
            color={_COLORS.brand}
            pb="20px"
          >
            Refunds
          </Text>
        </Box>
        <Box
          bgColor={_COLORS.white}
          borderRadius="10px"
          padding={"20px 30px"}
          w={["100%", "55%"]}
        >
          <Text
            color={_COLORS.brand}
            fontSize="24px"
            fontWeight="700"
            mb="30px"
          >
            Send a message
          </Text>
          <FormInput
            placeholder="Enter Your Full Name"
            mb="20px"
            type="text"
            name="fullName"
            value={formData?.fullName}
            onChange={handleChange}
          />
          <FormInput
            placeholder={"Enter Your Email Address"}
            mb="20px"
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleChange}
          />
          <Textarea
            mb="20px"
            placeholder="Enter your reason"
            type="text"
            name="reason"
            value={formData?.reason}
            onChange={handleChange}
          />
          <Textarea
            placeholder="Enter your message"
            type="text"
            name="message"
            value={formData?.message}
            onChange={handleChange}
          />
          <Flex mt="40px" justifyContent="center">
            <CustomBtn
              text="send"
              width={"360px"}
              height="50px"
              handleClick={handleSubmit}
            />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default Support;

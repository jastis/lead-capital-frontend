import {
    Box,
    Button,
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    Textarea,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import { createSupport } from "../pages/support/service/index";
  import { useMutation, useQueryClient } from "@tanstack/react-query"; 
  import { useGetState } from "../GlobalStateContext/useGetState";

   const ContactUsModal = ({ isOpen, onClose }) => {
    const { state } = useGetState();
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
      reason: "",
      message: "",
      email:state?.email,
      fullName: state?.name,
      userType: "Company",
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
    const { mutate: NewTickets, isLoading } = useMutation({
      mutationFn: createSupport,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["support"] });
        onClose();
      },
    });
    const handleSupport = (e) => {
      e.preventDefault();
      const payload = { ...formData };
      NewTickets(payload);
    };
    return (
      <>
        <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent px="20px" w={"100%"}>
            <ModalCloseButton color={"brandColor"} />
            <ModalBody py={6}>
              <Box w={"100%"} bg={"#FFFFFF"} p={"30px"}>
                <Text color={"#264653"} fontSize={"15px"} fontWeight={"semibold"} py={"10px"}>
                  Reason
                </Text>
                <Input
                  bg={"#F8F2FF"}
                  size={"lg"}
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                />
                <Text color={"#264653"} fontSize={"15px"} fontWeight={"semibold"} py={"10px"} pt={"15px"}>
                  Message
                </Text>
                <Textarea
                  resize={"none"}
                  bg={"#F8F2FF"}
                  h={"150px"}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                />
                <Flex justify={"center"}>
                  <Button
                    bg={"#3C0B71"}
                    color={"#FFFFFF"}
                    fontSize={"14px"}
                    fontWeight={"light"}
                    alignContent="center"
                    mt={"40px"}
                    px={"60px"}
                    _hover={{ bg: "brandColor" }}
                    disabled={!formData.reason || !formData.message}
                    isLoading={isLoading}
                    w={["100%", "100%", "60%"]}
                    onClick={handleSupport}
                  >
                    Proceed
                  </Button>
                </Flex>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default ContactUsModal
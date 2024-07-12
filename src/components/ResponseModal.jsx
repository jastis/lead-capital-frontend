import {
    Avatar,
    Box,
    Button,
    Divider,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    Textarea,
    Tooltip,
    useDisclosure,
    IconButton
  } from "@chakra-ui/react";
  import React from "react";
  import { useState } from "react";
  import { MdMessage } from 'react-icons/md';
  import dayjs from "dayjs";
  import { createSupportResponse } from "../pages/support/service/index";
  import { useMutation, useQueryClient } from "@tanstack/react-query"; 
  import { useGetState } from "../GlobalStateContext/useGetState";
  
  const ResponseModal = ({ data }) => {
    const queryClient = useQueryClient();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { state } = useGetState();
    const [formData, setFormData] = useState({
      supportId: data?._id,
      userType:"Partner",
      message: "",
    });
    const { mutate: NewTicketsResponse, isLoading } = useMutation({
      mutationFn: createSupportResponse,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["support"] });
        setFormData({
          supportId: data?._id,
          userType: "Partner",
          message: "",
        });
        onClose();
      },
    });
    const handleSupport = (e) => {
      e.preventDefault();
      const payload = { ...formData };
      NewTicketsResponse(payload);
    };
    return (
      <>
        <Tooltip hasArrow label="Respond" bg="#FFFFFF" color={"#4A4949"}>
          <IconButton
            icon={<MdMessage />}
            variant="ghost"
            colorScheme="#3C0B71"
            size="lg"
            aria-label="Open Message Modal"
            onClick={onOpen}
          />
        </Tooltip>
        <Modal size={"3xl"} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              textAlign={"flex-start"}
              fontWeight="semibold"
              color="#0E6B60"
              fontSize={"18px"}
            >
              Sender Details
            </ModalHeader>
            <ModalCloseButton color={"brandColor"} />
            <ModalBody py={6}>
              <Flex
                width="100%"
                direction={["column", "column", "row"]}
                color={"#264653"}
              >
                <Flex px={"30px"} width="100%" justifyContent={"space-between"}>
                  <Box w={"7%"}></Box>
  
                  <Box width="20%">
                    <Text fontSize={"1.2rem"} fontWeight={"semibold"}>Name</Text>
                  </Box>
                  <Box w={"25%"}>
                    <Text fontSize={"1.2rem"} fontWeight={"semibold"}>Email Address</Text>
                  </Box>
                  <Box w={"25%"}>
                    <Text fontSize={"1.2rem"} fontWeight={"semibold"}>House no/ Street</Text>
                  </Box>
                </Flex>
              </Flex>
              <Flex
                width="100%"
                direction={["column", "column", "row"]}
                color={"#264653"}
                bg="#F6F6F64F"
              >
                <Flex
                  width="100%"
                  justifyContent="space-between"
                  alignItems={"center"}
                  px="30px"
                  py={"7px"}
                  fontWeight={"semibold"}
                >
                  <Box w={"7%"} display={["none", "none", "block"]}>
                    <Avatar name={"name"} src={data?.userId?.image} size="lg" />
                  </Box>
                  <Box width="20%">
                    <Text fontSize={"14px"}>  {data?.userType}</Text>
                  </Box>
                  <Box w={"25%"}>
                    <Text fontSize={"14px"}>FiltrdSupport</Text>
                  </Box>
                  <Box w={"25%"}>
                    <Text fontSize={"14px"}>No 2 Zealight st</Text>
                  </Box>
                </Flex>
              </Flex>
              <Box bg={"#F6F6F64F"} color={"#4A4949"} mt={"40px"} p={"20px"} maxHeight="300px" overflowY={"scroll"}>
                <Flex
                  width={["100%", "100%", "90%"]}
                  justifyContent={"space-between"}
                >
                </Flex>
                <Text fontSize={"1.2rem"} lineHeight={1.2} maxW={"90%"} fontWeight={"semibold"}>
                  {data?.message}
                </Text>
                <Text color={"#3C0B71"} fontSize={"14px"} my={"5px"}>
                  {dayjs(data?.createdAt).format("DD MMM YYYY")}
                </Text>
                <Divider />
              </Box>
              <Box bg={"#F6F6F64F"} color={"#4A4949"} mt={"40px"} p={"20px"} maxHeight="300px" overflowY={"scroll"}>
                {data?.response?.map((item, index) => (
                  <Box key={index} my={"8px"}>
                    <Box display={"flex"}>
                      <Avatar name={"name"} src={item?.user?.image} size="sm" />
                      <Box w={"100%"} ml={"8px"}>
                        <Text fontSize={"14px"} lineHeight={1.2} maxW={"90%"}>
                          {item.message}
                        </Text>
                        <Text color={"#3C0B71"} fontSize={"14px"} my={"5px"}>
                          {dayjs(item.postedAt).format("DD MMM YYYY")}
                        </Text>
                      </Box>
                    </Box>
                    <Divider />
                  </Box>
                ))}
              </Box>
              <Box p={"20px"}>
                <Text
                  color={"#3C0B71"}
                  fontSize={"18px"}
                  fontWeight={"semibold"}
                  py={"10px"}
                >
                  Respond to Message
                </Text>
                <Flex
                  align={"flex-end"}
                  justify={"space-between"}
                  w={"100%"}
                  direction={["column", "column", "row"]}
                >
                  <Textarea
                    h={"130px"}
                    resize={"none"}
                    bg={"#F6F6F6"}
                    placeholder="Type Here"
                    color={"#264653"}
                    p={"15px"}
                    border={"none"}
                    w={["100%", "100%", "75%"]}
                    isDisabled={data?.status === "closed"}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    
                  />
                  <Button
                    my="20px"
                    width="130px"
                    bg={data?.status === "closed" ? "#FFBF00" : "#3C0B71" } 
                    color="#fff"
                    isLoading={isLoading}
                    _hover={{ bg: "brandColor" }}
                    isDisabled={data?.status === "closed"}
                    onClick={handleSupport}
                  >
                    {data?.status === "closed" ? "Resolved" : "Send"}
                  </Button>
                </Flex>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default ResponseModal
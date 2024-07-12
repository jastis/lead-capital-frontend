import { Box, useDisclosure, Flex, Heading } from "@chakra-ui/react";
import { _COLORS } from "../../constant";
import { CustomBtn } from "../../components/CustomBtn";
import SupportCard from "../../components/SupportCard";
import ContactUsModal from "../../components/ContactUsModal";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../service/api";
import { useGetState } from "../../GlobalStateContext/useGetState";
const Support = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { state } = useGetState();
  const { data } = useQuery({
    queryKey: ["support"],
    queryFn: () =>
      axiosInstance
        .get(`/support?userId=${state?._id}`)
        .then((res) => res?.data?.data),
  });

  return (
    <Box>
      <Flex justifyContent={"space-between"}>
        <Heading
          as="h2"
          fontSize={["22px", "22px", "30px"]}
          mb={["20px", "20px", "0px"]}
        >
          Support Messages
        </Heading>
        <CustomBtn text="Send Message" handleClick={onOpen} />
      </Flex>
      <SupportCard data={data} />

      <ContactUsModal {...{ isOpen, onClose }} />
    </Box>
  );
};

export default Support;

/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Flex,
  FormLabel,
  HStack,
  Image,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import profilePic from "../../../assets/profilePic.png";
import { _COLORS } from "../../../constant";
import CustomModal from "../../../components/CustomModal";
import UpdateInfoModal from "./UpdateInfoModal";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import { getPaartner } from "../services/partner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FullPageLoader from "../../../components/FullPageLoader";
import { updatePartner } from "../services/support";
import icon from "..//..//../assets/camera.png";

function Info({ state }) {
  // const [image, setImgSelected] = useState("")
   const [loading, setLoading] = useState(false);
  
  const partnerId = state?._id;
  const { data: partnerData = [], isLoading } = useQuery({
    queryFn:getPaartner,
    queryKey:["partner"]
  });
  console.log(partnerData,"afrca")

  
   const handleChange = async (e) => {
    console.log(e.target.files?.[0],"fanda")
     setLoading(true);
     const formData = new FormData();
     formData.append("image", e.target.files?.[0]);
     await updatePartner(partnerId, formData, setLoading,)
   };


  return isLoading ? (
    <FullPageLoader />
  ) : (
    <Box width="100%" mt="20px">
      <Flex
        flexDir={["column", "row"]}
        width="100%"
        gap={["20px", "0"]}
        justifyContent="space-between"
      >
        <Box
          padding="30px 30px"
          bgColor={_COLORS.white}
          borderRadius="10px"
          width={["100%", "30%"]}
        >
          <Flex
            justifyContent="center"
            alignItems="center"
            flexDir="column"
            w={"100%"}
            position="relative"
            zIndex={0}
          >
            <HStack>
              <Image
                src={partnerData[0]?.image}
                width="114px"
                height="114px"
                borderRadius="50%"
                position="relative"
              />
              <FormLabel htmlFor="profile-pic" borderRadius={"50%"}>
                {" "}
                <Image
                  // onClick={handleClick}
                  src={icon}
                  bg={_COLORS?.brand}
                  p="5px"
                  w="30px"
                  h="30px"
                  borderRadius="50%"
                  position="absolute"
                  left="150px"
                  top="10px"
                  cursor="pointer"
                />
              </FormLabel>
              <Input
                display={"none"}
                type="file"
                id="profile-pic"
                onChange={handleChange}
              />

              {loading && (
                <Box position={"absolute"} top="11%" left="8%" zIndex={1000}>
                  <Spinner
                    thickness="3px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="md"
                  />
                </Box>
              )}
            </HStack>
          </Flex>

          <Box textAlign="center">
            <Text
              color={_COLORS.primaryBtn}
              fontSize="24px"
              fontWeight="bold"
              mb="10px"
            >
              {partnerData[0]?.name || "N/A"}
            </Text>
            <Text fontSize="16px" fontWeight="semibold" color="#7E7C73">
              {partnerData[0]?.email || "N/A"}
            </Text>
            <Text fontSize="16px" fontWeight="semibold" color="#7E7C73">
              {partnerData[0]?.phone || "N/A"}
            </Text>
          </Box>
        </Box>

        <Box
          padding="50px 30px"
          bgColor={_COLORS.white}
          borderRadius="10px"
          width={["100%", "65%"]}
        >
          <Flex justifyContent="space-between" alignItems="center" mb="20px">
            <Text color={_COLORS.primaryBtn} fontSize="24px" fontWeight="bold">
              General Infomation
            </Text>
            <Box boxSize="30px">
              <CustomModal
                icon={<FaRegEdit color={_COLORS.brand} fontSize={"2em"} />}
                header={`Update Information`}
                overflow="scroll"
                maxH={"500px"}
                iconColor={"#154141"}
              >
                <UpdateInfoModal
                  state={state}
                  data={partnerData}
                  height="300px"
                />
              </CustomModal>
            </Box>
          </Flex>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mb="20px"
            fontWeight="500"
          >
            <Text>Name</Text>
            <Text color="#7E7C73">{partnerData[0]?.name || "N/A"}</Text>
          </Flex>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mb="20px"
            fontWeight="500"
          >
            <Text>Email Address</Text>
            <Text color="#7E7C73">{partnerData[0]?.email || "N/A"}</Text>
          </Flex>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mb="20px"
            fontWeight="500"
          >
            <Text>Phone Number</Text>
            <Text color="#7E7C73">{partnerData[0]?.phone || "N/A"}</Text>
          </Flex>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mb="20px"
            fontWeight="500"
          >
            <Text>Business Name</Text>
            <Text color="#7E7C73">{partnerData[0]?.businessName || "N/A"}</Text>
          </Flex>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mb="20px"
            fontWeight="500"
          >
            <Text>CAC Registration Number</Text>
            <Text color="#7E7C73">{partnerData[0]?.cacNumber || "N/A"}</Text>
          </Flex>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mb="20px"
            fontWeight="500"
          >
            <Text>Location</Text>
            <Text color="#7E7C73">{partnerData[0]?.location || "N/A"}</Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default Info;

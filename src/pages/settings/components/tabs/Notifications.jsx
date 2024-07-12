// import { Box, Flex, Text} from "@chakra-ui/react";
// import { _COLORS } from "../../../../constant";
// import { Switch } from "@chakra-ui/react";
// import { getNotification } from "../../services/notification";
// import FullPageLoader from "../../../../components/FullPageLoader";
// import { useQuery } from "@tanstack/react-query";

function Notifications() {
  // const { data: notificationData = [], isLoading } = useQuery({
  //   queryFn:getNotification,
  //   queryKey: ["notification"],
  // });
  // return isLoading ? (
  //   <FullPageLoader />
  // ):(
  //   <Box width={"100%"} mt="20px">
  //     {/* <Text color={_COLORS.brand} fontWeight="700" fontSize="24px" pb="10px">
  //       Notification Settings
  //     </Text>
  //     <Text pb="50px" fontWeight="500" fontSize="18px">
  //       Update your personal details here
  //     </Text> */}
  //     <Box width="100%">
  //       {notificationData.map((item) => (
  //         <Box
  //           key={item.id}
  //           width="100%"
  //           bgColor={_COLORS.white}
  //           borderRadius="16px"
  //           padding="20px 20px"
  //           paddingBottom="30px"
  //           mb="20px"
  //         >
  //           <Flex
  //             width="100%"
  //             justifyContent="space-between"
  //             alignItems="center"
  //             mb="10px"
  //           >
  //             <Text fontWeight="500" fontSize="16px">
  //               {item?.title || "N/A"}
  //             </Text>
  //             <style>
  //               {`
  //               .css-dwwc7m{
  //                 border: 3px solid ${_COLORS.brand};
  //                 background: #fff;
  //               }
  //               .css-7roig{
  //                 background: ${_COLORS.brand}
  //               }
  //               .css-dwwc7m[aria-checked=true], .css-dwwc7m[data-checked] {
  //                 background: ${_COLORS.brand}50
  //               `}
  //             </style>
  //             <Switch colorScheme="purple" size="md" />
  //           </Flex>
  //           <Text color="#7E7C73" maxW="700px" fontSize={".8em"}>
  //             {item?.message || "N/A"}
  //           </Text>
  //         </Box>
  //       ))}
  //     </Box>
  //   </Box>
  // );
}

export default Notifications;

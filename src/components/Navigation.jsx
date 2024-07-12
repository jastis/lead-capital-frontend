import {
  Avatar,
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AiOutlineAlignLeft, AiOutlineBell } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { GlobalStateContext } from "../GlobalStateContext/GlobalState";
import { getPageTitle } from "./GetPageTitle";
import { useGetState } from "../GlobalStateContext/useGetState";
import { getPaartner } from "../pages/settings/services/partner";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES } from "../constants/navRoutes";

function Navigation() {
  const navigate = useNavigate()
  const { data: partnerData = [], isLoading } = useQuery({
    queryFn: getPaartner,
    queryKey: ["partner"],
  });
  const { state } = useGetState();
  console.log(state, "soso");
  const [width, setW] = useState("");
  const [mobile] = useMediaQuery("(max-width:480px)");
  const { setState } = useContext(GlobalStateContext);

  useEffect(() => {
    setW(document.getElementById("x")?.offsetWidth);
  }, []);

  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Flex w="100%" h="80px" position={"relative"} id="x">
      <Flex
        alignItems={"center"}
        position={"fixed"}
        top="0"
        bg="#fff"
        zIndex={1}
        p="20px 40px"
        w={width}
        h="80px"
        justifyContent={"space-between"}
        boxShadow="0px 3px 1px 0px #0000000d"
      >
        {mobile && (
          <AiOutlineAlignLeft
            fontSize={"1.5em"}
            cursor="pointer"
            onClick={() =>
              setState((prev) => ({
                toggle: !prev.toggle,
              }))
            }
          />
        )}

        <Box
          dangerouslySetInnerHTML={{
            __html: `<p style=font-size:1.3em;font-family:Montserrat;font-weight:800>${getPageTitle(
              pathname
            )}</p>`,
          }}
        />

        <Flex alignItems={"center"} gap="20px">
          <AiOutlineBell cursor={"pointer"} fontSize={"2em"} onClick={()=>{
           navigate(PROTECTED_ROUTES.notification);
          }} />
          <Box>
            <Image
              src={partnerData[0]?.image}
              h="50px"
              w="50px"
              borderRadius={"50px"}
            />
          </Box>

          {/* <Avatar
            size="md"
            name="Prosper Otemuyiwa"
            src="https://bit.ly/prosper-baba"
          /> */}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Navigation;

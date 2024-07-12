/* eslint-disable react/jsx-key */
import {
  Flex,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useContext, useState } from "react";
import { GlobalStateContext } from "../GlobalStateContext/GlobalState";
import { LogOutModal } from "./LogOutModal";
import { CustomSubNav } from "./CustomSubNav";
import { NAVS } from "../constants/sidebarNavList";

function Sidebar({ ...props }) {
  const [activeSubPage, setActiveSubPage] = useState(null);
  const [mobile] = useMediaQuery("(max-width:480px)");

  const { state, setState } = useContext(GlobalStateContext);

  return (
    <Flex
      h="100vh"
      w="20%"
      display={state?.toggle === false ? "none" : "flex"}
      {...props}
      position={"relative"}
    >
      <Flex
        position={"fixed"}
        w={state?.toggle ? "80%" : !state?.toggle && mobile ? "80%" : "20%"}
        display={state?.toggle === false ? "none" : "flex"}
        h="100vh"
        flexDir={"column"}
        bg="#fff"
        zIndex={"999"}
        justifyContent="space-between"
        py="20px"
      >
        <Image
          paddingLeft="20px"
          // pt="10px"
          w="200px"
          src={logo}
          alt="Lead Capital"
          // mb="90px"
        />
        <Flex flex=".9" flexDir={"column"} gap="30px">
          {NAVS.map(({ to, title, icon: Icon, subPages }, idx) => (
            <Flex>
              {!subPages ? (
                <NavLink
                  key={idx}
                  style={({ isActive }) =>
                    isActive
                      ? {
                          color: "#fff",
                          background: "#3C0B71",
                          width: "100%",
                          marginRight: "20px",
                          borderTopRightRadius: "5px",
                          borderBottomRightRadius: "5px",
                          padding: "7px",
                          paddingLeft: "30px",
                        }
                      : {
                          color: "#000",
                          width: "100%",
                          marginRight: "20px",
                          padding: "7px",
                          paddingLeft: "30px",
                        }
                  }
                  to={to}
                  {...(mobile
                    ? {
                        onClick: () =>
                          setState((prev) => ({ ...prev, toggle: false })),
                      }
                    : {})}
                >
                  <Flex
                    gap="10px"
                    alignItems={"center"}
                    fontWeight="600"
                    onClick={() => setActiveSubPage(null)}
                  >
                    <Icon fontSize={"1.3em"} />
                    <Text fontSize={".91em"}>{title}</Text>
                  </Flex>
                </NavLink>
              ) : (
                <NavLink
                  key={idx}
                  style={({ isActive }) =>
                    isActive
                      ? {
                          color: "#fff",
                          background: "#3C0B71",
                          width: "100%",
                          marginRight: "20px",
                          borderTopRightRadius: "5px",
                          borderBottomRightRadius: "5px",
                          padding: "7px",
                          paddingLeft: "30px",
                        }
                      : {
                          color: "#000",
                          width: "100%",
                          marginRight: "20px",
                          padding: "7px",
                          paddingLeft: "30px",
                        }
                  }
                  to={to}
                  {...(mobile
                    ? {
                        onClick: () =>
                          setState((prev) => ({ ...prev, toggle: false })),
                      }
                    : {})}
                >
                  <CustomSubNav
                    navTitle={title}
                    icon={Icon}
                    active={activeSubPage}
                    setActive={setActiveSubPage}
                    subPages={subPages}
                  />
                </NavLink>
              )}
            </Flex>
          ))}
        </Flex>

        <LogOutModal />
      </Flex>
    </Flex>
  );
}

export default Sidebar;


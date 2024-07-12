import { Box } from "@chakra-ui/react";
import { _COLORS } from "../../../constant";
import { useEffect, useState } from "react";
import Profile from "./tabs/Profile";


// import Support from "./tabs/Support";
import Support from "../../support";
import { Tabs, TabList, Tab } from "@chakra-ui/react";

function Nav({ ...props }) {
  const openSupportPage = props?.openSupport || false;
  const [tabToShow, setTabToShow] = useState("profile");

  console.log(openSupportPage, "[[");

  useEffect(() => {
    if (!openSupportPage) return;

    setTabToShow("support");
  }, [openSupportPage]);

  const activeColor = {
    bgColor: _COLORS.primaryBtn,
    color: "#fff",
    borderRadius: "4px",
  };
  return (
    <Box width={"100%"}>
      <Tabs
        variant="unstyled"
        width={"100%"}
        mb="50px"
        mt="30px"
        justifyContent="flex-start"
        alignItems="center"
        color={_COLORS.grey}
      >
        <TabList gap={["5px", 100]}>
          <Tab
            fontWeight="500"
            cursor="pointer"
            padding="5px 10px"
            _hover={{ bgColor: "#F0F0F0", color: _COLORS.primaryBtn }}
            _selected={{
              ...(tabToShow === "profile" ? activeColor : {}),
            }}
            onClick={() => setTabToShow("profile")}
            {...(tabToShow === "profile" ? activeColor : {})}
          >
            Profile
          </Tab>
      
          <Tab
            fontWeight="500"
            cursor="pointer"
            padding="5px 10px"
            _hover={{ bgColor: "#F0F0F0", color: _COLORS.primaryBtn }}
            _selected={{
              ...(tabToShow === "support" ? activeColor : {}),
            }}
            onClick={() => setTabToShow("support")}
            {...(tabToShow === "support" ? activeColor : {})}
          >
            Support
          </Tab>
        </TabList>
      </Tabs>

      <Box>
        {tabToShow === "profile" ? (
          <Profile />
        ) : (
          <Support />
        )}
      </Box>
    </Box>
  );
}

export default Nav;

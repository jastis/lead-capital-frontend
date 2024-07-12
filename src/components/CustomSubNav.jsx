import { Flex, Text } from "@chakra-ui/react";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { NavLink } from "react-router-dom";

export const CustomSubNav = ({
  icon: Icon,
  navTitle,
  subPages,
  active,
  setActive,
}) => {
  return (
    <>
      <Flex
        justifyContent={"space-between"}
        alignItems="center"
        onClick={() => setActive(navTitle)}
      >
        <Flex gap="10px" alignItems={"center"} fontWeight="600">
          {" "}
          <Icon fontSize={"1.3em"} />
          <Text fontSize={".91em"}>{navTitle}</Text>
        </Flex>
        {active === navTitle ? (
          <BiChevronDown fontSize={"1.2em"} />
        ) : (
          <BiChevronRight fontSize={"1.2em"} />
        )}
      </Flex>

      {subPages && active === navTitle && (
        <Flex
          flexDir={"column"}
          bg="#F8F2FF"
          color="#000"
          p="20px"
          margin="7px -7px -7px -30px"
          paddingLeft="50px"
          gap="20px"
        >
          {subPages?.map((nav, idx) => (
            <NavLink
              key={idx}
              style={({ isActive}) =>
                isActive
                  ? {
                      color: "#3C0B71",
                      fontWeight: "bold",
                    }
                  : {
                      color: "#000",
                    }
              }
              to={nav?.to}
            >
              <Text fontSize={".9em"}> {nav?.title}</Text>
            </NavLink>
          ))}
        </Flex>
      )}
    </>
  );
};

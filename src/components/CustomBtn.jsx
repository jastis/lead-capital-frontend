/* eslint-disable react/prop-types */
import { Button } from "@chakra-ui/react";
import { _COLORS } from "../constant";

export const CustomBtn = ({
  childComp,
  bg,
  color,
  text,
  border,
  width,
  height,
  handleClick,
  loading,
  type,
  disabled,
  fontSize,
  p,
  boxShadow,
}) => {
  return (
    <Button
      leftIcon={childComp}
      // width="100%"
      color={color || "white"}
      bg={bg || _COLORS.primaryBtn}
      borderRadius={"7px"}
      p={p}
      boxShadow={boxShadow}
      height={height}
      width={width}
      fontSize={fontSize}
      border={border}
      type={type}
      _hover={{
        bg: bg
      }}
      onClick={handleClick}
      isLoading={loading}
      isDisabled={disabled}
    >
      {text}
    </Button>
  );
};

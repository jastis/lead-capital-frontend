import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { SlReload } from "react-icons/sl";
import { FaFilter } from "react-icons/fa";
import { _COLORS } from "../constant";
import { CiSearch } from "react-icons/ci";

function Filter({
  filters = [],
  filterBy,
  info,
  searchFilter,
  searchPlaceholder,
}) {
  const [defaultValueState, setDefaultValueState] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  return (
    <Flex alignItems={"center"} mb="40px" gap="20px">
      {!showFilter ? (
        <Flex
          alignItems={"center"}
          gap="10px"
          cursor={"pointer"}
          onClick={() => setShowFilter((prev) => !prev)}
          w="fit-content"
          color={_COLORS.brand}
        >
          <FaFilter />
          <Text fontWeight={"700"}>Filter </Text>
        </Flex>
      ) : (
        <Flex alignItems={"center"} gap="20px">
          <InputGroup maxW={["100%", filters?.length > 0 ? "40%" : "100%"]}>
            <InputLeftElement
              pointerEvents="none"
              children={
                <CiSearch
                  style={{ marginTop: "10px" }}
                  fontSize={"1.8em"}
                  color="gray.300"
                />
              }
            />
            <Input
              placeholder={searchPlaceholder || "Search"}
              _placeholder={{
                color: "grey",
                fontSize: ".8rem",
              }}
              size={"lg"}
              color="black"
              outline="none"
              type="text"
              fontSize={".9rem"}
              _focus={{ outline: "none", boxShadow: "none", border: "none" }}
              borderRadius="10px"
              bg="#8080801c"
              _focusVisible={{ boxShadow: "none" }}
              onChange={(e) =>
                filterBy({ search: e.target.value, searchFilter })
              }
            />
          </InputGroup>
          <Flex flexDir={["column", "row"]} alignItems={"center"} gap="20px">
            {filters.map((filter, idx) => (
              <Selector
                idx={idx}
                filter={filter}
                filterBy={filterBy}
                defaultValueState={defaultValueState}
                info={info}
                keys={filters}
                searchFilter={searchFilter}
              />
            ))}
            <Flex>
              <SlReload
                cursor={"pointer"}
                onClick={() => {
                  filterBy(null);
                  setDefaultValueState({});
                }}
              />
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

export default Filter;

export const Selector = ({
  filterBy,
  filter,
  defaultValueState,
  info,
  idx,
  keys,
  searchFilter,
}) => {
  const selectRef = useRef(null);

  useEffect(() => {
    selectRef.current.value = "default";
  }, [defaultValueState]);

  const unique = (list) => {
    const unique = [];

    list.map((x) => {
      const xx = filter?.split(".")?.reduce((a, b) => a?.[b], x);
      console.log("xx", xx);
      return unique.filter((data) => data === xx).length > 0
        ? null
        : unique.push(xx);
    });

    return unique;
  };

  return (
    <Select
      key={idx}
      onChange={(e) => {
        console.log(e.target.value, "????");
        filterBy({ key: filter, value: e.target.value });
      }}
      {..._SELECT_STYLE}
      defaultValue={"default"}
      ref={selectRef}
    >
      <option disabled value={"default"}>
        {wordSpacing(
          filter?.split(".")?.[1]
            ? filter?.split(".")?.[1]
            : filter?.split(".")?.[0]
        )}
      </option>

      {unique(info).map((data, idx) => (
        <option key={idx} value={data}>
          {data}
        </option>
      ))}
    </Select>
  );
};

export const _SELECT_STYLE = {
  borderRadius: "10px",
  bg: "#8080801c",
  _focusVisible: { boxShadow: "none" },
  maxW: ["100%", "150px"],
  size: "sm",

  h: "50px",
};

const wordSpacing = (sentense) =>
  sentense
    ?.split("")
    ?.map((char) =>
      char === char.toUpperCase() ? ` ${char.toLowerCase()}` : char
    )
    ?.join("");

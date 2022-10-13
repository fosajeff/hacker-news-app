import React from "react";
import { IconButton, Flex, useColorModeValue, Text } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        icon={<HamburgerIcon />}
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Filter Items
      </Text>
    </Flex>
  );
};

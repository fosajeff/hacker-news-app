import React from "react";
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { NavItem } from "./NavItem";

export const SidebarContent = ({ onSort, onClose, ...rest }) => {
  const LinkItems = [
    { name: "Story", onClick: () => onSort("story") },
    { name: "Job", onClick: () => onSort("job") },
    { name: "Poll", onClick: () => onSort("poll") },
    { name: "Pollopt", onClick: () => onSort("pollopt") },
    { name: "Comment", onClick: () => onSort("comment") },
  ];

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Filters
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem onClick={link.onClick} key={link.name}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

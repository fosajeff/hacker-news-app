import { Link, useColorModeValue } from "@chakra-ui/react";

export const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("green.200", "green.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

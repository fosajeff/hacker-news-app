import { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Input,
  useColorModeValue,
  Stack,
  Text,
  Link,
  useDisclosure,
  Show,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Navbar = (props) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    props.handleSearch(text);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Link
            _hover={{
              textDecoration: "none",
            }}
            href="/"
          >
            <Text
              color={"green.500"}
              fontSize="2xl"
              fontFamily="monospace"
              fontWeight="bold"
            >
              Hacker
            </Text>
          </Link>
          <Show breakpoint="(min-width: 770px)">
            <form onSubmit={handleSubmit}>
              <Input
                value={text}
                onSubmit={handleSubmit}
                onChange={handleChange}
                focusBorderColor="green.400"
                placeholder="&#128269; Search item ..."
              />
            </form>
          </Show>
        </HStack>
        <Flex alignItems={"center"}>
          <Link _hover={{ textDecoration: false }} href="/add">
            <Button variant={"solid"} colorScheme={"teal"} size={"md"} mr={4}>
              Create Item
            </Button>
          </Link>
        </Flex>
      </Flex>

      <Show breakpoint="(max-width: 769px)">
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <form onSubmit={handleSubmit}>
                <Input
                  value={text}
                  onSubmit={handleSubmit}
                  onChange={handleChange}
                  focusBorderColor="green.400"
                  placeholder="&#128269; Search item ..."
                />
              </form>
              <Button
                onClick={handleSubmit}
                colorScheme="teal"
                bg="teal"
                color="white"
                _hover={{
                  bg: "teal.500",
                }}
                isFullWidth
              >
                Submit
              </Button>
            </Stack>
          </Box>
        ) : null}
      </Show>
    </Box>
  );
};

export default Navbar;

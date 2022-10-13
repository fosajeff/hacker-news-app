import {
  Box,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";

import { unixDateToTimeAgo } from "../utils";

const Item = ({ data }) => {
  return (
    <Box py={6}>
      <Box
        maxW={"445px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Stack mb={6} direction={"row"} spacing={4} align={"center"}>
          <Avatar src={"https://i.pravatar.cc/300"} alt={"Author"} />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>{data.by}</Text>
            <Stack direction={"row"}>
              <Text color={"gray.500"}>{unixDateToTimeAgo(data.time)} · </Text>
              <Text color={"green.500"} fontSize={"sm"}>
                {data.is_hacker_item && <span>hacker &#10003;</span>}
              </Text>
            </Stack>
          </Stack>
        </Stack>

        <Stack>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            <Link
              href={`/items/${data.id}`}
              _hover={{
                textDecoration: "none",
                color: "grey",
              }}
            >
              {data.title}
            </Link>
          </Heading>
          <Text color={"gray.500"}>{data.text}</Text>
        </Stack>

        <Box mt={5}>
          <Stack mb={6} direction={"row"} spacing={3} align={"center"}>
            <Text
              noOfLines={[1, 2, 3]}
              color={"green.500"}
              fontWeight={800}
              fontSize={"sm"}
              letterSpacing={1.1}
            >
              #{data.type}
            </Text>

            <Text
              color={"grey"}
              fontWeight={800}
              fontSize={"sm"}
              letterSpacing={1.1}
            >
              · {data.score} {parseInt(data.score) > 1 ? "points" : "point"}
            </Text>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Item;

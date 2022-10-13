import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Avatar,
  Button,
  useColorModeValue,
  Link,
  Container,
} from "@chakra-ui/react";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import { unixDateToTimeAgo } from "../utils";
import { getSingleItem, getAuthor } from "../services/httpService";

const ItemSingle = (props) => {
  const [data, setDate] = useState({});
  const [author, setAuthor] = useState({});

  useEffect(() => {
    async function fetchSingelItem() {
      const singleItem = await getSingleItem(props.match.params.id);
      if (singleItem) {
        setDate(singleItem);
      }
      const authorData = await getAuthor(singleItem?.by);
      if (author) {
        setAuthor(authorData);
      }
      console.log(author);
    }
    fetchSingelItem();
  }, []);

  return (
    <>
      <Box textAlign="center" my={5}>
        <Button
          onClick={() => props.history.goBack()}
          variant={"solid"}
          colorScheme={"teal"}
          size={"md"}
          mr={4}
        >
          Return back
        </Button>
      </Box>
      <Container centerContent maxW="container.2lg">
        <Stack direction={["column", "row"]} spacing="24px">
          <Box
            maxW={"700px"}
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
                  <Text color={"gray.500"}>
                    {unixDateToTimeAgo(data.time)} ·{" "}
                  </Text>
                  <Text color={"green.500"} fontSize={"sm"}>
                    {data.is_hacker_item && (
                      <span>Original item posted on hacker &#10003;</span>
                    )}
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
                {data.url ? (
                  <Link
                    _hover={{
                      textDecoration: "none",
                      color: "grey",
                    }}
                    href={data.url}
                    isExternal
                  >
                    {data.title} <ExternalLinkIcon fontSize="sm" mx="2px" />
                  </Link>
                ) : (
                  <Link
                    href={`/items/${data.id}`}
                    _hover={{
                      textDecoration: "none",
                      color: "grey",
                    }}
                  >
                    {data.title}
                  </Link>
                )}
              </Heading>
              <Text color={"gray.500"}>{data.text}</Text>
            </Stack>

            <Box mt={5}>
              <Stack mb={6} direction={"row"} spacing={3} align={"center"}>
                <Text
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

          <Box
            maxW={"400px"}
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
                <Text fontWeight={600}>{author?.id}</Text>
                <Stack direction={"row"}>
                  <Text color={"gray.500"}>
                    Joined {unixDateToTimeAgo(author?.created)}
                  </Text>
                </Stack>
              </Stack>
            </Stack>

            <Stack>
              <Text
                dangerouslySetInnerHTML={{ __html: author?.about }}
                color={"gray.500"}
              />
            </Stack>

            <Box mt={5}>
              <Stack mb={6} direction={"row"} spacing={3} align={"center"}>
                <Text
                  color={"grey"}
                  fontWeight={800}
                  fontSize={"sm"}
                  letterSpacing={1.1}
                >
                  Karma: {author?.karma}
                </Text>

                <Text
                  color={"grey"}
                  fontWeight={800}
                  fontSize={"sm"}
                  letterSpacing={1.1}
                >
                  · {author?.submitted?.length}{" "}
                  {author?.submitted?.length > 1 ? "submissions" : "submission"}
                </Text>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default ItemSingle;

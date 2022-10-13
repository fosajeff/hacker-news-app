import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";

const NotFound = () => {
  return (
    <Container maxW="container.lg">
      <Box textAlign="center" py={10} px={6}>
        <WarningTwoIcon boxSize={"50px"} color={"orange.300"} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          This is the headline
        </Heading>
        <Text color={"gray.500"}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </Text>
      </Box>
    </Container>
  );
};
export default NotFound;

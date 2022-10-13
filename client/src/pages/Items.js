import React from "react";

import { Center, Container, Spinner } from "@chakra-ui/react";
import Content from "../components/Content";
import PageLayout from "../components/PageLayout";

const Items = ({ loading, handleSort, items }) => {
  if (loading) {
    return (
      <Center mt={5}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="green.500"
          size="xl"
        />
      </Center>
    );
  }

  return (
    <Container maxW="container.xlg">
      <PageLayout onSort={handleSort}>
        <Content items={items} />
      </PageLayout>
    </Container>
  );
};

export default Items;

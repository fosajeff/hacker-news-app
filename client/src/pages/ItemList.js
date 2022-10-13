import { SimpleGrid, Box } from "@chakra-ui/react";
import Item from "../components/Item";

const ItemList = ({ items }) => {
  return (
    <SimpleGrid minChildWidth="320px" spacing={3}>
      {items.map((item) => (
        <Box>
          <Item data={item} />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default ItemList;

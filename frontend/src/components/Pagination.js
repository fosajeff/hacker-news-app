import { Box, HStack } from "@chakra-ui/react";
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <HStack spacing="5px">
      {pages.map((page) =>
        page === currentPage ? (
          <Box
            role="button"
            key={page}
            textAlign="center"
            rounded={"md"}
            w="40px"
            bg="green.500"
            color="white"
            px={3}
            py={1}
          >
            {page}
          </Box>
        ) : (
          <Box
            role="button"
            onClick={() => onPageChange(page)}
            key={page}
            textAlign="center"
            rounded={"md"}
            w="40px"
            bg="white"
            color="green.500"
            px={3}
            py={1}
          >
            {page}
          </Box>
        )
      )}
    </HStack>
  );
};

export default Pagination;

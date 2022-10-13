import {
  Box,
  Center,
  useColorModeValue,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Textarea,
  VStack,
  Select,
  useToast,
  Link,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState } from "react";
import { createItem } from "../services/httpService";

const AddItem = () => {
  const toast = useToast();
  const [data, setData] = useState({
    title: "",
    text: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const newItem = await createItem(data);

      setLoading(false);
      toast({
        title: "Success",
        render: () => (
          <Alert status="success">
            <AlertIcon />
            <Link href={`/items/${newItem?.id}`}>Click here to view</Link>
          </Alert>
        ),
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error while creating item",
        description: "Fill form correctly before submitting",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Center mt={4}>
      <Box>
        <Heading
          textAlign="center"
          fontSize={{
            base: "4xl",
            md: "5xl",
          }}
          mb={5}
        >
          Add New Item
        </Heading>

        <Box
          maxW={"445px"}
          w={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          borderRadius="lg"
          p={8}
          color={useColorModeValue("gray.700", "whiteAlpha.900")}
          shadow="base"
        >
          <VStack spacing={5}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>

              <InputGroup>
                <Input
                  value={data.title}
                  onChange={handleChange}
                  focusBorderColor="green.400"
                  type="text"
                  name="title"
                  placeholder="Your Title"
                />
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Type</FormLabel>

              <InputGroup>
                <Select
                  value={data.type}
                  focusBorderColor="green.400"
                  onChange={handleChange}
                  name="type"
                  placeholder="Select option"
                >
                  <option value="story">Story</option>
                  <option value="job">Job</option>
                  <option value="poll">Poll</option>
                  <option value="pollopt">Pollopt</option>
                  <option value="comment">Comment</option>
                </Select>
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Text</FormLabel>

              <Textarea
                value={data.text}
                onChange={handleChange}
                focusBorderColor="green.400"
                name="text"
                placeholder="Your text"
                rows={8}
                resize="none"
              />
            </FormControl>

            <Button
              isLoading={loading}
              loadingText="Please wait..."
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
          </VStack>
        </Box>
      </Box>
    </Center>
  );
};

export default AddItem;

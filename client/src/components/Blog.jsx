import { useState } from 'react'
import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  StackDivider,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  Button,
  Heading,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { StarIcon, DeleteIcon } from '@chakra-ui/icons'

const Blog = ({ blog, handleLikes, handleRemove, userId }) => {
  const [likes, setLikes] = useState(blog.likes)
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const updateLikes = async blog => {
    const res = await handleLikes(blog)
    blog.likes = res.likes
    setLikes(res.likes)
  }

  const likeButton = blog => (
    <Button
      isLoading={isLoading}
      id="btn-likes"
      flex="1"
      variant="ghost"
      leftIcon={<StarIcon />}
      onClick={() => {
        setIsLoading(true)
        updateLikes(blog)
          .catch(exception => {
            console.log(exception)
          })
          .finally(() => {
            setIsLoading(false)
          })
      }}
    >
      Like
    </Button>
  )

  const deleteData = async blog => {
    try {
      await handleRemove(blog)
      setIsLoading(false)
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  const removeButton = blog => (
    <>
      <Button flex="1" variant="ghost" id="button-remove" onClick={onOpen} leftIcon={<DeleteIcon />}>
        Delete
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remove blog {blog.title}</ModalHeader>
          <ModalFooter>
            <Button
              isLoading={isLoading}
              colorScheme="red"
              mr={3}
              onClick={() => {
                setIsLoading(true)
                deleteData(blog)
                  .then(() => {
                    onClose()
                  })
                  .catch(exception => {
                    console.log(exception)
                  })
                  .finally(() => {
                    setIsLoading(false)
                  })
              }}
            >
              Remove
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )

  return (
    <AccordionItem>
      <AccordionButton>
        <Heading size="xm" textAlign="center" p={4} minW="container.md">
          {blog.title}
        </Heading>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel pb={4} minW="container.md">
        <Card>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Author
                </Heading>
                <Text pt="2" fontSize="sm">
                  {blog.author}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Likes
                </Heading>
                <Text pt="2" fontSize="sm">
                  {likes}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  URL
                </Heading>
                <Text pt="2" fontSize="sm">
                  {blog.url}
                </Text>
              </Box>
            </Stack>
          </CardBody>
          <CardFooter justify="space-between" flexWrap="wrap">
            {likeButton(blog)}
            {userId === blog.user?.id && removeButton(blog)}
          </CardFooter>
        </Card>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default Blog

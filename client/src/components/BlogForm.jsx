import { useState } from 'react'
import {
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  useToast,
  Button,
} from '@chakra-ui/react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  const addBlog = () => {
    setIsSubmitting(true)
    try {
      createBlog({
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      })
      onClose()
      toast({
        title: 'Looks great',
        description: 'New blog ' + newTitle + ' by ' + newAuthor + ' added',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch (exception) {
      toast({
        title: 'Something wrong',
        description: exception.response.data?.error ?? '',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
    // .then(() => {
    //   onClose()
    //   toast({
    //     title: 'Looks great',
    //     description: 'New blog ' + newTitle + ' by ' + newAuthor + ' added',
    //     status: 'success',
    //     duration: 3000,
    //     isClosable: true,
    //   })
    //   setNewTitle('')
    //   setNewAuthor('')
    //   setNewUrl('')
    // })
    // .catch(exception => {
    //   toast({
    //     title: 'Something wrong',
    //     description: exception.response.data?.error ?? '',
    //     status: 'error',
    //     duration: 5000,
    //     isClosable: true,
    //   })
    // })
    // .finally(() => {
    //   setIsSubmitting(false)
    // })
  }

  const handleTitleChange = event => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = event => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = event => {
    setNewUrl(event.target.value)
  }

  return (
    <>
      <Button onClick={onOpen} mt={5} mb={3}>
        Create new blog
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new blog</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input id="input-title" placeholder="title" value={newTitle} onChange={handleTitleChange} />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Author</FormLabel>
              <Input id="input-author" placeholder="author" value={newAuthor} onChange={handleAuthorChange} />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Url</FormLabel>
              <Input id="input-url" placeholder="url" value={newUrl} onChange={handleUrlChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button id="add-btn" colorScheme="blue" mr={3} onClick={addBlog} isLoading={isSubmitting}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default BlogForm

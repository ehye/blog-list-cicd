import { useState, useEffect, useRef } from 'react'
import { Center, Container, Button, Flex, Spacer, Box, Heading, useToast, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'

const ColorModeToggler = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box>
      <Button variant="ghost" onClick={toggleColorMode}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Box>
  )
}

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const toast = useToast()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const createBlog = async ({ title, author, url }) => {
    const createdBlog = await blogService.create({ title, author, url })
    const newUser = { ...createdBlog, user: { id: createdBlog.user } }
    setBlogs(blogs.concat(newUser))
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    toast({
      title: 'Goodbye',
      description: 'See you next time',
      status: 'success',
      duration: 1000,
      isClosable: true,
    })
  }

  return (
    <>
      <ColorModeToggler />
      <Center flexDirection="column">
        {!user && <LoginForm setUser={setUser} />}
        {user && (
          <>
            <Button id="button-logout" onClick={handleLogout} variant="ghost" pos="absolute" top="1" right="150">
              logout
            </Button>
            <Heading size="md" pt="80px" pb="20px">
              Blog List App
            </Heading>
            <BlogForm createBlog={createBlog} />
            <BlogList blogs={blogs} setBlogs={setBlogs} user={user} />
          </>
        )}
      </Center>
    </>
  )
}

export default App

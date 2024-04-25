import { useState } from 'react'
import { Heading, InputGroup, InputRightElement, Input, Button, useToast, Flex, Box } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import loginService from '../services/login'

function PasswordInput({ password, handlePasswordChange }) {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? 'text' : 'password'}
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <InputRightElement width="4.5rem" tabIndex="-1">
        <Button h="1.75rem" size="sm" onClick={handleClick} tabIndex="-1">
          {show ? <ViewOffIcon /> : <ViewIcon />}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('root')
  const [password, setPassword] = useState('root')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user)
      toast({
        title: 'Welcome ' + user.name,
        description: 'Login success',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      setTimeout(() => {
        setUsername('')
        setPassword('')
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      }, 1000)
    } catch (exception) {
      toast({
        title: 'Something wrong',
        description: exception.response.data?.error ?? '',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Flex direction={'column'} width={2} minWidth="max-content" gap={6} pos={'relative'} top={300}>
      <Heading size="md" pt="80px" pb="20px" textAlign={'center'}>
        Blog List App
      </Heading>
      <Input
        pr="4.5rem"
        id="username"
        placeholder="Username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <PasswordInput password={password} handlePasswordChange={({ target }) => setPassword(target.value)} />
      <Button
        colorScheme="blue"
        id="login-button"
        onClick={handleLogin}
        isLoading={isLoading}
        loadingText="Logging in..."
      >
        Login
      </Button>
    </Flex>
  )
}

export default LoginForm

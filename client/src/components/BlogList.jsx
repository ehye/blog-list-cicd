import { useState, useEffect } from 'react'
import { Accordion, Skeleton, useToast } from '@chakra-ui/react'
import Blog from './Blog'
import blogService from '../services/blogs'

const BlogList = ({ blogs, setBlogs, user }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const toast = useToast()

  useEffect(() => {
    blogService.setToken(user.token)
    blogService.getAll().then(initialBlogs => {
      setIsLoaded(true)
      return setBlogs(initialBlogs)
    })
  }, [setBlogs, user.token])

  const handleLikes = async blogObject => {
    const updatedBlog = {
      user: blogObject.user.id,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url,
      likes: blogObject.likes + 1,
    }
    const res = await blogService.update(blogObject.id, updatedBlog)
    return res
  }

  const handleRemove = async blogObject => {
    await blogService.remove(blogObject.id)
    const blogs = await blogService.getAll()
    setBlogs(blogs)
    toast({
      title: 'Done!',
      description: 'Blog ' + blogObject.title + ' has been deleted',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  return (
    <Accordion id="blog-list" allowMultiple>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog, i) => (
          <Skeleton key={i} isLoaded={isLoaded}>
            <Blog blog={blog} handleLikes={handleLikes} handleRemove={handleRemove} userId={user.id} />
          </Skeleton>
        ))}
    </Accordion>
  )
}

export default BlogList

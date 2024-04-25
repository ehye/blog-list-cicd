import { expect, describe, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> the event handler received props with the right details when submit', async () => {
  const mockHandler = vi.fn()
  const user = userEvent.setup()
  render(<BlogForm createBlog={mockHandler} />)

  const createModalButton = screen.getByText('Create new blog')
  await user.click(createModalButton)
  const inputTitle = screen.getByPlaceholderText('title')
  const inputAuthor = screen.getByPlaceholderText('author')
  const inputUrl = screen.getByPlaceholderText('url')

  await user.type(inputTitle, 'a title')
  await user.type(inputAuthor, 'a author')
  await user.type(inputUrl, 'a url')

  const addButton = screen.getByText('Add')
  await user.click(addButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('a title')
  expect(mockHandler.mock.calls[0][0].author).toBe('a author')
  expect(mockHandler.mock.calls[0][0].url).toBe('a url')
})

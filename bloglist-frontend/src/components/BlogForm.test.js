import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'


test('calls event handler with right details when a blog is created', async () => {

  const blog = {
    title: 'Tester',
    author: 'J.D.',
    url: 'https://test.com'
  }


  const addBlog = jest.fn()
  const user = userEvent.setup()

  
  render(<BlogForm addBlog={addBlog}/>)

  const titleInput = screen.getByPlaceholderText('write title here')
  const authorInput = screen.getByPlaceholderText('write author here')
  const urlInput = screen.getByPlaceholderText('write url here')
  const sendButton = screen.getByText('save')

  await userEvent.type(titleInput, blog.title)
  await screen.findByDisplayValue(blog.title)

  await userEvent.type(authorInput, blog.author)
  await screen.findByDisplayValue(blog.author)

  await userEvent.type(urlInput, blog.url)
  await screen.findByDisplayValue(blog.url)



  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('Tester')
  expect(addBlog.mock.calls[0][0].author).toBe('J.D.')
  expect(addBlog.mock.calls[0][0].url).toBe('https://test.com')
})




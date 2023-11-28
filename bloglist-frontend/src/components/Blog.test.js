import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'react tester'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
  
  
  /*const {container} = render (<Blog blog={blog}/>)
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )*/


})

test('does not render this', () => {
  
  const blog = {
    url: 'https://tester.com',
    likes: 120
  }


  render(<Blog blog={blog} />)

  const element = screen.queryByText('do not want this thing to be rendered')
  expect(element).toBeNull()
})


test('url and likes are shown when details is clicked', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'react tester',
    url: 'https://tester.com',
    likes: 120
  }

  render(<Blog blog={blog} />)

  const button = screen.getByText('details')
  await userEvent.click(button)

  expect(screen.getByText(blog.url)).toBeInTheDocument()
  expect(screen.getByText(`likes: ${blog.likes}`)).toBeInTheDocument()
})

test('event handler called twice if like button clicked twice', async () => {

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'react tester',
    url: 'https://tester.com',
    likes: 120
  }

  const mockUpdateLikes = jest.fn()

  render(<Blog blog={blog} updateLikes={mockUpdateLikes} />)

  const button = screen.getByText('likes')
  await userEvent.click(button)
  expect(mockUpdateLikes).toHaveBeenCalledTimes(1)
  await userEvent.click(button)
  expect(mockUpdateLikes).toHaveBeenCalledTimes(2)
  
})





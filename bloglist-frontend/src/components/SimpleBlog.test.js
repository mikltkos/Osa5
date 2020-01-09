import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'testiploki',
    author: 'Teppo Testaaja',
    likes: 10
  }

  const handleClick = () => {
    console.log('click')
  }

  const component = render(
    <SimpleBlog blog={blog} onClick={handleClick}/>
  )

  const div = component.container.querySelector('.titleAndAuthor')
  expect(div).toHaveTextContent('testiploki Teppo Testaaja')

  const tdiv = component.container.querySelector('.likes')
  expect(tdiv).toHaveTextContent('blog has 10 likes')

})

test('button test', () => {
  const blog = {
    title: 'testiploki',
    author: 'Teppo Testaaja',
    likes: 10
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler}/>
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)

})
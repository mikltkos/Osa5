import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('Blog tests', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'testiploki',
      author: 'Teppo Testaaja',
      url: 'http://testurl.com',
      likes: 10,
      user: { name: 'Teppo Testaaja', username: 'testaaja' }
    }
    const blogs = [{}]
    const setBlogs = () => {}
    const setErrorMessage = () => {}
    const user = { name: 'Teppo Testaaja' }

    component = render(
      <Blog
        blog={blog}
        blogs={blogs}
        setBlogs={setBlogs}
        setErrorMessage={setErrorMessage}
        user={user}
      >
        <div className='blogTitle'/>
      </Blog>
    )
  })

  afterEach(cleanup)

  test('at start only title and author are shown', () => {
    const blogInfo = component.container.querySelector('.blogInfo')

    expect(blogInfo).toHaveStyle('display: none')
  })

  test('clicking title div shows info', () => {

    const blogTitle = component.container.querySelector('.blogTitle')

    const blogInfo = component.container.querySelector('.blogInfo')

    fireEvent.click(blogTitle)

    expect(blogInfo).not.toHaveStyle('display: none')
  })

})
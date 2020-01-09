import React from 'react'
import { render, cleanup, waitForElement } from '@testing-library/react'
import App from './App'


describe('<App />', () => {

  afterEach(cleanup)

  test.only('if no user logged, blogs are not rendered', async () => {
    let component
    component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Login')
    )
    expect(component.container).toHaveTextContent('Login')
  })

  test('if user is logged, blogs are rendered', async () => {  //tehtävä 5.17,en saanut tätä testiä toimimaan millään
    let component
    const user = {
      name: 'Teppo Testaaja',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhYWphIiwiaWQiOiI1ZGJiZTQ4ZDNlYzdlNTM1ZjI1NjZlYzciLCJpYXQiOjE1NzMzMjc3ODR9.hpO4ILK2u_wbIdqMG5-TGnOYcLL8zGPoBjYMRHORTPM',
      username: 'testaaja'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.container.querySelector('.blogs')
    )
    component.debug()
    const blogs = component.container.querySelectorAll('.blog')
    console.log('blogs: ', blogs)
    expect(blogs.length).toBe(6)
  })
})
import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState({ className: '', message: '' })
  const [user, setUser] = useState(null)
  const blogFormRef = React.createRef()
  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const usernameInput = { 'type': username.type, 'value': username.value, 'onChange': username.onChange }
  const passwordInput = { 'type': password.type, 'value': password.value, 'onChange': password.onChange }


  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        //console.log('initialBlogs: ', initialBlogs)
        setBlogs(initialBlogs.sort((a, b) => b.likes - a.likes))
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()
    try{
      console.log('username: ', username)
      setErrorMessage({ className: 'notice', message: `${username.value} logged out` })

      await window.localStorage.removeItem('loggedBlogappUser')
      const user = null
      setUser(user)
      setTimeout(() => {
        const emptyErrorMessage = {
          className: '',
          message: ''
        }
        setErrorMessage(emptyErrorMessage)
      },2000)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('username: ', username.value, 'password: ', password.value)
    try{
      const user = await loginService.login({
        username: username.value, password: password.value
      })
      console.log('user: ', user)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setErrorMessage({ className: 'notice', message: `${user.username} logged in` })
      console.log('token', user.token)
      blogService.setToken(user.token)
      setUser(user)
      setTimeout(() => {
        const emptyErrorMessage = {
          className: '',
          message: ''
        }
        setErrorMessage(emptyErrorMessage)
      },2000)
    } catch(error) {
      setErrorMessage({
        className: 'error',
        message: 'wrong username or password'
      })
      setTimeout(() => {
        const emptyErrorMessage = {
          className: '',
          message: ''
        }
        setErrorMessage(emptyErrorMessage)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form className='loginForm' onSubmit={handleLogin}>
      <div>
        <h2>Log in to appication</h2>
        username
        <input {...usernameInput}/>
      </div>
      <div>
        password
        <input {...passwordInput}/>
      </div>
      <button type="submit">Login</button>
    </form>
  )

  const blogForm = () => (

    <div className='blogs'>
      {blogs.map((blog) =>
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          setErrorMessage={setErrorMessage}
          user={user}
        />
      )}
    </div>
  )

  const handleAddBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    await blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        setErrorMessage({
          className: 'notice',
          message: `a new blog ${data.title} by ${data.author} added`
        })
        title.reset()
        author.reset()
        url.reset()
        setTimeout(() => {
          const emptyErrorMessage = {
            className: '',
            message: ''
          }
          setErrorMessage(emptyErrorMessage)
        }, 5000)
      })
      .catch((error) => {
        setErrorMessage({
          className: 'error',
          message: error.message
        })
        setTimeout(() => {
          const emptyErrorMessage = {
            className: '',
            message: ''
          }
          setErrorMessage(emptyErrorMessage)
        }, 5000)

      })
  }

  const Notification = ({ className, message }) => {
    if(message === ''){
      return null
    }
    return (
      <div className={className}>
        {message}
      </div>
    )
  }

  return (
    <div>
      <Notification
        className={errorMessage.className}
        message={errorMessage.message}
      />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p><button onClick={handleLogout}>logout</button>
          <h2>Blogs</h2>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <NewBlogForm
              handleAddBlog={handleAddBlog}
              title={title}
              author={author}
              url={url}
            />
          </Togglable>
          {blogForm()}
        </div>
      }
    </div>
  )
}

export default App

import React, { useState } from 'react'
import blogService from '../services/blogs'
import propTypes from 'prop-types'


const Blog = ({ blog, blogs, setBlogs, setErrorMessage, user }) => {

  const [showInfo, setShowInfo] = useState(false)
  const id = blog.id

  const blogStyle = { display: showInfo ? '' : 'none' }

  const handleShowInfo = () => {
    setShowInfo(!showInfo)
  }

  const handleRemove = () => {
    console.log('remove')
    const result = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if(result === true){
      blogService
        .remove(blog.id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id))
          setErrorMessage({ className: 'notice', message: `blog ${blog.title} deleted` })
          setTimeout(() => {
            setErrorMessage({ className: '', message: '' })
          }, 2000)
        })
    }
  }

  const handleAddLikes = () => {
    console.log('handleAddLikes')
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    }
    console.log('blog.user.name: ', blog.user.name)
    blogService
      .update(blog.id, blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog).sort((a, b) => b.likes - a.likes))
        //console.log('blogs: ', blogs)
        console.log('returnedBlog: ', returnedBlog)
        setErrorMessage({
          className: 'notice',
          message: `one likes added to ${returnedBlog.title}`
        })
        setTimeout(() => {
          setErrorMessage({ className: '', message: '' })
        }, 2000)
      })
      .catch((error) => {
        setErrorMessage({
          className: 'error',
          message: `${error.message}, user must be owner of the blog`
        })
        setTimeout(() => {
          setErrorMessage({ className: '', message: '' })
        }, 3000)
      })
  }
  if(user.name === blog.user.name){
    return (
      <div className='blog'>
        <div className='blogTitle' onClick={handleShowInfo}>{blog.title} {blog.author}</div>
        <div className='blogInfo'style={blogStyle}>
          <div><a href={blog.url}>{blog.url}</a></div>
          <div>{blog.likes} likes <button onClick={handleAddLikes}>like</button></div>
          <div>added by {blog.user.name}</div>
          <div><button className="remove" onClick={handleRemove}>remove</button></div>
        </div>
      </div>
    )
  }
  return (
    <div className='blog'>
      <div className='blogTitle' onClick={handleShowInfo}>{blog.title} {blog.author}</div>
      <div className='blogInfo'style={blogStyle}>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>{blog.likes} likes <button onClick={handleAddLikes}>like</button></div>
        <div>added by {blog.user.name}</div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: propTypes.object.isRequired,
  blogs: propTypes.array.isRequired,
  setBlogs: propTypes.func.isRequired,
  setErrorMessage: propTypes.func.isRequired,
  user: propTypes.object.isRequired
}

export default Blog
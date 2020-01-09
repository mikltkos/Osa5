import React from 'react'
import propTypes from 'prop-types'


const NewBlogForm = ({ handleAddBlog, title, author, url }) => {

  const titleInput = { 'type': title.type, 'value': title.value, 'onChange': title.onChange }
  const authorInput = { 'type': author.type, 'value': author.value, 'onChange': author.onChange }
  const urlInput = { 'type': url.type, 'value': url.value, 'onChange': url.onChange }

  return (
    <form onSubmit={handleAddBlog}>
      <div>
        <h2>Create new</h2>
        <div>
                title
          <input {...titleInput} />
        </div>
        <div>
                author
          <input {...authorInput} />
        </div>
        <div>
                url
          <input {...urlInput} />
        </div>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

NewBlogForm.propTypes = {
  handleAddBlog: propTypes.func.isRequired,
  title: propTypes.object.isRequired,
  author: propTypes.object.isRequired,
  url: propTypes.object.isRequired
}

export default NewBlogForm
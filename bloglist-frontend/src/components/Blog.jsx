
import {useState} from 'react'

const Blog = ({ blog,user,deleteBlog,updateLikes }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

 

  const [showDetails, setShowDetails] = useState(false)
  const hideWhenVisible = {display : showDetails ? 'none' : ''}
  const showWhenVisible = {display : showDetails ? ' ' : 'none'}

  const toggleVisibility = () => {
   
    setShowDetails(!showDetails)

  }


  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>details</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.title}</p>
        <p>{blog.author}</p>
         <p>{blog.url}</p>
        <p>likes: {blog.likes} <button onClick={() => updateLikes(blog.id)}>likes</button> </p>
        <p>{user}</p>
        <button onClick={() => deleteBlog(blog)}>remove</button>
       <button  onClick={toggleVisibility}>hide</button>
      </div>
      
  </div>
)}



export default Blog
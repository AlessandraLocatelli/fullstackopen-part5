
import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'



const App = () => {


  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [info, setInfo] = useState({ message: null })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)




  useEffect(() => {

    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)

      })


  }, [])

  useEffect(() => {

    const loggedUserJSON =
      window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }


  }, [])




  const notifyWith = (message, type = 'info') => {

    setInfo({ message, type })
    setTimeout(() => {

      setInfo({ message: null })

    }, 3000)

  }




  const handleLogin = async (event) => {
    event.preventDefault()
    try {

      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      notifyWith('wrong username or password', 'error')
      setTimeout(() => {
        setInfo({ message: null })
      }, 5000)
    }
  }


  const handleLogout = async (event) => {

    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
  }


  const blogForm = () => (
    <Togglable buttonLabel='new blog'>
      <BlogForm 
        addBlog ={addBlog}
        title= {title}
        author = {author}
        url = {url}
        handleChange={handleBlogChange}
      />
     
    </Togglable>
  )

  const handleBlogChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
  
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'author') {
      setAuthor(value);
    } else if (name === 'url') {
      setUrl(value)
    }
  }
  

  const addBlog = (event) => {
    event.preventDefault()
  
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
  
    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
  
        notifyWith(`A new blog "${returnedBlog.title}" by ${returnedBlog.author} was added!`)
        setTimeout(() => {
          setInfo({ message: null })
        }, 5000);
      })
      .catch(error => {
        console.error('Error adding blog:', error)
        notifyWith(`Failed to add a new blog: ${error.message}`, 'error')
      }) 

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const deleteBlog = (blog) => {
   
    const ok = window.confirm(`remove ${blog.title} from the list?`)
  
    if(ok){

      blogService.setToken(user.token)
    
      blogService
      .deleteObj(blog.id)
      .then(() => {
      setBlogs(blogs.filter (b => b.id !== blog.id))
      notifyWith('deleted!')
      })
  
  
    }
    }

    const updateLikes = (id) => {
      try {
       
        const blog = blogs.find(b => b.id === id)
    
        const updatedBlog = {
          ...blog,
          likes: blog.likes + 1,
        }
    
        blogService.update(id, updatedBlog,user.token)
          .then(() => {
            setBlogs(
              blogs.map((blog) => (blog.id !== id ? blog : updatedBlog))
            )
          })
          .catch((error) => {
            console.error('Error updating likes:', error);
          })
      }
      catch (error) {
        console.error('Error updating likes:', error);
      }
    }
    
    
  
  


   if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification info={info} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input type="text"
              value={username}
              name='username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input type="password"
              value={password}
              name='password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (

    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>log out</button>
      { blogs
       .sort((a, b) => b.likes - a.likes)
      .map(blog =>
        <Blog key={blog.id} blog={blog} user={user.name} deleteBlog = {deleteBlog} updateLikes={updateLikes} />
      )
      }
      <h2>create new</h2>
      {blogForm()}
      <Notification info={info} />
    </div>
  )



}


export default App
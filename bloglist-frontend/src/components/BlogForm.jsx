


const BlogForm = ({
addBlog,
handleChange,
title,
author,
url

}) => {

   return(
    <div className="formDiv" >
       <form onSubmit={addBlog}>
         <div>
          title: 
           <input
             value={title}
             name="title"
             onChange={handleChange}
             /*id='title-input'*/
             placeholder='write title here'
           />
         </div>
         <div>
          author: 
           <input
             value={author}
             name="author"
             onChange={handleChange}
             placeholder='write author here'
           />
         </div>
         <div>
          url: 
           <input
             value={url}
             name="url"
             onChange={handleChange}
             placeholder='write url here'
           />
         </div>
         <button type="submit">save</button>
       </form>
     </div>
   )
}



  export default BlogForm 
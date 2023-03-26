import './App.css';
import {useState, useEffect} from 'react'
import { supabase } from './client'

function App() { 
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState({name: "", age: parseInt("",2)} )
  const { name, age } = post
  

  
  useEffect(() =>{
    fetchPosts()
  },[])

  async function fetchPosts(){
    const { data } = await supabase
    .from('Patient')
    .select()
    setPosts(data)
    console.log("data: ", data)
  }
  async function createPost(){
    await supabase
      .from('Patient')
      .insert([
        { name, age}
      ])
    .single()
    setPost({ name: "", age: ""})
    fetchPosts()
  }
  return (
    <div className="App">
      <input
      placeholder="name"
      value={name}
      onChange={e => setPost({ ...post, name: e.target.value})}
      />
      <input
      type = "number"
      placeholder="age"
      value={age}
      onChange={e => setPost({ ...post, age: e.target.value})}
      />
      <button onClick={createPost}>Create Post</button>
      {
        posts.map(post =>(
          <div key={post.id}>
            <h3>{post.name}</h3>
            <p>{post.age}</p>
          </div>
        ))
      }
    </div>
  );
}

export default App;

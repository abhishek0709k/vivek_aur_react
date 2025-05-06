import React, { useEffect, useState } from 'react'
import Appwrite_Service from '../../appwrite/appwriteConfigure'
import PostCard from '../PostCard'

const Homepage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    Appwrite_Service.getAllPosts().then((posts)=>{
        if(posts) setPosts(posts.documents)
    })
  }, [])

  if(posts.length ===0) return <div>Not any post yest</div>
  
  return (
    <div>
        { posts.map((post)=> (
            <div key={post.$id}>
                <PostCard {...post}/>
            </div>
        )) } 
        
    </div>
  )
}

export default Homepage
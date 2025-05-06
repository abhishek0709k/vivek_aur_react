import React, { useEffect, useState } from 'react'
import Appwrite_Service from '../../appwrite/appwriteConfigure'
import PostCard from '../PostCard';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    Appwrite_Service.getAllPosts().then((response)=>{
        if(response){
            setPosts(response.documents)
        }
    })
  }, [posts])
  return (
    <div className='all-posts'>
        { posts.map((post)=> (
            <div key={post.$id}>
                <PostCard $id={post.$id} title={post.title} featuredImage={post.featuredImage}/>
            </div>
        ))}
    </div>
  )
}

export default AllPosts
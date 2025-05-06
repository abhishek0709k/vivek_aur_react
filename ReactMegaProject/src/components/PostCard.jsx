import React from 'react'
import { Link } from "react-router-dom"
import Appwrite_config from '../appwrite/appwriteStorageConf'

const PostCard = ({$id, featuredImage, title}) => {
  return (
    <>
        <Link to={`/post/${$id}`}>
            <div>
                <img src={Appwrite_config.getFilePreview(featuredImage)} alt="card-image" />
                <p>{title}</p>
            </div>
        </Link>
    </>
  )
}

export default PostCard;
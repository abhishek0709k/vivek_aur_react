import React, { useEffect, useState } from "react";
import Appwrite_Service from "../../appwrite/appwriteConfigure";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Appwrite_config from "../../appwrite/appwriteStorageConf";
import Button from "../Button/Button";
import parse from "html-react-parser"

const Post = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  console.log(slug)
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        try {
          const response = await Appwrite_Service.getPost(slug);
          if (response) {
            setPost(response);
          }
        } catch (error) {
          console.error("Failed to fetch post:", error);
        }
      }
    };
  
    fetchPost();
  }, [slug]); // Only slug as dependency

  const deletePost = async () => {
    await Appwrite_Service.deletePost(slug).then((deletedStatus) => {
      if (deletedStatus) {
        Appwrite_config.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };
  return post ? (
    <div>
      <div className="featuredImage">
        <img
          src={Appwrite_config.getFilePreview(post.featuredImage)}
          alt={post.title}
        />
      </div>
      {isAuthor && (
        <div>
          <Link to={`/edit-post/${post.$id}`} className="edit-button">
            <Button
              className="edit-Button"
              type="button"
              bgColor="black"
              textColor="white"
            >
              Edit
            </Button>
          </Link>
          <Link to={`/delete-post/${post.$id}`} className="delete-button">
            <Button
              className="delete-Button"
              type="button"
              bgColor="black"
              textColor="white"
              onClick={deletePost}
            >
              Delete
            </Button>
          </Link>
        </div>
      )}
      <div className="title-div">
        <div className="title">{post.title}</div>
      </div>
      <div className="content-div">
        <div className="content">{parse(post.content)}</div>
      </div>
    </div>
  ) : null;
};

export default Post;

import React, { useEffect, useState } from "react";
import Appwrite_Service from "../../appwrite/appwriteConfigure";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../PostForm";

const EditPosts = () => {
  const [post, setPost] = useState(null);
  const navigte = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    const fetchingData = async () => {
      await Appwrite_Service.getPost(slug).then((response) => {
        if (response) setPost(response);
        else {
          navigte("/");
        }
      });
    };
    fetchingData();
  }, [slug]);
  return <div>{post ? <PostForm post={post} /> : null}</div>;
};

export default EditPosts;

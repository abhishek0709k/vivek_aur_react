import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input/Input";
import Button from "./Button/Button";
import Appwrite_Service from "../appwrite/appwriteConfigure";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RTE from "./RTE";
import Select from "./Select";
import Appwrite_config from "../appwrite/appwriteStorageConf";

const PostForm = ({ post }) => {
  const { register, handleSubmit, setValue, control, watch } = useForm({
    defaultValue: {
      content : ""
    }
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await Appwrite_config.uploadFile(data.image[0])
        : null;
      if (file) {
        await Appwrite_config.deleteFile(post.featuredImage);
      }
      const updatedPost = await Appwrite_Service.updataPost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (updatedPost) {
        navigate(`/post/${post.$id}`);
      }
    } else {
      const file = data.image[0]
        ? await Appwrite_config.uploadFile(data.image[0])
        : null;
        
      if (file) {
        const createdFile = await Appwrite_Service.createDocument({
          ...data,
          featuredImage: file.$id,
          userId: userData.$id,
        });
        if (createdFile) navigate(`/post/${createdFile.$id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && value.length > 0) {
      return value.trim().toLowerCase().replace(/\s/g, "-");
    } else {
      return "";
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setValue, slugTransform, watch]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="upper-portion">
        <Input
          className="title"
          label="Title"
          name="title"
          placeholder="Enter the title"
          {...register("title", { required: true })}
        />
        <Input
          className="slug"
          label="Slug"
          name="slug"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.target.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          className="editor"
          name="content"
          label="Editor"
          control={control}
        />
      </div>
      <div className="lower-portion">
        <Input
          className="image"
          name="image"
          label="Image"
          type= "file"
          {...register("image", { required: !post })}
        />
        {post && (
          <img
            src={Appwrite_config.getFilePreview(post.featuredImage)}
            alt={post.title}
          />
        )}
        <Input 
          className= "content"
          label= "content"
          name= "content"
          { ...register("content", { required: true })}
        />
        <Select 
          className= 'active-status'
          label= "Active-status"
          options= {["Active", "InActive"]}
          { ...register("active-status", { required: true })}
        />
        <Button className="submit-button" type="submit" textColor="white" bgColor="black">{ post ? "Update" : "Upload"}</Button>
      </div>
    </form>
  );
};

export default PostForm;

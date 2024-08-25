import React, { useCallback, useEffect } from "react";
import { Button, Input, Select, RTE } from "../index.js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import service from "../../appwrite/config.js";
import { useSelector } from "react-redux";

/*
    PostForm will be used in cases where 
    => user wants to edit an existing post : post details will be provided 
    => create a completely new post  
*/
function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData); // extract userData from redux store

  const { register, handleSubmit, watch, control, setValue, getValues } =
    useForm({
      defaultValues: {
        title: post.title ? post.title : "",
        content: post.content ? post.content : "",
        status: post.status ? post.status : "active",
        slug: post.$id ? post.$id : "",
      },
    });

  const formSubmit = async () => {
    // if post details are provided => update the post using the data from the form
    if (post) {
      // update featuredImage file
      // get file from the form-data and update it using service.uploadFile()
      const newFeaturedImageFile = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;
      // if file is successfully uploaded, delete the previous file from database
      if (newFeaturedImageFile) {
        await service.deleteFile(post.featuredImage);
      }
      // update the complete post details (including the new featuredImage-ID)
      const updatedPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: newFeaturedImageFile.$id,
      });
      // if post is updated successfully, navigate to the particular post page route
      navigate(`/post/${post.$id}`, { replace: true });
    }
    // else => create new post
    else {
      // upload featuredImage file
      const featuredImageFile = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;
      // create a new post
      if (featuredImageFile) {
        const featuredImageFileID = featuredImageFile.$id;
        const newPost = await service.createPost({
          ...data,
          featuredImage: featuredImageFileID,
          userId: userData.$id,
        });
        // if the new post is created successfully, navigate to the post-page
        if (newPost) {
          navigate(`/post/${newPost.$id}`, { replace: true });
        }
      }
    }
  };

  // While writing the title of the post, simultaneously change the slug field and replace all whitespaces with "-"
  // Note: Memoization using useCallback can be helpful when we have to pass a function as a dependency of some other hook (like useEffect in this case)
  const slugTransform = useCallback((title) => {
    if (title && typeof title === "string") {
      return title
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  // Whenever the component renders (or its dependencies change) => set the slug-value from the title value
  useEffect(() => {
    // create a subscription where we watch the input-form named "title" and transform the slug-input form accordingly
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        slugTransform(value.title);
      }
    });

    // Optimization: This cleans up the useEffect logic before the component re-renders and/or unmounts
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;

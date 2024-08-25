import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import service from "../appwrite/config";
import { useParams, useNavigate, replace } from "react-router-dom";

function EditPost() {
  const navigate = useNavigate();
  const { slug } = useParams(); // extract the post-Id (slug) from the params of the URL

  // local state
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const setSlug = async () => {
    if (slug) {
      const post = await service.getPost(slug);
      if (post) {
        setPost(post);
      }
    } else {
      navigate("/", { replace: true });
    }
  };
  useEffect(() => {
    // console.log(`EditPost.jsx useEffect:: post-slug=`,slug);
    setSlug().then(() => setLoading(false));
  }, [slug, navigate]);

  if (loading) {
    return <div className="py-8">Laoding...</div>;
  }
  return (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
}

export default EditPost;

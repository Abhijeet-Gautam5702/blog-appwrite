import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import service from "../appwrite/config";
import { useParams, useNavigate, replace } from "react-router-dom";

function EditPost() {
  // local state
  const [post, setPost] = useState(null);

  const navigate = useNavigate();
  const { slug } = useParams(); // extract the post-Id (slug) from the params of the URL

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => setPost(post ? post : null));
    } else {
      navigate("/", { replace: true });
    }
  }, [slug, navigate]);

  return (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
}

export default EditPost;

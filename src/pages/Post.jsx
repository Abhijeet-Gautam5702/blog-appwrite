import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import service from "../appwrite/config";
import { Container, Button } from "../components";
import parse from "html-react-parser";

function Post() {
  // local state
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { slug } = useParams();

  const userData = useSelector((state) => state.userData);

  const isAuthor = post && post.userId === userData.$id;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          setLoading(false);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, []);

  const deletePost = async () => {
    try {
      const response = await service.deletePost(slug);
      if (response) {
        await service.deleteFile(post.featuredImage);
      }
    } catch (error) {
      console.log(`Post deletion failed: ${error.message}`);
      throw error;
    } finally {
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold"> Loading...</h2>
      </div>
    );
  }
  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={service.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}

export default Post;

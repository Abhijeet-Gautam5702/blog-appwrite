import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useNavigate } from "react-router-dom";

function Home() {
  // local state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const status = useSelector((state) => state.status);

  useEffect(() => {
    /*
        NOTE: We are using promise-syntax instead of async-await because the callback inside useEffect() must not be asynchronous. We will have to create another function outside useEffect() and then invoke it here (just like we did in AllPosts.jsx) but using promise-syntax is less of a hassle :)
    */
    service.getAllPosts().then((posts) => {
      setPosts(posts ? posts.documents : []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <h1 className="text-2xl font-bold">Loading...</h1>
        </Container>
      </div>
    );
  }
  if (!status) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  } else if (status && posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                No Posts to show
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard
                id={post.$id}
                title={post.title}
                featuredImage={post.featuredImage}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;

import React, { useState, useEffect, useCallback } from "react";
import { Container, PostCard } from "../components";
import service from "../appwrite/config";

function AllPosts() {
  // local state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // method to fetch posts from DB and set the local state
  // Note: useCallback() hook is used to memoize it because we have given it in useEffect() hook's dependency array
  const fetchPostsFromDB = useCallback(async () => {
    try {
      const response = await service.getAllPosts();
      if (response) {
        setPosts(response.documents);
      }
    } catch (error) {
      console.log(`Fetch Posts from DB failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    fetchPostsFromDB();
  }, [fetchPostsFromDB, posts, setPosts]);

  if (loading) {
    return (
      <div className="w-full py-8">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }
  
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.length > 0 ? (
            posts.map((post) => {
              return (
                <div key={post.$id} className="p-2 w-1/4">
                  <PostCard
                    id={post.$id}
                    title={post.title}
                    featuredImage={post.featuredImage}
                  />
                </div>
              );
            })
          ) : (
            <h1 className="text-2xl font-semibold text-center w-full">
              No posts to show. Please create one.
            </h1>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;

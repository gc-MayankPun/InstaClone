import {
  createPost,
  getFeed,
  likePost,
  dislikePost,
} from "../services/post.api";
import { PostContext } from "../post.context";
import { useContext, useEffect } from "react";

export const usePost = () => {
  const context = useContext(PostContext);
  const { loading, setLoading, post, feed, setFeed } = context;

  const handleGetFeed = async () => {
    setLoading(true);

    const data = await getFeed();
    setFeed(data.posts.reverse());

    setLoading(false);
  };

  const handleCreatePost = async (imageFile, caption) => {
    setLoading(true);

    const data = await createPost(imageFile, caption);
    setFeed([data.post, ...feed]);
    setLoading(false);
  };

  const handleLikePost = async (postId) => {
    setLoading(true);

    const data = await likePost(postId);
    await handleGetFeed();
    
    setLoading(false);
  };
  
  const handleDislikePost = async (postId) => {
    setLoading(true);
    
    const data = await dislikePost(postId);
    await handleGetFeed();

    setLoading(false);
  };

  useEffect(() => {
    handleGetFeed();
  }, []);

  return {
    loading,
    feed,
    post,
    handleGetFeed,
    handleCreatePost,
    handleLikePost,
    handleDislikePost,
  };
};

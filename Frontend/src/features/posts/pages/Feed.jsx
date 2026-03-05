import { usePost } from "../hooks/usePost";
import Post from "../components/Post";
import { useEffect } from "react";
import "../style/feed.scss";
import Nav from "../../shared/components/Nav";

const Feed = () => {
  const { feed, handleGetFeed, loading, handleLikePost, handleDislikePost } =
    usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return (
      <main>
        <h1>Feed is loading...</h1>
      </main>
    );
  }

  return (
    <main className="feed-page">
      <Nav />
      <div className="feed">
        <div className="posts">
          {feed.map((post) => {
            return (
              <Post
                key={post._id}
                user={post.user}
                post={post}
                loading={loading}
                handleLikePost={handleLikePost}
                handleDislikePost={handleDislikePost}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;

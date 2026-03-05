import { useState, useRef } from "react";
import { usePost } from "../hooks/usePost";
import { useNavigate } from "react-router";
import "../style/createpost.scss";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const postImageInputFieldRef = useRef(null);

  const navigate = useNavigate();
  const { loading, handleCreatePost } = usePost();

  async function handleSubmit(event) {
    event.preventDefault();

    const file = postImageInputFieldRef.current.files[0];

    await handleCreatePost(file, caption);
    navigate("/");
  }

  if (loading) {
    return (
      <main>
        <h1>creating post</h1>
      </main>
    );
  }

  return (
    <main className="create-post-page">
      <div className="form-container">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
          <label className="post-image-label" htmlFor="postImage">
            Select image
          </label>
          <input
            ref={postImageInputFieldRef}
            type="file"
            name="postImage"
            id="postImage"
            hidden
          />
          <input
            onChange={(event) => setCaption(event.target.value)}
            value={caption}
            type="text"
            name="caption"
            id="caption"
            placeholder="Enter caption"
          />
          <button type="submit" className="button primary-button">
            create post
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;

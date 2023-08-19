import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/index";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:8080/posts/getAll", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:8080/posts/getByUserId/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();    
    dispatch(setPosts({ posts: data }));
  };
  
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          name,          
          content,          
          postAvatar,
          userAvatar,
          likes,
          commentIds,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={name}            
            content={content}            
            postAvatar={postAvatar}
            userAvatar={userAvatar}
            likes={likes}
            commentIds={commentIds}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
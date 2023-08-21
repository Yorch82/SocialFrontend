import {  
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
  import FlexBetween from "../../components/FlexBetween";
  import Friend from "../../components/Friend";
  import WidgetWrapper from "../../components/WidgetWrapper";
  import AddComment from "./AddComment";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost } from "../../state/index";
  import CommentsWidget from "./CommentsWidget";
  
  const PostWidget = ({
    postId,
    postUserId,
    name,
    content,    
    postAvatar,
    userAvatar,
    likes,
    commentIds,
  }) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
  
    const patchLike = async () => {
      const response = await fetch(`http://localhost:8080/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}` ,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    };

    return (
      <WidgetWrapper m="2rem 0">
        <Friend
          friendId={postUserId}
          name={name}
          
          userPicturePath={userAvatar}
        />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {content}
        </Typography>
        {postAvatar && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:8080/assets/${postAvatar}`}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>
  
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{commentIds.length}</Typography>
            </FlexBetween>
          </FlexBetween>
  
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
        {isComments && (
          <Box mt="0.5rem">
            <CommentsWidget postId={commentIds}  />
            <Divider />
          </Box>
        )}
        <Box mt="0.5rem">
          <AddComment postId={postId}/>
        </Box>
      </WidgetWrapper>
    );
  };
  
  export default PostWidget;
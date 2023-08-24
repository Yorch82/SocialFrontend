import { useDispatch, useSelector } from 'react-redux';
import { setComment, setPosts } from '../../state/index';
import WidgetWrapper from '../../components/WidgetWrapper';
import { Divider, IconButton, Typography, useTheme } from '@mui/material';
import Friend from '../../components/Friend';
import FlexBetween from '../../components/FlexBetween';
import { FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from '@mui/icons-material';
import dotenv from "react-dotenv";

const CommentWidget = ({
  commentId,
  userId,
  name,
  userAvatar,
  content,
  commentAvatar,
  likes
}) => {
  
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const loggedInUserId = useSelector(state => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(
      dotenv.REACT_APP_API_URL + `/comments/${commentId}/like`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedComment = await response.json();
    dispatch(setComment({ comment: updatedComment }));    

    const responsePosts = await fetch(dotenv.REACT_APP_API_URL + "/posts/getAll", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await responsePosts.json();
    
    dispatch(setPosts({ posts: data }));
  };

  return (
    <WidgetWrapper m='2rem 0'>
      <Friend friendId={userId} name={name} userPicturePath={userAvatar}/>
      <Typography color={main} sx={{ mt: '1rem' }}>
        {content}
      </Typography>
      {commentAvatar && (
        <img
          width='100%'
          height='auto'
          alt='post'
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
          src={dotenv.REACT_APP_API_URL + `/assets/${commentAvatar}`}
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
          </FlexBetween>  
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
        <Divider /> 
    </WidgetWrapper>
  );
};

export default CommentWidget;

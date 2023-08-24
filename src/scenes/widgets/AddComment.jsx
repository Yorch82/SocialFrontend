import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setComments, setPosts } from '../../state/index';
import WidgetWrapper from '../../components/WidgetWrapper';
import FlexBetween from '../../components/FlexBetween';
import Dropzone from 'react-dropzone';
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,  
} from '@mui/material';
import {
  EditOutlined,
  DeleteOutlined,  
  ImageOutlined,  
} from '@mui/icons-material';

import dotenv from "react-dotenv";

const AddComment = ({ postId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const [comment, setComment] = useState('');
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const handleComment = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("content", comment);
    formData.append("postId", postId);
    if (image) {
      formData.append("myFile", image);
      formData.append("commentAvatar", image.name);
    }

    const response = await fetch(dotenv.REACT_APP_API_URL + `/comments`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const comments = await response.json();
    dispatch(setComments({ comments }));
    setImage(null);
    setComment("");
    
    const responsePosts = await fetch(dotenv.REACT_APP_API_URL + "/posts/getAll", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await responsePosts.json();
    
    dispatch(setPosts({ posts: data }));
  };

  



  return (
    <WidgetWrapper>
      <FlexBetween gap='1.5rem'>
        {/* <UserImage image={picturePath} /> */}
        <InputBase
          placeholder='Comenta este post...'
          onChange={e => setComment(e.target.value)}
          value={comment}
          sx={{
            width: '100%',
            backgroundColor: palette.neutral.light,
            borderRadius: '2rem',
            padding: '1rem 2rem',
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius='5px'
          mt='1rem'
          p='1rem'
        >
          <Dropzone
            acceptedFiles='.jpg,.jpeg,.png'
            multiple={false}
            onDrop={acceptedFiles => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p='1rem'
                  width='100%'
                  sx={{ '&:hover': { cursor: 'pointer' } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Agrega Una Imagen Aquí</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: '15%' }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: '1.25rem 0' }} />

      <FlexBetween>
        <FlexBetween gap='0.25rem' onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ '&:hover': { cursor: 'pointer', color: medium } }}
          >
            Imagen
          </Typography>
        </FlexBetween>
        <Button
          disabled={!comment}
          onClick={handleComment}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: '3rem',
          }}
        >
          COMMENT
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default AddComment;

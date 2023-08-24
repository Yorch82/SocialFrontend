import { useDispatch, useSelector } from 'react-redux';
import PostsAdmin from './postsAdmin';
import UsersList from './usersList';
import { useEffect } from 'react';
import { setPosts } from '../../state';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Navbar from '../navbar';
import dotenv from 'react-dotenv';
import { useTheme } from '@emotion/react';

const Admin = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { _id } = useSelector(state => state.user);

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const primaryDark = theme.palette.primary.dark;

  const getAllPosts = async () => {
    const response = await fetch(dotenv.REACT_APP_API_URL + '/posts/getAll', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    getAllPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Navbar />
      <Typography
        fontWeight='bold'
        fontSize='clamp(1rem, 2rem, 2.25rem)'
        color='primary'
        textAlign="center"
        mt="1rem"
        sx={{
          '&:hover': {
            color: primaryLight,
            cursor: 'pointer',
          },
        }}
      >
        Panel Administrador
      </Typography>
      <Box
        width='100%'
        padding='2rem 6%'
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap='0.5rem'
        justifyContent='space-between'
      >
        <Box
          flexBasis={isNonMobileScreens ? '142%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <PostsAdmin userId={_id} />
        </Box>
        <Box flexBasis='26%' mt='2rem'>
          <UsersList />
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;

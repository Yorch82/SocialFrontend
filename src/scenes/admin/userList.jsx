import { Box, IconButton, Typography } from '@mui/material';
import FlexBetween from '../../components/FlexBetween';
import UserImage from '../../components/UserImage';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dotenv from 'react-dotenv';
import { setUsersList } from '../../state';
import WidgetWrapper from '../../components/WidgetWrapper';
import PersonOffIcon from '@mui/icons-material/PersonOff';

const UserList = ({ userId, name, email, avatar, role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
 
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
 
  const deleteUser = async () => {
    const response = await fetch(
        dotenv.REACT_APP_API_URL + `/users/delete/${userId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const usersList = await response.json();
    dispatch(setUsersList({ usersList }));
  };

  return (
    <WidgetWrapper mb="1rem">
    <FlexBetween gap='1rem' pb="1.1rem">
      <FlexBetween gap='1rem'>
        <UserImage image={avatar} size='55px' />
        <Box
        width='100%'
        padding='2rem 6%'
        display='block'
        gap='0.5rem'
        justifyContent='space-between'
          onClick={() => {
            navigate(`/profile/${userId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant='h5'
            fontWeight='500'
            sx={{
              '&:hover': {
                color: palette.primary.light,
                cursor: 'pointer',
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={main} fontSize='0.75rem'>
            {email}
          </Typography>
          <Typography color={main} fontSize='0.75rem'>
            {role}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => deleteUser()}
        sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
      >
        <PersonOffIcon sx={{ color: primaryDark}} />
      </IconButton>
    </FlexBetween>
    </WidgetWrapper>
  );
};

export default UserList;

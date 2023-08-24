import { useDispatch, useSelector } from "react-redux";
import PostsAdmin from "./postsAdmin"
import { useEffect } from "react";
import { setPosts } from "../../state";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../navbar";
import dotenv from "react-dotenv";

const Admin = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id } = useSelector((state) => state.user);

  const getAllPosts = async() => {
    const response = await fetch(dotenv.REACT_APP_API_URL + "/posts/getAll", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    
    dispatch(setPosts({ posts: data }));
  }

  useEffect(()=> {
    getAllPosts();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Navbar />
      <Box
        width='100%'
        padding='2rem 6%'
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap='0.5rem'
        justifyContent='center'
      >
        {/* <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={_id} avatar={avatar} />
        </Box> */}
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <PostsAdmin userId={_id} />
        </Box>
        {/* {isNonMobileScreens && (
          <Box flexBasis='26%'>           
            <FriendListWidget userId={_id} />
          </Box>
        )} */}
      </Box>
    </Box>
  );
};

export default Admin;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light',
  user: null,
  token: null,
  posts: [],
  comments: [],
  usersList: []
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: state => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: state => {
      state.user = null;
      state.token = null;
      state.posts = [];
      state.comments = [];
      state.usersList = [];
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("Sin amigos :(");
      }
    },
    setComments: (state, action) => {
      state.comments = action.payload.comments;
    },
    setComment: (state, action) => {
      const updatedComments = state.comments.map((comment) => {
        if (comment._id === action.payload.comment._id) return action.payload.comment;
        return comment;
      });
      state.comments = updatedComments;
    },
    setUsersList: (state, action) => {
      state.usersList = action.payload.usersList;
    },
    setUserList: (state, action) => {
      const updatedusers = state.usersList.map((user) => {
        if (user._id === action.payload.user._id) return action.payload.user;
        return user;
      });
      state.usersList = updatedusers;
    },
  },
});

export const { setMode, setLogin, setLogout, setPosts, setPost, setFriends, setComment, setComments, setUsersList, setUserList } =
  authSlice.actions;
export default authSlice.reducer;
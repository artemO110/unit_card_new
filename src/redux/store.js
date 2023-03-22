import { configureStore } from '@reduxjs/toolkit';
import posts from '../redux/slices/postsSlice';
import users from '../redux/slices/usersSlice';
import photos from '../redux/slices/photosSlice';


export const store = configureStore({
  reducer: {
    posts,
    users,
    photos,
  },
});

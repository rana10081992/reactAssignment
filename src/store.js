import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './feature/UserSlice';
export default configureStore({
  reducer: {
    user: userSlice.reducer
  }
});

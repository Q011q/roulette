import { configureStore } from '@reduxjs/toolkit';
import ortReducer from './ortSlice';

export const store = configureStore({
  reducer: {
    ortGame: ortReducer,
  },
});
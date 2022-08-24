import { configureStore } from '@reduxjs/toolkit';
import auth_reducer from '../features/auth/auth-slice';
import tasks_reducer from '../features/tasks/taskSlice';

export const store = configureStore({
  reducer: {
    auth: auth_reducer,
    tasks: tasks_reducer
  }
});

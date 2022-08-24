import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
const initialState = [];

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const get_task_async = createAsyncThunk(
  'task/get_task_async',
  async (i, thunkAPI) => {
        const config = {
            headers: { Authorization: `Bearer ${thunkAPI.getState().auth.token}` }
        };
        console.log(config);
    const response = await axios.get(
        "http://localhost:4444/api/tasks",
        config);
    // The value we return becomes the `fulfilled` action payload
    console.log(response.data);
    return response.data;
  }
);

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    add_task: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.push(action.payload);
    },
    extraReducers: (builder) => {
        builder.addCase(get_task_async.fulfilled, function (state, action) {
            console.log("test", action.payload);
            state.tasks = action.payload;

        });

    }
  }
});

export const { add_task } = taskSlice.actions;

export const selectTasks = (state) => state;

export default taskSlice.reducer;

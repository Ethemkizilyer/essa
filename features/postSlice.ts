"use client"
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post, PostService } from '../api/PostService';

const postService = new PostService();

export const fetchPosts = createAsyncThunk('posts/fetchAll', async () => {
  return await postService.getAll();
});

export const createPost = createAsyncThunk('posts/create', async (post: Post) => {
  return await postService.create(post);
});

export const getPost = createAsyncThunk('posts/getPost', async (id: number) => {
  return await postService.getById(id);
});

export const updatePost = createAsyncThunk('posts/update', async (post: Post) => {
    console.log("post",post)
  return await postService.update(post.id, post);
});

export const deletePost = createAsyncThunk('posts/delete', async (id: number) => {
  await postService.delete(id);
  return id;
});

interface PostState {
  data: Post[];
  post: Post | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  data: [],
  post:null,
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdate:(state,{payload}) => {
        state.data = state.data.map((item)=>item.id === payload.id ? payload : item);
        state.loading = false;
        state.error = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch post';
      })
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.data.unshift(action.payload);
        console.log(state.data)
        state.data=state.data
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(post => post.id === action.payload.id);
        console.log("index",index)
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(post => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      });
  },
});

export const {postUpdate} =postSlice.actions

export default postSlice.reducer;

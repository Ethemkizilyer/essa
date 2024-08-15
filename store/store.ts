"use client"
 
import postReducer from "../features/postSlice";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    posts: postReducer,
  });

export const store=configureStore({
    reducer:{
        posts:postReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
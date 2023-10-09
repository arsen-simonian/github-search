import { combineReducers } from '@reduxjs/toolkit';
import {  searchReducer } from './slices/search';
import { recentlyViewedReducer } from './slices/recently-viewed';
import githubApi from '../api';

const rootReducer = combineReducers({
  search: searchReducer,
  recentlyViewed: recentlyViewedReducer,
  [githubApi.reducerPath]: githubApi.reducer,
});

export default rootReducer;
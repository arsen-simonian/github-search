import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type RecentView = { name: string, id: number };

export type RecentlyViewed = {
  values: Array<RecentView>,
}

const initialValue: RecentlyViewed = {
  values: [],
}

const recentlyViewed = createSlice({
  name: 'search',
  initialState: initialValue,
  reducers: {
    addViewed: (state, action: PayloadAction<RecentView>) => {
      const isNew = !state.values.find(value => value.id === action.payload.id);      

      if(isNew) {
        state.values.unshift(action.payload);
        state.values = state.values.slice(0, 5);
      }
    }
  },
});

export const { reducer: recentlyViewedReducer, actions: { addViewed } } = recentlyViewed;
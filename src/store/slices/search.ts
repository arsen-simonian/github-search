import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Search = {
  value: string,
  recentlySearched: Array<string>
}

const initialValue: Search = {
  value: '',
  recentlySearched: [],
}

const search = createSlice({
  name: 'search',
  initialState: initialValue,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.value = action.payload,
      state.recentlySearched = Array.from(new Set([action.payload, ...state.recentlySearched])).slice(0, 5).filter(v => v);
    },
  },
});

export const { reducer: searchReducer, actions: { setSearch } } = search;
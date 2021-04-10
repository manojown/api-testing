import { createSlice } from "@reduxjs/toolkit";

export const utilitySlice = createSlice({
	name: "utility",
	initialState: {
        pagination: { page: 1, limit: 10 },
        loading: false
	},
	reducers: {
		clearState: (state) => {
			state.pagination = { page: 1, limit: 10 };
			return state;
        },
        
		setPagination: (state, { payload }) => {
			state.pagination = payload;
		},
	},
});

export const { clearState, setPagination } = utilitySlice.actions;

export const selectUtility = (state) => state.utility;

export default utilitySlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  ApiCall  from "../helpers/Api"

export const getAllPerformances = createAsyncThunk("/performance", async (param, thunkAPI) => {
	try {

		let data = await ApiCall("/performance",'GET', param)
		if (data.status === 200) {
			return { ...data };
		} else {
			return thunkAPI.rejectWithValue(data);
		}
	} catch (e) {
		return thunkAPI.rejectWithValue(e.response.data);
	}
});

// export const loginUser = createAsyncThunk("users/login", async ({ email, password }, thunkAPI) => {
// 	try {
// 		const response = await fetch("http://localhost:8080/login", {
// 			method: "POST",
// 			headers: {
// 				Accept: "application/json",
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({
// 				email,
// 				password,
// 			}),
// 		});
// 		let data = await response.json();
// 		if (response.status === 200) {
// 			localStorage.setItem("token", data.token);
// 			return data;
// 		} else {
// 			return thunkAPI.rejectWithValue(data);
// 		}
// 	} catch (e) {
// 		console.log("Error", e.response.data);
// 		thunkAPI.rejectWithValue(e.response.data);
// 	}
// });

export const performanceSlice = createSlice({
	name: "performance",
	initialState: {
		pagination: {page:1,
			limit:10},
		performance:null,
		isFetching: false,
		isSuccess: false,
		isError: false,
        errorMessage: "",
		message: ""
	},
	reducers: {
		clearState: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isFetching = false;
			return state;
		},
		setPagination: (state,{payload}) => {
			console.log("sdara insetpagination",payload)
			state.pagination =  payload
		}
	},
	extraReducers: {
        [getAllPerformances.fulfilled]: (state, { payload }) => {
            state.performance = payload.data
			state.isFetching = false;
            state.isSuccess = true;
            state.message = payload.message
			return state;
		},
		[getAllPerformances.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
            state.errorMessage = payload && payload.message ;
			return state;
		},
		[getAllPerformances.pending]: (state) => {
            state.isFetching = true;
            return state;
		},
	},
});

export const { clearState,setPagination } = performanceSlice.actions;

export const selectPerformance = (state) => state.performance;

export default performanceSlice.reducer;

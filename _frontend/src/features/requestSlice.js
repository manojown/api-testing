import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiCall from "../helpers/Api";

export const createRequest = createAsyncThunk(
	"[POST]/request",
	async (requestPayload, thunkAPI) => {
		try {
			let response = await ApiCall("/request", "POST", null, requestPayload);

			if (response.status === 200) {
				return { ...response };
			} else {
				return thunkAPI.rejectWithValue(response);
			}
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
);


export const getRequestByUrl = createAsyncThunk(
	"[POST]/request",
	async (requestPayload, thunkAPI) => {
		try {
			let response = await ApiCall("/performancebyurl", "POST", null, requestPayload);

			if (response.status === 200) {
				return { ...response };
			} else {
				return thunkAPI.rejectWithValue(response);
			}
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
);

export const getAllRequests = createAsyncThunk("[GET]/request", async (params, thunkAPI) => {
	try {
		let response = await ApiCall("/request", "GET", params);
		let data = response.data;
		if (response.status === 200) {
			return { ...response };
		} else {
			return thunkAPI.rejectWithValue(data);
		}
	} catch (e) {
		return thunkAPI.rejectWithValue(e.response.data);
	}
});

export const requestSlice = createSlice({
	name: "request",
	initialState: {
		request: null,
		allRequest: null,
		isFetching: false,
		isSuccess: false,
		isError: false,
		errorMessage: "",
		message: "",
	},
	reducers: {
		clearState: (state) => {
			// state.allRequest = null
			state.isError = false;
			state.isSuccess = false;
			state.isFetching = false;
			return state;
		},
	},
	extraReducers: {
		[createRequest.fulfilled]: (state, { payload }) => {
			state.isFetching = false;
			state.isSuccess = true;
			state.message = payload && payload.message;
			return state;
		},
		[createRequest.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload && payload.message;
			return state;
		},
		[createRequest.pending]: (state) => {
			state.isFetching = true;
			return state;
		},
		[getAllRequests.fulfilled]: (state, { payload }) => {
			state.allRequest = payload && payload.data;
			state.isFetching = false;
			state.isSuccess = true;
			state.message = payload && payload.message;
			return state;
		},
		[getAllRequests.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.allRequest = null
			state.isError = true;
			state.errorMessage = payload && payload.message;
			return state;
		},
		[getAllRequests.pending]: (state) => {
			state.isFetching = true;
			return state;
		},
		[getRequestByUrl.fulfilled]: (state, { payload }) => {
			// console.log("payload", payload);
			state.requestByUrl = payload && payload.data;
			state.isFetching = false;
			state.isSuccess = true;
			state.message = payload && payload.message;
			return state;
		},
		[getRequestByUrl.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.requestByUrl = null
			state.isError = true;
			state.errorMessage = payload && payload.message;
			return state;
		},
		[getRequestByUrl.pending]: (state) => {
			state.isFetching = true;
			return state;
		},
	},
});

export const { login, logout, checkLogin, clearState } = requestSlice.actions;

export const selectRequest = (state) => state.request;

export default requestSlice.reducer;

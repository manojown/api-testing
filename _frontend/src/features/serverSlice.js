import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  ApiCall  from "../helpers/Api"

export const createServer = createAsyncThunk("[post]/server", async (requestPayload, thunkAPI) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_API}server`, {
			method: "POST",
			headers: {
				Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
                
			},
			body: JSON.stringify(requestPayload),
		});
		let data = await response.json();

		if (response.status === 200) {
			return { ...data };
		} else {
			return thunkAPI.rejectWithValue(data);
		}
	} catch (e) {
		return thunkAPI.rejectWithValue(e.response.data);
	}
});

export const getAllServers = createAsyncThunk("/server", async ({pagination}, thunkAPI) => {
	try {
		let response = await ApiCall("/server",'GET', pagination)
		
		// let data =  response.data;
		// console.log("[[[",response)
        // console.log("getAllRequests---",data)

	
		return { ...response };
		
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

export const serverSlice = createSlice({
	name: "server",
	initialState: {
		server:null,
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
	},
	extraReducers: {
        [getAllServers.fulfilled]: (state, { payload }) => {
            state.server = payload.data
			state.isFetching = false;
            state.isSuccess = true;
            state.message = payload.message
			return state;
		},
		[getAllServers.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
            state.errorMessage = payload && payload.message ;
			return state;
		},
		[getAllServers.pending]: (state) => {
            state.isFetching = true;
            return state;
        },
        [createServer.fulfilled]: (state, { payload }) => {
			state.isFetching = false;
            state.isSuccess = true;
            state.message = payload.message
			return state;
		},
		[createServer.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
            state.errorMessage = payload && payload.message ;
			return state;
		},
		[createServer.pending]: (state) => {
            state.isFetching = true;
            return state;
		},
	},
});

export const { clearState } = serverSlice.actions;

export const selectServer = (state) => state.server;

export default serverSlice.reducer;

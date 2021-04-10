import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const downloadPaths = createAsyncThunk("[api-testing-connector]/github", async (requestPayload, thunkAPI) => {
	try {
		const response = await fetch("https://api.github.com/repos/manojown/api-testing-connector/contents/download?ref=master", {
			method: "GET"         
        });
        
        let data = await response.json();
     
        
        // console.log("getAllRequests---",data)

		if (response.status === 200) {
			return { data };
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

export const downloadSlice = createSlice({
	name: "download",
	initialState: {
		downloads:null,
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
        [downloadPaths.fulfilled]: (state, { payload }) => {
            state.downloads = payload.data
			state.isFetching = false;
            state.isSuccess = true;
            state.message = payload.message
			return state;
		},
		[downloadPaths.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
            state.errorMessage = payload && payload.message ;
			return state;
		},
		[downloadPaths.pending]: (state) => {
            state.isFetching = true;
            return state;
        },
	},
});

export const { clearState } = downloadSlice.actions;

export const selectDownload = (state) => state.download;

export default downloadSlice.reducer;

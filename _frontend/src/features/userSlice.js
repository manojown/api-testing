import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  ApiCall  from "../helpers/Api"

export const signupUser = createAsyncThunk(
	"users/signupUser",
	async (payload, thunkAPI) => {
		try {

			let response = await ApiCall("/registration",'POST',{},payload)
			
			let data =  response.data;
			if (response.status === 200) {
				return { ...data, name: payload.name, email: payload.email };
			} else {

				return thunkAPI.rejectWithValue(data);
			}
		} catch (e) {

			return thunkAPI.rejectWithValue( e.response.data);
		}
	}
);

export const loginUser = createAsyncThunk("users/login", async (payload, thunkAPI) => {
	try {
		// console.log("--user pass", email, password )
		let response = await ApiCall("/login",'POST',{},payload)
		let data =  response.data
		console.log("data",data.data)
		if (response.status === 200) {
			localStorage.setItem("token", data);
			return data;
		} else {
			return thunkAPI.rejectWithValue(data);
		}
	} catch (e) {
		return thunkAPI.rejectWithValue(e.response.data);
	}
});

export const userSlice = createSlice({
	name: "user",
	initialState: {
		user: null,
		isFetching: false,
		isSuccess: false,
		isError: false,
		isLoggedIn: false,
		errorMessage: "",
	},
	reducers: {
		login: (state, action) => {
			state.user = action.payload;
		},
		checkLogin: (state, action) => {
			let data = localStorage.getItem("token");
			if (data) state.isLoggedIn = true;
			state.user = action.payload;
		},
		logout: (state) => {
			state.user = null;
    },
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
	},
	extraReducers: {
		[signupUser.fulfilled]: (state, { payload }) => {
			// state.email = payload.email;
			// state.username = payload.name;
			state.isFetching = false;
			state.isSuccess = true;

			return state;
		},
		[signupUser.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload && payload.message 
		},
		[signupUser.pending]: (state) => {
			state.isFetching = true;
		},
		[loginUser.fulfilled]: (state, { payload }) => {
			// state.email = payload.email;
			// state.username = payload.name;
			state.message = payload && payload.message
			state.isFetching = false;
			state.isSuccess = true;
			state.isLoggedIn = true;

			return state;
		},
		[loginUser.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload && payload.message ;
		},
		[loginUser.pending]: (state) => {
			state.isFetching = true;
		},
	},
});

export const { login, logout, checkLogin,clearState } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;

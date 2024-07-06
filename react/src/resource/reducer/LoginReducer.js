import { createSlice } from "@reduxjs/toolkit";
import { authLoginAction as login } from "../actions/LoginAction";
import { checkAuthentication as checkAuth } from "../actions/CheckAuthenticationAction";
import {authRegisterAction as register } from "../actions/RegisterAction";
import { LogoutAction as logout } from "../actions/LogoutAction";

const initialState = {
	authLoader: false,
	authError: null,
	authData: null
}

export const AuthLoginReducer = createSlice({
	name: "authLogin",
	initialState,
	// Local reducers, i.e they don't rely on thunks
	// For application state management
	reducers: {
		localLogout: (state) => {
			state.authLoader = false
			state.authError = null
			state.authData = null
		},
	},
	extraReducers(builder) {
		builder.addCase(login.pending, (state) => {
			state.authLoader = true
			state.authError = null
			state.authData = null
		}).addCase(login.fulfilled, (state, action) => {
			state.authLoader = false
			state.authError = null
			state.authData = action.payload
		}).addCase(login.rejected, (state, action) => {
			state.authLoader = false
			state.authError = action.error.message
			state.authData = null
		}).addCase(checkAuth.fulfilled, (state, action) => {
			// check auth is meant to only check auth
			// Avoiding to conflict with Login, logout and register is vital
			if (!state.authLoader) {
				state.authLoader = false
				state.authError = null
				state.authData = action.payload
			}
		}).addCase(checkAuth.rejected, (state) => {
			if (!state.authLoader) {
				state.authLoader = false
				state.authError = null
				state.authData = null
			}
		}).addCase(logout.pending, (state) => {
			state.authLoader = true
			state.authError = null
			state.authData = null
		}).addCase(logout.fulfilled, (state) => {
			state.authLoader = false
			state.authError = null
			state.authData = null
		}).addCase(logout.rejected, (state) => {
			state.authLoader = false
			state.authError = null
			state.authData = null
		}).addCase(register.pending, (state)=>{
			state.authLoader = true
			state.authError = null
			state.authData = null
		}).addCase(register.fulfilled, (state, action) => {
			state.authLoader = false
			state.authError = null
			state.authData = action.payload
		}).addCase(register.rejected, (state, action) => {
			state.authLoader = false
			state.authError = action.error.message
			state.authData = null
		})
	}
})


export const {
	localLogout,
} = AuthLoginReducer.actions;
export default AuthLoginReducer.reducer;
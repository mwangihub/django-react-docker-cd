import { configureStore } from "@reduxjs/toolkit";
import AuthLoginReducer from "./reducer/LoginReducer";

export const store = configureStore({
	reducer: {
		AuthLoginReducer
	},
})

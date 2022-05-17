import { createReducer } from "@reduxjs/toolkit";
import { logout, setErrorMessage, setLogin } from "../actions/authorization.action";
import { AuthorizationService } from "../../utils/services/authorization.service";

interface AuthorizationState {
	isAuth: boolean;
	errorMessage: string;
}

const initialState: AuthorizationState = {
	isAuth: false,
	errorMessage: null,
};

export const authorizationReducer = createReducer(initialState, (builder) => {
	builder.addCase(setLogin, (state, action) => {
		state.isAuth = action.payload;
		if (action.payload === false) {
			AuthorizationService.logOut();
		}
	});
	builder.addCase(setErrorMessage, (state, action) => {
		state.errorMessage = action.payload;
	});
	builder.addCase(logout, (state, action) => {
		state.isAuth = false;
	});
});

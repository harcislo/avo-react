import { createReducer } from "@reduxjs/toolkit";
import { setIsAppConfigured } from "../actions/app.action";

interface AppState {
	isAppConfigured: boolean;
}

const initialState: AppState = {
	isAppConfigured: false
};

export const appReducer = createReducer(initialState, (builder) => {
	builder.addCase(setIsAppConfigured, (state, action) => {
		state.isAppConfigured = action.payload;
	});
});

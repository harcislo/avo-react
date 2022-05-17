import { createReducer } from "@reduxjs/toolkit";
import { setPreviousUrl, setRealUrl } from "../actions/url.action";

interface UrlState {
	previousUrl: string;
	realUrl: string;
}

const initialState: UrlState = {
	previousUrl: null,
	realUrl: null,
};

export const urlReducer = createReducer(initialState, (builder) => {
	builder.addCase(setPreviousUrl, (state, action) => {
		state.previousUrl = action.payload;
	});
	builder.addCase(setRealUrl, (state, action) => {
		state.realUrl = action.payload;
	});
});

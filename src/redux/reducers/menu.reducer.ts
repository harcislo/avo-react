import { createReducer } from "@reduxjs/toolkit";
import { toggleMenuAction } from "../actions/menu.action";

interface MenuState {
	menuIsActive: boolean;
}

const initialState = { menuIsActive: false } as MenuState;

export const menuReducer = createReducer(initialState, (builder) => {
	builder.addCase(toggleMenuAction, (state, action) => {
		state.menuIsActive = action.payload || !state.menuIsActive;
	});
});

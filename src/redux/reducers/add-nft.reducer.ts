import { createReducer } from "@reduxjs/toolkit";
import { setNftToCreate } from "../actions/add-nft.action";

interface AddNftState {
	nftToCreate: any; //TODO: add typing
}

const initialState: AddNftState = {
	nftToCreate: null
};

export const addNftReducer = createReducer(initialState, (builder) => {
	builder.addCase(setNftToCreate, (state, action) => {
		state.nftToCreate = action.payload;
	});
});

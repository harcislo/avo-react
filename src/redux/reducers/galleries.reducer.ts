import { createReducer } from "@reduxjs/toolkit";
import {
	setCategoryAuthorNft,
	setCategoryAuthors,
	setCategoryNft,
	setCategoryUser,
	setCurrentPage,
	setData,
	setIsGalleryEnd,
	setIsLoading,
} from "../actions/galleries.action";

export type CategoryUserType = "onPlatform" | "onBlockchain" | "onFavorites" | "onCreated";

interface IGalleries {
	currentPage: number;
	data: any[];
	isLoading: boolean;
	isGalleryEnd: boolean;

	categoryNft: number | null;
	categoryAuthors: number | null;
	categoryAuthorNft: number | null;
	categoryUser: CategoryUserType;
}

const initialState: IGalleries = {
	currentPage: 1,
	data: [],
	isLoading: true,
	isGalleryEnd: false,

	categoryNft: null,
	categoryAuthors: null,
	categoryAuthorNft: null,
	categoryUser: "onPlatform",
};

export const galleriesReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setCurrentPage, (state, action) => {
			state.currentPage = action.payload;
		})
		.addCase(setData, (state, action) => {
			state.data = action.payload;
		})
		.addCase(setIsLoading, (state, action) => {
			state.isLoading = action.payload;
		})
		.addCase(setIsGalleryEnd, (state, action) => {
			state.isGalleryEnd = action.payload;
		})
		.addCase(setCategoryNft, (state, action) => {
			state.categoryNft = action.payload;
		})
		.addCase(setCategoryAuthors, (state, action) => {
			state.categoryAuthors = action.payload;
		})
		.addCase(setCategoryAuthorNft, (state, action) => {
			state.categoryAuthorNft = action.payload;
		})
		.addCase(setCategoryUser, (state, action) => {
			state.categoryUser = action.payload;
		});
});

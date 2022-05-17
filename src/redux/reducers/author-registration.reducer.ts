import { createReducer } from "@reduxjs/toolkit";
import {
	setCurrentStep,
	setAuthorCredentials,
	setAuthorDetails,
	resetAuthorDetails,
} from "../actions/author-registration.action";

interface RegistrationState {

	authorPhotoUrl: string;
	passportFile: File;
	currentStep: number;
	username: string;
	email: string;
	phoneNumber: string;
	description: string;

	categoryId: number;
	wallet: string;
	royalty: number;
}

const initialState: RegistrationState = {
	authorPhotoUrl: null,
	passportFile: null,
	currentStep: 0,
	username: null,
	email: null,
	phoneNumber: null,
	description: null,

	categoryId: null,
	wallet: null,
	royalty: null
};

export interface AuthorCredentials {
	username: string;
	email: string;
	phoneNumber: string;
	description: string;
}

export interface AuthorDetails {
	categoryId: number;
	wallet: string;
	royalty: number;
}

export const authorRegistrationReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setCurrentStep, (state, action) => {
			state.currentStep = action.payload;
		})
		.addCase(setAuthorCredentials, (state, action) => {
			return { ...state, ...action.payload };
		})
		.addCase(setAuthorDetails, (state, action) => {
			return { ...state, ...action.payload };
		})
		.addCase(resetAuthorDetails, (state, action) => {
			return { ...initialState };
		});
});

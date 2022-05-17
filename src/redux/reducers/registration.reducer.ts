import { createReducer } from "@reduxjs/toolkit";
import {
	setMetaMaskWallet,
	setTelegramUserId,
	setUserName,
	setMnemonic,
	setStep,
	resetSettings,
} from "../actions/registration.ation";

interface RegistrationState {
	currentStep: number;
	wallet: number;
	telegramUserId: number;
	username: number;
	mnemonic: Array<string>;
}

const initialState: RegistrationState = {
	currentStep: 0,
	wallet: null,
	telegramUserId: null,
	username: null,
	mnemonic: null,
};

export const registrationReducer = createReducer(initialState, (builder) => {
	builder.addCase(setMetaMaskWallet, (state, action) => {
		state.wallet = action.payload;
	});

	builder.addCase(setTelegramUserId, (state, action) => {
		state.telegramUserId = action.payload;
	});

	builder.addCase(setUserName, (state, action) => {
		state.username = action.payload;
	});

	builder.addCase(setMnemonic, (state, action) => {
		state.mnemonic = action.payload;
	});

	builder.addCase(setStep, (state, action) => {
		state.currentStep = action.payload;
	});

	builder.addCase(resetSettings, (state, action) => {
		state.currentStep = 0;
		state.mnemonic = null;
		state.telegramUserId = null;
		state.username = null;
		state.wallet = null;
	});
});

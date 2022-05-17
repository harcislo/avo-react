import { createAction } from "@reduxjs/toolkit";

export const setStep = createAction<number>("registration/setStep");

export const setMetaMaskWallet = createAction<number>("registration/setMetaMaskWallet");

export const setUserName = createAction<number>("registration/setUserName");

export const setTelegramUserId = createAction<number>("registration/setTelegramUserId");

export const setMnemonic = createAction<Array<string>>("registration/setMnemonic");

export const resetSettings = createAction<void>("registration/resetSettings");

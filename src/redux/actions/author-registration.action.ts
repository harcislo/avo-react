import { createAction } from "@reduxjs/toolkit";
import { AuthorCredentials, AuthorDetails } from "../reducers/author-registration.reducer";

export const setCurrentStep = createAction<number>("author-registration/setCurrentStep");

export const setAuthorCredentials = createAction<AuthorCredentials>("author-registration/setAuthorCredentials");
export const setAuthorDetails = createAction<AuthorDetails>("author-registration/setAuthorDetails");
export const resetAuthorDetails = createAction<void>("author-registration/resetAuthorDetails");

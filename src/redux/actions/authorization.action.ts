import { createAction } from "@reduxjs/toolkit";

export const setLogin = createAction<boolean>("authorization/setLogin");
export const setErrorMessage = createAction<string>("authorization/setErrorMessage");
export const logout = createAction<void>("authorization/logout");

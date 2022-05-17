import { createAction } from "@reduxjs/toolkit";

export const setPreviousUrl = createAction<string>("url/setPreviousUrl");
export const setRealUrl = createAction<string>("url/setRealUrl");

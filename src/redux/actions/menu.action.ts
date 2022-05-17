import { createAction } from "@reduxjs/toolkit";

export const toggleMenuAction = createAction<boolean>("menu/toggle");

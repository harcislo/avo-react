import { createAction } from "@reduxjs/toolkit";
import { CategoryUserType } from "../reducers/galleries.reducer";

export const setCurrentPage = createAction<number>("galleries/setCurrentPage");
export const setData = createAction<any[]>("galleries/setData");
export const setIsLoading = createAction<boolean>("galleries/setIsLoading");
export const setIsGalleryEnd = createAction<boolean>("galleries/setIsGalleryEnd");
export const setCategoryNft = createAction<number>("galleries/setCategoryNft");
export const setCategoryAuthors = createAction<number>("galleries/setCategoryAuthors");
export const setCategoryAuthorNft = createAction<number>("galleries/setCategoryAuthorNft");
export const setCategoryUser = createAction<CategoryUserType>("galleries/setCategoryUser");

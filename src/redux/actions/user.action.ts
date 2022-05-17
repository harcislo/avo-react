import { createAction } from "@reduxjs/toolkit";
import { GalleryType, NftLike, NtfsItem } from "../reducers/user.reducer";

export const setUserGalleryType = createAction<GalleryType>(
	"user/setUserGalleryType"
);
export const setNfts = createAction<NtfsItem[]>("user/setNfts");
export const setCategoryUserAction = createAction<number | null>("user/setCategoryNft");

export const setNftLikes = createAction<NftLike[]>("user/setNftLikes");
export const addLike = createAction<NftLike>("user/addLike");
export const removeLike = createAction<NftLike>("user/removeLike");
export const setFavoriteNft = createAction<NtfsItem[]>("user/setFavoriteNft");

export const setUserName = createAction<string>("user/setUserName");
export const setUserId = createAction<number>("user/setUserId");
export const setWalletId = createAction<number>("user/setWalletId");
export const setUserInfo = createAction<any>("user/setUserInfo");

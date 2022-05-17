import { createReducer } from "@reduxjs/toolkit";
import { logout } from "../actions/authorization.action";
import {
	addLike,
	removeLike,
	setCategoryUserAction,
	setFavoriteNft,
	setUserGalleryType,
	setNftLikes,
	setNfts,
	setUserId,
	setUserName,
	setWalletId,
	setUserInfo,
} from "../actions/user.action";

export interface IAuthor {
	category_id: number;
	description: string;
	id: number;
	img: string;
	img_id: string;
	name: string;
	royalty: number;
	user_id: number;
	wallet: string;
}

export interface NtfsItem {
	author: IAuthor;
	author_id: number | null;
	available: number | null;
	category_id: number | null;
	description: string | null;
	emission: number | null;
	file_id: string | null;
	content_type: string | null;
	id: number | null;
	img: string | null;
	license: string | null;
	// nft_association: {user_id: number | null, nft_id: number | null}
	other_files: string | null;
	percent: number | null;
	price: number | null;
	qr_code_path: string | null;
	qr_code_url: string | null;
	title: string | null;
	url: string | null;
}

export interface UserTypeNft {
	added_nft: number | null;
	date: string | null;
	id: number | null;
	language: string | null;
	nft_id_list: string | null;
	nfts: NtfsItem[];
	passphrase: any;
	referal_user_id: any;
	status: string | null;
	user_id: number | null;
	username: string | null;
}

export interface NftLike {
	user_id: number;
	nft_id: number;
}

export type GalleryType = "onPlatform" | "onBlockchain" | "onFavorites" | "onCreated";

interface UserState {
	galleryType: GalleryType;
	nfts: NtfsItem[];
	categoryId: number | null;
	userName: string;
	userId: number;
	walletId: number;
	nftLikes: NftLike[];
	nftFavorite: NtfsItem[];
	author: any;
}

const initialState: UserState = {
	galleryType: "onPlatform",
	nfts: [],
	categoryId: null,
	userName: null,
	userId: null,
	nftLikes: null,
	walletId: null,
	nftFavorite: [],
	author: null
};

export const userReducer = createReducer(initialState, (builder) => {
	builder.addCase(setUserGalleryType, (state, action) => {
		state.galleryType = action.payload;
	});
	builder.addCase(setNfts, (state, action) => {
		state.nfts = action.payload;
	});
	builder.addCase(setCategoryUserAction, (state, action) => {
		state.categoryId = action.payload;
	});
	builder.addCase(setUserName, (state, action) => {
		state.userName = action.payload;
	});
	builder.addCase(setUserId, (state, action) => {
		state.userId = action.payload;
	});
	builder.addCase(setNftLikes, (state, action) => {
		state.nftLikes = action.payload;
	});
	builder.addCase(addLike, (state, action) => {
		state.nftLikes = [ ...state.nftLikes, action.payload ];
	});
	builder.addCase(removeLike, (state, action) => {
		state.nftLikes = state.nftLikes.filter((like) => like.nft_id !== action.payload.nft_id);
	});
	builder.addCase(setFavoriteNft, (state, action) => {
		state.nftFavorite = action.payload;
	});
	builder.addCase(setWalletId, (state, action) => {
		state.walletId = action.payload;
	});

	builder.addCase(setUserInfo, (state, action) => ({
		...state, ...action.payload
	}));

	builder.addCase(logout, (state, action) => {
		return { ...state, ...initialState }
	});
});

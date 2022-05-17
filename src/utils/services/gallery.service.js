import axios from "axios";
import {apiUrls} from "../../constants";
import {AuthTokenConfig} from "./interceptor.service";
import {getUser, getUserFavoriteNft} from "./user-api.service";

export const getNft = (params) => {
	const {id, isAuth} = params;
	let config = {};
	if (isAuth) {
		config = {
			headers: {
				[AuthTokenConfig.autoSetHeader]: AuthTokenConfig.statusRequired,
			}
		}
	}
	return axios.get(`${apiUrls.apiNft}/api/nft/${id}`, config);
};

export const getGalleryNft = (params) => {
	//galleryType: string = nft | by-author | authors

	const {galleryType, limit, page, category, authorId} = params;
	let typeApi;

	if (galleryType === "authors") {
		typeApi = apiUrls.authors;
	} else {
		typeApi = apiUrls.nft;
	}

	return axios.get(
		`${typeApi}${authorId ? `/by-author/${authorId}/` : ""}?limit=${limit}&page=${page}${category ? "&category=" + category : ""
		}`
	);
};

export const getGalleryData = async (params) => {
	const {type, LIMIT_PER_PAGE, current, category, authorId} = params;
	try {
		let res;
		switch (type) {
			case "nft":
				res = await getGalleryNft({
					limit: LIMIT_PER_PAGE,
					page: current,
					category: category,
				});
				break;

			case "by-author":
				res = await getGalleryNft({
					limit: LIMIT_PER_PAGE,
					page: current,
					category: category,
					authorId: authorId,
				});
				break;

			case "authors":
				res = await getGalleryNft({
					galleryType: "authors",
					limit: LIMIT_PER_PAGE,
					page: current,
					category: category,
				});

				break;
			case "onFavorites":
				res = await getUserFavoriteNft();
				break;

			case "onPlatform":
				let intermediateResponse = await getUser();
				res = {data: intermediateResponse.data.nfts};
				break;

			case "onCreated": {
				if (authorId) {
					res = await getUserNfts();
				}
				break;
			}

			default:
				break;
		}
		return res;
	} catch (err) {
		console.error(err);
	}
};

export const getPopularNft = (params) => {
	const {limit} = params;
	return axios.get(`${apiUrls.apiNft}/api/nft?limit=${limit}`);
};

export const getTrendsNft = (params) => {
	const {limit, page} = params;
	return axios.get(`${apiUrls.apiNft}/api/nft?limit=${limit}&page=${page}`);
};


export const getUserNfts = () => {
	return axios.get(`${apiUrls.apiNft}/api/own-nft`, {
		headers: {
			[AuthTokenConfig.autoSetHeader]: AuthTokenConfig.statusRequired,
		}
	});
};


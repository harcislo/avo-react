import axios from "axios";
import {apiUrls} from "../../constants";
import {AuthTokenConfig} from "./interceptor.service";

export const getPassphrase = () => {
	return axios.get(`${apiUrls.apiUsers}/api/users/passphrase`);
};

export const setPassphraseForExistingUser = ({user_id}) => {
	return axios.put(`${apiUrls.apiUsers}/api/users/passphrase`, {id: user_id});
};

export const checkSignupPossibility = ({username, userId}) =>
	axios.get(`${apiUrls.apiUsers}/api/user/signup/possibility?userId=${userId}&username=${username}`);

export const registerUser = (params) => {
	return axios.post(`${apiUrls.apiUsers}/api/user/signup`, {...params});
};

export const getMsgToSignRegistration = (params) => {
	return axios.get(`${apiUrls.apiUsers}/api/user/signup/msg-to-sign`, {...params});
};

export const registerUserByMetamask = (params) => {
	return axios.post(`${apiUrls.apiUsers}/api/user/signup/by-metamask`, {...params});
};

export const authorizeUser = (params) => {
	return axios.post(`${apiUrls.apiUsers}/api/user/authorization`, {...params});
};

export const getUser = () => {
	return axios.get(`${apiUrls.apiUsers}/api/user`, {
		headers: {
			[AuthTokenConfig.autoSetHeader]: AuthTokenConfig.statusRequired,
		},
		params: {
			include: ["nft"],
		},
	});
};

export const getNft = (params) => {
	const {id} = params;
	return axios.get(`${apiUrls.apiNft}/api/nft/${id}`);
};

export const getAuthor = (params) => {
	const {id} = params;
	return axios.get(`${apiUrls.authors}/${id}`);
};

export const getPopularNft = (params) => {
	const {limit} = params;
	return axios.get(`${apiUrls.apiNft}/api/nft?limit=${limit}`);
};

export const getTrendsNft = (params) => {
	const {limit, page} = params;
	return axios.get(`${apiUrls.apiNft}/api/nft?limit=${limit}&page=${page}`);
};

export const getGallery = (params) => {
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

export const getNftCategories = (params) => {
	const {type} = params;
	if (type === "nft") return axios.get(`${apiUrls.category}/nft/categories`);
	if (type === "by-author") return axios.get(`${apiUrls.category}/nft`);
	if (type === "authors") return axios.get(`${apiUrls.categoryAuthors}`);
};

export const likeCard = (data) => {
	return axios.post(
		`${apiUrls.apiNft}/api/nft/like`,
		{...data},
		{
			headers: {
				[AuthTokenConfig.autoSetHeader]: AuthTokenConfig.statusRequired,
			},
		}
	);
};

export const deleteLikedCard = (data) => {
	return axios.delete(`${apiUrls.apiNft}/api/nft/like`, {
		data: {
			user_id: data.user_id,
			nft_id: data.nft_id,
		},
		headers: {
			[AuthTokenConfig.autoSetHeader]: AuthTokenConfig.statusRequired,
		},
	});
};

export const getUserFavoriteNft = (params) => {
	return axios.get(`${apiUrls.apiNft}/api/nft/user-favorite`, {
		headers: {
			[AuthTokenConfig.autoSetHeader]: AuthTokenConfig.statusRequired,
		},
	});
};

export const makePurchase = (params) => {
	const {nftId, count} = params;
	return axios.post(
		`${apiUrls.apiUsers}/api/users/purchase`,
		{
			nftId,
			count,
		},
		{
			headers: {
				[AuthTokenConfig.autoSetHeader]: AuthTokenConfig.statusRequired,
			},
		}
	);
};

export const send2faMobileCode = (phoneNumber) => {
	return axios.post(`${apiUrls.api2fa}/api/2fa/phone/send-code`, {phoneNumber});
};

export const send2faEmailCode = (email) => {
	return axios.post(`${apiUrls.api2fa}/api/2fa/email/send-code`, {email});
};

export const registerAuthor = async ({
	emailVerificationCode,
	emailVerificationToken,
	phoneVerificationCode,
	phoneVerificationToken,
	authorPhotoUrl,
	passportFile,
	...credentials
}) => {
	if (authorPhotoUrl) {
		credentials.img = authorPhotoUrl;
	}
	let response = await axios.post(`${apiUrls.apiAuthors}/api/author`, credentials, {
		headers: {
			[AuthTokenConfig.autoSetHeader]: AuthTokenConfig.statusRequired,
			"mail2fa-token": emailVerificationToken,
			"mail-verification-code": emailVerificationCode,
			"phone2fa-token": phoneVerificationToken,
			"phone-verification-code": phoneVerificationCode,
		},
	});
	if (passportFile) {
		const formData = new FormData();
		formData.append('file', passportFile, 'file');
		await uploadAuthorPassport(response.data.id, formData);
	}
};
export const uploadAuthorPassport = (authorId, formData) => {
	return axios.post(`${apiUrls.files}/passport?authorId=${authorId}`, formData, {
		headers: {
			[AuthTokenConfig.autoSetHeader]: AuthTokenConfig.statusRequired,
		},
	});
};

export const uploadAuthorAvatar = (credentials) => {
	return axios.post(`${apiUrls.files}/preview?size=md`, credentials, {
		headers: {
			[AuthTokenConfig.autoSetHeader]: AuthTokenConfig.statusRequired,
		},
	});
};

export const getUserAuthor = () => {
	return axios.get(`${apiUrls.apiAuthors}/api/user/current/author`, {
		headers: {
			[AuthTokenConfig.autoSetHeader]: AuthTokenConfig.statusRequired,
		},
	});
};

export const createNft = async ({
	emailVerificationCode,
	emailVerificationToken,
	phoneVerificationCode,
	phoneVerificationToken,
	...credentials
}) => {
	const headers = {
		[AuthTokenConfig.autoSetHeader]: AuthTokenConfig.statusRequired,
	};
	let fileResponse;
	if (credentials.file) {
		let formData = new FormData();
		formData.append("file", credentials.file[0].originFileObj, "file");
		const type = credentials.file[0].type.includes("image")
			? "image"
			: credentials.file[0].type.includes("video")
				? "video"
				: "audio";
		if (type === 'image') {
			fileResponse = await axios.post(`${apiUrls.files}/preview?size=sm`, formData);
			credentials.preview = fileResponse.data.url;
			formData = new FormData();
			formData.append("file", credentials.file[0].originFileObj, "file");
			fileResponse = await axios.post(`${apiUrls.files}/preview?size=md`, formData);
			credentials.file = fileResponse.data.url;
		}

		if (type === 'video') {
			fileResponse = await axios.post(`${apiUrls.files}/preview/video?size=sm`, formData);
			credentials.preview = fileResponse.data.url;
			formData = new FormData();
			formData.append("file", credentials.file[0].originFileObj, "file");
			fileResponse = await axios.post(`${apiUrls.files}/preview/video?size=md`, formData);
			credentials.file = fileResponse.data.url;
		}
		let sourceFile = await axios.post(`${apiUrls.files}/nft/source-file`, formData);
		credentials.sourceFile = sourceFile.data.downloadUrl;

		if (type === 'audio') {
			credentials.file = credentials.sourceFile;
			formData = new FormData();
			formData.append("file", credentials.preview[0].originFileObj, "file");
			let res = await axios.post(`${apiUrls.files}/preview?size=sm`, formData);
			credentials.preview = res.data.url;
		}
	}

	if (!credentials.license) {
		credentials.license = "simple";
	}

	if (emailVerificationCode && emailVerificationToken && phoneVerificationCode && phoneVerificationToken) {
		headers["mail2fa-token"] = emailVerificationToken;
		headers["mail-verification-code"] = emailVerificationCode;
		headers["phone2fa-token"] = phoneVerificationToken;
		headers["phone-verification-code"] = phoneVerificationCode;
	}
	return axios.post(`${apiUrls.apiNft}/api/nft`, credentials, {
		headers,
	});
};

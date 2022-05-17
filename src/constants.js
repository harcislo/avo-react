/* globals ENV_TYPE */

// ======== APP CONSTANTS ========
export const supportBotUrl = "https://t.me/Avo_support_bot";

const isDev = ENV_TYPE === "development" || ENV_TYPE === "staging";

const isLocalDev = ENV_TYPE === "development";

// export const botName = isDev ? "avonft_staging_bot" : "AvoNFT_bot";
export const botName = isLocalDev ? "AvoRegistrationTest_bot" : isDev ? "avonft_staging_bot" : "AvoNFT_bot";

const domain = "avonft.io";

const domains = {
	apiUsers: "api-users." + domain,
	apiNft: "api-nft." + domain,
	apiAuthors: "api-authors." + domain,
};

const prefix = isDev ? "dev-" : "";

export const apiUrls = {
	passphrase: `https://${prefix}${domains.apiUsers}/api/users/passphrase`,
	signupPossibility: `https://${prefix}${domains.apiUsers}/api/user/signup/possibility`,
	users: `https://${prefix}${domains.apiUsers}/api/users`,
	authorization: `https://${prefix}${domains.apiUsers}/api/user/authorization`,
	userWallet: `https://${prefix}${domains.apiUsers}/api/wallets`,
	nft: `https://${prefix}${domains.apiNft}/api/nft`,
	// author: `https://${prefix}${domains.apiAuthors}/api/author`,
	authors: `https://${prefix}${domains.apiAuthors}/api/authors`,
	category: `https://${prefix}${domains.apiNft}/api`,
	categoryAuthors: `https://${prefix}${domains.apiAuthors}/api/authors/categories`,
	like: `https://${prefix}${domains.apiNft}/api/nft/like`,
	favoriteNft: `https://${prefix}${domains.apiNft}/api/nft/user-favorite`,

	apiUsers: `https://${prefix}api-users.${domain}`,
	apiNft: `https://${prefix}api-nft.${domain}`,
	apiAuthors: `https://${prefix}api-authors.${domain}`,
	api2fa: `https://${prefix}api-2fa.${domain}`,
	files: `https://${prefix}api-files.${domain}`,
};

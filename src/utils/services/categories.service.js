import axios from "axios";
import {apiUrls} from "../../constants";

export const getCategories = async (type) => {
	let res;
	switch (type) {
		case "nft":
			res = await axios.get(`${apiUrls.category}/nft/categories`);
			break;

		case "by-author":
			res = await axios.get(`${apiUrls.category}/nft`);
			break;

		case "authors":
			res = await axios.get(`${apiUrls.categoryAuthors}`);

			break;

		default:
			break;
	}

	return res;
};



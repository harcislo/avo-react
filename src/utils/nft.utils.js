import musicSkeletonImg from "../images/music.jpg";
import vedeoSkeletonImg from "../images/video.jpg";

export function makeNftImageSrc(nft) {
	switch (nft.content_type?.split("/")[0]) {
		case "audio":
			if (nft.preview_sm) {
				return nft.preview_sm;
			}
			return musicSkeletonImg;

		case "video":
			if (nft.preview_sm) {
				return nft.preview_sm;
			}
			return vedeoSkeletonImg;

		default:
			return nft.preview_sm;
	}
}

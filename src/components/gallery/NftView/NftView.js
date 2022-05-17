import React from "react";
import ReactPlayer from "react-player";
import SmoothLoadedImage from "../../SmoothLoadedImage/SmoothLoadedImage";
import DownloadFileBtn from "../DownloadFileBtn/DownloadFileBtn";
import DownloadImageBtn from "../DownloadImageBtn/DownloadImageBtn";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import "./NftView.scss";
const NftView = ({nft}) => {
	const isVideo = nft.content_type?.split("/")[0] === "video";
	const isMusic = nft.content_type?.split("/")[0] === "audio";
	return isMusic ? (
		<div>
			<div>
				<SmoothLoadedImage src={nft.preview_sm} width="100%" height="auto" className="work__img" />
			</div>
			<div className="nft-view-music-player">
				<MusicPlayer src={nft.content_url} />
			</div>
		</div>
	) : (
		<div className="work__img-wrap">
			{isVideo ? (
				<>
					<DownloadFileBtn src={nft.download_url} />
					<ReactPlayer
						url={nft.content_url}
						playing
						muted
						loop={true}
						className="work__img"
						height="auto"
						width="100%"
					/>
				</>
			) : (
				<>
					<DownloadImageBtn src={nft.download_url} />
					<SmoothLoadedImage src={nft.content_url} width="100%" height="auto" className="work__img" />
				</>
			)}
		</div>
	);
};

export default NftView;

import React from "react";
import BallBeatLoader from "../loaders/BallBeatLoader/BallBeatLoader";

import "./LoadMoreBtn.scss";

export default function LoadMoreBtn({ pagesLoaded, setPagesLoaded, loading }) {
	return (
		<button
			className="works__load-more green-btn"
			onClick={() =>
				setPagesLoaded({
					current: pagesLoaded.current + 1,
					prev: pagesLoaded.current,
				})
			}
		>
			{loading ? <BallBeatLoader scale="0.8" /> : " Загрузить еще"}
		</button>
	);
}

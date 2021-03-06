import React from "react";
import ContentLoader from "react-content-loader";

import "./GalleryGridLoader.scss";

const GalleryGridLoader = (props) => (
	// <ContentLoader
	// 	speed={2}
	// 	viewBox="0 0 1440 900"
	// 	backgroundColor="#ebebeb"
	// 	foregroundColor="#f2f2f2"
	// 	className="gallery__grid-loader"
	// 	{...props}
	// >
	// 	<path d="M 675.5 426 h -277 c -14.64 0 -26.5 -11.86 -26.5 -26.5 v -344 c 0 -14.64 11.86 -26.5 26.5 -26.5 h 277 c 14.64 0 26.5 11.86 26.5 26.5 v 344 c 0 14.64 -11.86 26.5 -26.5 26.5 z M 1411.5 426 h -277 c -14.64 0 -26.5 -11.86 -26.5 -26.5 v -344 c 0 -14.64 11.86 -26.5 26.5 -26.5 h 277 c 14.64 0 26.5 11.86 26.5 26.5 v 344 c 0 14.64 -11.86 26.5 -26.5 26.5 z M 1042.5 426 h -277 c -14.64 0 -26.5 -11.86 -26.5 -26.5 v -344 c 0 -14.64 11.86 -26.5 26.5 -26.5 h 277 c 14.64 0 26.5 11.86 26.5 26.5 v 344 c 0 14.64 -11.86 26.5 -26.5 26.5 z M 675.5 862 h -277 c -14.64 0 -26.5 -11.86 -26.5 -26.5 v -344 c 0 -14.64 11.86 -26.5 26.5 -26.5 h 277 c 14.64 0 26.5 11.86 26.5 26.5 v 344 c 0 14.64 -11.86 26.5 -26.5 26.5 z M 306.5 862 h -277 C 14.86 862 3 850.14 3 835.5 v -344 C 3 476.86 14.86 465 29.5 465 h 277 c 14.64 0 26.5 11.86 26.5 26.5 v 344 c 0 14.64 -11.86 26.5 -26.5 26.5 z M 1411.5 862 h -277 c -14.64 0 -26.5 -11.86 -26.5 -26.5 v -344 c 0 -14.64 11.86 -26.5 26.5 -26.5 h 277 c 14.64 0 26.5 11.86 26.5 26.5 v 344 c 0 14.64 -11.86 26.5 -26.5 26.5 z M 1042.5 862 h -277 c -14.64 0 -26.5 -11.86 -26.5 -26.5 v -344 c 0 -14.64 11.86 -26.5 26.5 -26.5 h 277 c 14.64 0 26.5 11.86 26.5 26.5 v 344 c 0 14.64 -11.86 26.5 -26.5 26.5 z M 306.5 426 h -277 C 14.86 426 3 414.14 3 399.5 v -344 C 3 40.86 14.86 29 29.5 29 h 277 c 14.64 0 26.5 11.86 26.5 26.5 v 344 c 0 14.64 -11.86 26.5 -26.5 26.5 z" />
	// 	<path d="M 209 332 H 24 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 h 185 c 3.31 0 6 2.69 6 6 s -2.69 6 -6 6 z M 298 402 h -48 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 h 48 c 3.31 0 6 2.69 6 6 s -2.69 6 -6 6 z M 298 379 h -82 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 h 82 c 3.31 0 6 2.69 6 6 s -2.69 6 -6 6 z" />
	// 	<path d="M 675.5 426 h -277 c -14.64 0 -26.5 -11.86 -26.5 -26.5 v -344 c 0 -14.64 11.86 -26.5 26.5 -26.5 h 277 c 14.64 0 26.5 11.86 26.5 26.5 v 344 c 0 14.64 -11.86 26.5 -26.5 26.5 z" />
	// 	<path d="M 578 332 H 393 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 h 185 c 3.31 0 6 2.69 6 6 s -2.69 6 -6 6 z M 667 402 h -48 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 h 48 c 3.31 0 6 2.69 6 6 s -2.69 6 -6 6 z M 667 379 h -82 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 h 82 c 3.31 0 6 2.69 6 6 s -2.69 6 -6 6 z" />
	// 	<path d="M 1042.5 426 h -277 c -14.64 0 -26.5 -11.86 -26.5 -26.5 v -344 c 0 -14.64 11.86 -26.5 26.5 -26.5 h 277 c 14.64 0 26.5 11.86 26.5 26.5 v 344 c 0 14.64 -11.86 26.5 -26.5 26.5 z" />
	// 	<path d="M 945 332 H 760 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 h 185 c 3.31 0 6 2.69 6 6 s -2.69 6 -6 6 z M 1034 402 h -48 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 h 48 c 3.31 0 6 2.69 6 6 s -2.69 6 -6 6 z M 1034 379 h -82 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 h 82 c 3.31 0 6 2.69 6 6 s -2.69 6 -6 6 z" />
	// 	<path d="M 1411.5 426 h -277 c -14.64 0 -26.5 -11.86 -26.5 -26.5 v -344 c 0 -14.64 11.86 -26.5 26.5 -26.5 h 277 c 14.64 0 26.5 11.86 26.5 26.5 v 344 c 0 14.64 -11.86 26.5 -26.5 26.5 z" />
	// 	<path d="M 1314 332 h -185 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 h 185 c 3.31 0 6 2.69 6 6 s -2.69 6 -6 6 z M 1403 402 h -48 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 h 48 c 3.31 0 6 2.69 6 6 s -2.69 6 -6 6 z M 1403 379 h -82 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 h 82 c 3.31 0 6 2.69 6 6 s -2.69 6 -6 6 z" />
	// 	<path d="M 306.5 862 h -277 C 14.86 862 3 850.14 3 835.5 v -344 C 3 476.86 14.86 465 29.5 465 h 277 c 14.64 0 26.5 11.86 26.5 26.5 v 344 c 0 14.64 -11.86 26.5 -26.5 26.5 z" />
	// 	<path d="M 209 768 H 24 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 h 185 c 3.31 0 6 2.69 6 6 s -2.69 6 -6 6 z M 298 838 h -48 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 h 48 c 3.31 0 6 2.69 6 6 s -2.69 6 -6 6 z M 298 815 h -82 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 h 82 c 3.31 0 6 2.69 6 6 s -2.69 6 -6 6 z" />
	// 	<path d="M 675.5 862 h -277 c -14.64 0 -26.5 -11.86 -26.5 -26.5 v -344 c 0 -14.64 11.86 -26.5 26.5 -26.5 h 277 c 14.64 0 26.5 11.86 26.5 26.5 v 344 c 0 14.64 -11.86 26.5 -26.5 26.5 z" />
	// 	<path d="M 578 768 H 393 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 h 185 c 3.31 0 6 2.69 6 6 s -2.69 6 -6 6 z M 667 838 h -48 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 h 48 c 3.31 0 6 2.69 6 6 s -2.69 6 -6 6 z M 667 815 h -82 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 h 82 c 3.31 0 6 2.69 6 6 s -2.69 6 -6 6 z" />
	// 	<path d="M 1042.5 862 h -277 c -14.64 0 -26.5 -11.86 -26.5 -26.5 v -344 c 0 -14.64 11.86 -26.5 26.5 -26.5 h 277 c 14.64 0 26.5 11.86 26.5 26.5 v 344 c 0 14.64 -11.86 26.5 -26.5 26.5 z" />
	// 	<path d="M 945 768 H 760 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 h 185 c 3.31 0 6 2.69 6 6 s -2.69 6 -6 6 z M 1034 838 h -48 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 h 48 c 3.31 0 6 2.69 6 6 s -2.69 6 -6 6 z M 1034 815 h -82 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 h 82 c 3.31 0 6 2.69 6 6 s -2.69 6 -6 6 z" />
	// 	<path d="M 1411.5 862 h -277 c -14.64 0 -26.5 -11.86 -26.5 -26.5 v -344 c 0 -14.64 11.86 -26.5 26.5 -26.5 h 277 c 14.64 0 26.5 11.86 26.5 26.5 v 344 c 0 14.64 -11.86 26.5 -26.5 26.5 z" />
	// 	<path d="M 1314 768 h -185 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 h 185 c 3.31 0 6 2.69 6 6 s -2.69 6 -6 6 z M 1403 838 h -48 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 h 48 c 3.31 0 6 2.69 6 6 s -2.69 6 -6 6 z M 1403 815 h -82 c -3.31 0 -6 -2.69 -6 -6 s 2.69 -6 6 -6 h 82 c 3.31 0 6 2.69 6 6 s -2.69 6 -6 6 z" />
	// </ContentLoader>
	<ContentLoader
		speed={2}
		width={240}
		height={300}
		viewBox="0 0 240 300"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		style={{
			margin: 15,
		}}
		{...props}
	>
		<rect x="0" y="0" rx="20" ry="20" width="240" height="200" />
		<rect x="58" y="107" rx="0" ry="0" width="0" height="1" />
		<rect x="10" y="210" rx="0" ry="0" width="150" height="22" />
		<rect x="150" y="270" rx="0" ry="0" width="80" height="20" />
		<rect x="193" y="248" rx="0" ry="0" width="35" height="17" />
		<circle cx="22" cy="279" r="12" />
		<rect x="-27" y="128" rx="0" ry="0" width="309" height="73" />
		<rect x="239" y="200" rx="0" ry="0" width="1" height="100" />
		<rect x="0" y="299" rx="20" ry="20" width="240" height="1" />
		<rect x="0" y="200" rx="20" ry="20" width="1" height="100" />
	</ContentLoader>
);

export default GalleryGridLoader;

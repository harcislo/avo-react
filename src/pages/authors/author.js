import React, { useEffect, useState } from "react";
import queryString from "query-string";
import tickImg from "../../images/tick.svg";
import authorImg from "../../images/people_big-img.png";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs/BreadCrumbs";
import WorkDescription from "../../components/WorkDescription/WorkDescription";
import {getAuthor, getUserFavoriteNft} from "../../utils/services/user-api.service";
import { Image } from "antd";
import GalleryAuthorNft from "../../components/gallery/Gallery/GalleryAuthorNft";
import {useDispatch, useSelector} from "react-redux";
import {setNftLikes} from "../../redux/actions/user.action";

export default function Author() {
	const [author, setAuthor] = useState({});
	const [window_width, set_window_width] = useState(null);
	const [window_height, set_window_height] = useState(null);
	const isAuth = useSelector((state) => state.authorization.isAuth);
	const dispatch = useDispatch()


	useEffect(() => {
		if (isAuth) {
			getUserFavoriteNft().then(res => dispatch(setNftLikes(res.data)))
		}
		(async function getData() {
			set_window_width(window.screen.width);
			set_window_height(window.screen.height);
			const query = queryString.parse(window.location.search);
			const res = await getAuthor({ id: query.id });
			setAuthor(res.data);
		})();
	}, []); // eslint-disable-line
	return (
		window_width &&
		window_height && (
			<>
				<BreadCrumbs />
				<article className="work container">
					<div className="work__wrap">
						<div className="work__content">
							<h1 className="work__title">
								{author.name} <img src={tickImg} alt="" />
							</h1>
							<div className="work__descriptions">
								{author.description ? <WorkDescription text={author.description} /> : ""}
							</div>
						</div>
						<div className="work__block">
							<h1 className="work__title mobile">
								{author.name} <img src={tickImg} alt="" />
							</h1>
							<div className="work__img-wrap">
								{authorImg ? <Image src={author.img} preview={false} /> : ""}
							</div>
						</div>
					</div>
				</article>

				{author.id ? (
					<GalleryAuthorNft window_width={window_width} window_height={window_height} authorId={author.id} />
				) : (
					""
				)}
			</>
		)
	);
}

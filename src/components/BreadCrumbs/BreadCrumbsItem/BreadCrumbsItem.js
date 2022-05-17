import { Link } from "gatsby";
import React from "react";

export default function BreadCrumbsItem({ text, to }) {
	return (
		<li className="bread-crumbs__item">
			<Link to={to} className="bread-crumbs__link">
				{text}
			</Link>
		</li>
	);
}

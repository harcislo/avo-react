const siteUrl = process.env.URL || `https://avonft.io`;

module.exports = {
	siteMetadata: {
		siteUrl: siteUrl,
		title: "avo_web",
	},
	plugins: [
		"gatsby-plugin-sass",
		"gatsby-plugin-image",
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-typescript",
		"gatsby-plugin-anchor-links",
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				icon: "src/images/avo.svg",
			},
		},
		"gatsby-plugin-mdx",
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
		`gatsby-env-variables`,
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "images",
				path: "./src/images/",
			},
			__key: "images",
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "pages",
				path: "./src/pages/",
			},
			__key: "pages",
		},
		{
			resolve: "gatsby-plugin-anchor-links",
			options: {
				offset: -100,
			},
		},
		{
			resolve: "gatsby-plugin-antd",
			options: {
				style: true,
			},
		},
		{
			resolve: "gatsby-plugin-less",
			options: {
				lessOptions: {
					modifyVars: {
						"primary-color": "rgb(212, 229, 60)",
						"primary-color-hover": "color(~`colorPalette('@{primary-color}', -5) `)",
						"btn-primary-color": "#0e4500",
						"btn-default-color": "#0e4500",
						"border-radius-base": "10px",
						"modal-footer-padding-vertical": "15px",
						"modal-footer-padding-horizontal": "20px",
						"modal-header-padding-vertical": "18px",
						"modal-header-padding-horizontal": "20px",
						"modal-header-title-font-size": "18px",
					},
					javascriptEnabled: true,
				},
			},
		},
		{
			resolve: `gatsby-plugin-yandex-metrika`,
			options: {
				// The ID of yandex metrika.
				trackingId: 87675696,
				webvisor: true,
				useCDN: true,
			},
		},

		{
			resolve: "gatsby-plugin-sitemap",
			options: {
				createLinkInHead: true,
				entryLimit: 1000,
				excludes: [],
				resolveSiteUrl: () => siteUrl,
				serialize: ({ path, modifiedGmt }) => {
					return {
						url: path,
						lastmod: modifiedGmt,
					};
				},
			},
		},
	],
};

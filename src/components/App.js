import React, {useEffect, useState} from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import MobileNavbar from "./MobileNavbar/MobileNavbar";
import {toggleMenuAction} from "../redux/actions/menu.action";
import {connect, useDispatch} from "react-redux";
import {useSwipeable} from "react-swipeable";
import {getUser, getUserAuthor} from "../utils/services/user-api.service";
import {setLogin} from "../redux/actions/authorization.action";
import {setNfts, setUserId, setUserInfo, setUserName, setWalletId} from "../redux/actions/user.action";
import queryString from "query-string";
import {AuthorizationService} from "../utils/services/authorization.service";
import {InterceptorService} from "../utils/services/interceptor.service";
import GlobalLoader from "./loaders/GlobalLoader/GlobalLoader";
import {setIsAppConfigured} from "../redux/actions/app.action";

function App({children, toggleMenu, isAppConfigured, setIsAppConfigured}) {
	const dispatch = useDispatch();
	const [innerWidth, setInnerWidth] = useState();
	const swipeHandlers = useSwipeable({
		onSwipedRight: () => toggleMenu(true),
		delta: {right: innerWidth * 0.6},
	});
	const configureAuthorization = async () => {
		try {
			const response = await getUser();
			if (response?.data) {
				dispatch(setLogin(true));
				dispatch(setUserId(response.data.id));
				dispatch(setUserName(response.data.username));
				dispatch(setWalletId(response.data.wallet_id));
				dispatch(setNfts(response.data.nfts));
				try {
					const authorResponse = await getUserAuthor();
					dispatch(setUserInfo({author: authorResponse.data}));
				} catch (err) {
					if (err.response?.status === 404) {
						dispatch(setUserInfo({author: null}));
					} else {
						throw err;
					}
				}

			} else {
				dispatch(setLogin(false));
			}
		} catch (e) {
			dispatch(setLogin(false));
		} finally {
			setIsAppConfigured(true);
		}
	};

	useEffect(() => {
		InterceptorService.initialize();
		const query = queryString.parse(window.location.search);

		setInnerWidth(window.innerWidth);

		if ("authorization" in query) {
			dispatch(AuthorizationService.authorizationPhrase(query.authorization));
		}
		if (AuthorizationService.accessToken) {
			configureAuthorization();
		} else {
			setIsAppConfigured(true);
		}

	}, []); // eslint-disable-line

	return (
		<>
			{isAppConfigured ? <div {...swipeHandlers}>
				<MobileNavbar />
				<Header />
				<main>{children}</main>
				<Footer />
			</div> : <GlobalLoader />}
		</>
	);
}

const mstp = ({app}) => ({
	isAppConfigured: app.isAppConfigured
});
const mdtp = (dispatch) => ({
	toggleMenu: () => dispatch(toggleMenuAction()),
	setIsAppConfigured: (isAppConfigured) => dispatch(setIsAppConfigured(isAppConfigured))
});

export default connect(mstp, mdtp)(App);

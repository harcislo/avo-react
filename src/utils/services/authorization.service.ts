import { setErrorMessage, setLogin } from "../../redux/actions/authorization.action";
import { setNfts, setUserId, setUserInfo, setUserName, setWalletId } from "../../redux/actions/user.action";
import { navigate } from "gatsby";
import { authorizeUser, getUser, getUserAuthor } from "../services/user-api.service";
import { setIsAppConfigured } from "../../redux/actions/app.action";

export class AuthorizationService {
	public static authorizationPhrase =
		(phrase, previousUrl = "/") =>
			async (dispatch) => {
				try {
					const response = await authorizeUser({ passphrase: phrase });
					AuthorizationService.saveAccessToken(response.data.token);
					const user = await getUser();
					dispatch(setLogin(true));
					dispatch(setUserId(response.data.user.id));
					dispatch(setUserName(response.data.user.username));
					dispatch(setWalletId(response.data.user.wallet_id));
					dispatch(setNfts(response.data.user.nfts));
					try {
						const authorResponse = await getUserAuthor();
						dispatch(setUserInfo({ author: authorResponse.data }));
					} catch (err) {
						if (err.response?.status === 404) {
							dispatch(setUserInfo({ author: null }));
						} else {
							throw err;
						}
					}
					await navigate(previousUrl || "/");
				} catch (e) {
					dispatch(setErrorMessage("Секретная фраза введена неверно"));
					console.log("Ошибка при авторизации кошелёк: ", e);
				}
			};

	public static get accessToken(): string {
		return localStorage.getItem("avo.access-token") as string;
	}

	public static saveAccessToken(token: string): string {
		localStorage.setItem("avo.access-token", token);
		return token;
	}

	/**
	 * Removes current access token value from storage
	 */
	public static clearAccessToken(): void {
		localStorage.removeItem("avo.access-token");
	}

	public static logOut(): void {
		this.clearAccessToken();
	}
}

import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authorization.action";
import { AuthorizationService } from "./authorization.service";
export class InterceptorService {
	public static initialize() {
		axios.interceptors.response.use(undefined, function (error) {
			if ([401, 403].includes(error.response?.status)) {
				const dispatch = useDispatch();
				dispatch(logout());
			}
			return Promise.reject(error);
		});
		axios.interceptors.request.use((request) => {
			if (
				request.headers[AuthTokenConfig.autoSetHeader] &&
				request.headers[AuthTokenConfig.autoSetHeader] === AuthTokenConfig.statusRequired
			) {
				if (AuthorizationService.accessToken) {
					request.headers[AuthTokenConfig.headerName] = AuthorizationService.accessToken;
				} else {
					return Promise.reject("Required authorization token is missed in request");
				}
			}

			delete request.headers[AuthTokenConfig.autoSetHeader];
			return request;
		});
	}
}

export const AuthTokenConfig = {
	autoSetHeader: "LOCAL-REQUEST-FOR-AUTO-SET-AUTH-TOKEN-TO-HEADER",
	headerName: "auth-token",
	statusRequired: "STATUS-REQUIRED-AUTH-TOKEN",
};

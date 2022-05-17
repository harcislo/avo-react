import { galleryReducer } from "./reducers/gallery.reducer";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { menuReducer } from "./reducers/menu.reducer";
import { registrationReducer } from "./reducers/registration.reducer";
import { userReducer } from "./reducers/user.reducer";
import { authorizationReducer } from "./reducers/authorization.reducer";
import { urlReducer } from "./reducers/url.reducer";
import { authorRegistrationReducer } from "./reducers/author-registration.reducer";

import { galleriesReducer } from "./reducers/galleries.reducer";
import { appReducer } from "./reducers/app.reducer";
import { addNftReducer } from "./reducers/add-nft.reducer";

const rootReducer = combineReducers({
	app: appReducer,
	menu: menuReducer,
	registration: registrationReducer,
	user: userReducer,
	authorization: authorizationReducer,
	url: urlReducer,
	authorRegistration: authorRegistrationReducer,
	galleries: galleriesReducer,
	addNft: addNftReducer
});

export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

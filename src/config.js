export const API_URL = 'http://localhost:3456/api'
export const APP_URL = 'http://localhost:5173'

export const API_URL_AUTH = API_URL + '/auth'
export const API_URL_UPLOAD = API_URL + '/upload'
export const API_URL_ACCESS = API_URL + '/access'
export const API_URL_REDIRECT = API_URL + '/redirect'
export const API_URL_CHANGE_DATA = API_URL + '/changeData'

export const API_URL_ACCESS_TYPES = {
	authorization: API_URL_ACCESS + '/isAuthorized',
	editProfile: API_URL_ACCESS + '/editProfile',
}

export const API_URL_UPLOAD_TYPES = {
	getUserFiles: API_URL_UPLOAD + '/getUserFiles',
	getUserFileIds: API_URL_UPLOAD + '/getUserFileIds',
	getFile: API_URL_UPLOAD + '/getFile',
	deleteFile: API_URL_UPLOAD + '/deleteFile',
	file: API_URL_UPLOAD + '/file',
	rateFile: API_URL_UPLOAD + '/updateFileRating',
	publicFile: API_URL_UPLOAD + '/updateIsPublic',
	getPublicFiles: API_URL_UPLOAD + '/getRandomPublicFiles',
	addToFavorites: API_URL_UPLOAD + '/addToFavorites',
	getFavorites: API_URL_UPLOAD + '/getFavoriteFiles',
	deleteFromFavorites: API_URL_UPLOAD + '/removeFromFavorites',
}

export const APP_THEMES = {
	light: 'light',
	dark: 'dark',
}

export const LANG = {
	en: 'en',
	ru: 'ru',
	default: 'en',
}

export const ROUTES = {
	default: '/',
	login: 'login',
	register: 'register',
	home: 'home',
	profile: 'profile',
	about: 'about',
	materialsUsed: 'used',
	error: 'error',
	all: '*',
}

export const TABS = {
	personal: 'personal',
	favorite: 'favorite',
}

export const FILE_TYPES = {
	image: ['png', 'jpg', 'jpeg', 'gif', 'svg'],
	code: [
		'txt',
		'js',
		'css',
		'html',
		'json',
		'jsx',
		'md',
		'sass',
		'scss',
		'ts',
		'tsx',
	],
	accepted: [
		'.js',
		'.ts',
		'.jsx',
		'.tsx',
		'.css',
		'.scss',
		'.sass',
		'.html',
		'.htm',
		'.xml',
		'.xhtml',
		'.md',
		'.png',
		'.jpg',
		'.jpeg',
		'.gif',
		'.svg',
	],
}

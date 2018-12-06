'use strict';

const SPOTIFY_CLIENT_ID = '4e91859d240c487f81896a4ca4b79837';


let scopes = [
	'user-read-recently-played',
	'user-top-read',
	'user-follow-read',
	'user-read-playback-state',
	'user-read-currently-playing',
	'user-library-read',
	'playlist-read-collaborative',
	'playlist-read-private',
];

let params = {
	client_id: SPOTIFY_CLIENT_ID,
	response_type: 'token',
	redirect_uri: 'https://dwt47.github.io/test-spotify/',
	scope: scopes.join(' '),
};

let authURL = 'https://accounts.spotify.com/authorize?';

for (let [k,v] of Object.entries(params)) {
	authURL += k + '=' + encodeURIComponent(v);
	authURL += '&';
}

authURL = authURL.slice(0,-1);

if (location.hash) {
	let params = {};
	location.hash.slice(1).split('&').forEach(param => {
		let [k,v] = param.split('=').map(v => decodeURIComponent(v));
		params[k] = v;
	});
	console.log(params);
} else {
	window.location = authURL;
}

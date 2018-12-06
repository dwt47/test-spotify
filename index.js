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

let fetchOptions = {};

if (location.hash) {
	let params = {};
	location.hash.slice(1).split('&').forEach(param => {
		let [k,v] = param.split('=').map(v => decodeURIComponent(v));
		params[k] = v;
	});

	fetchOptions.headers = { Authorization: `Bearer ${params.access_token}` } };
} else if (location.search && location.search.startsWith('?error')) {
	let h3 = document.createElement('h3');
	h3.textContent = "Trouble Logging In";
	h3.style.color = 'red';
	h3.style.fontSize = '3em';
	document.body.appendChild(h3);
} else {
	window.location = authURL;
}

function getRecentPlays() {
	let url = `https://api.spotify.com/v1/me/player/recently-played`;

	fetch(url, fetchOptions).then(r => r.json()).then(data => {
		console.log(window.__DATA__ = data);
		let div = document.createElement('div');
		div.textContent = JSON.stringify(data, true);
		document.body.appendChild(div);
	});
}

if (fetchOptions.headers) {
	getRecentPlays();
}

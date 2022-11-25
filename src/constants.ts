export const signatureGradient =
	"linear-gradient(45deg, rgba(174,173,251,1) 0%, rgba(255,255,255,1) 35%, rgba(176,215,254,1) 65%, rgba(214,253,215,1) 100%)";
export const signatureGradientLight =
	"linear-gradient(45deg, rgba(174,173,251,.6) 0%, rgba(255,255,255,.6) 35%, rgba(176,215,254,.6) 65%, rgba(214,253,215,.6) 100%)";

export enum permissions {
	GOD = "god",
	ADMIN = "admin",
	CURATOR = "curator",
	TIER2 = "tier2",
	TIER1 = "tier1",
	NONE = "none",
}

export const headerStyle = {
	fontSize: "30px",
	fontWeight: "500",
};

export enum SpotifyScopes {
	userReadEmail = "user-read-email",
	userReadPrivate = "user-read-private",
	userReadRecentlyPlayed = "user-read-recently-played",
	userTopRead = "user-top-read",
	playlistReadPrivate = "playlist-read-private",
	userLibraryModify = "user-library-modify",
}

export type SpotifyScopesType = {
	userReadEmail: "user-read-email";
	userReadPrivate: "user-read-private";
	userReadRecentlyPlayed: "user-read-recently-played";
	userTopRead: "user-top-read";
	playlistReadPrivate: "playlist-read-private";
	userLibraryModify: "user-library-modify";
};

export const requiredScopes = [
	SpotifyScopes.userReadEmail,
	SpotifyScopes.userReadPrivate,
];

export const curatorRequiredScopes = [
	SpotifyScopes.userReadRecentlyPlayed,
	SpotifyScopes.userTopRead,
	SpotifyScopes.playlistReadPrivate,
];

export const spotifyScopeData = {
	[SpotifyScopes.userReadPrivate]: {
		scope: "user-read-private",
		label: "View Account",
		endpoint: "Get Current User's Profile",
		link: "https://developer.spotify.com/documentation/web-api/reference/#/operations/get-current-users-profile",
	},
	[SpotifyScopes.playlistReadPrivate]: {
		scope: "playlist-read-private",
		label: "View Playlists",
		endpoint: "Get a List of Current User's Playlists",
		link: "https://developer.spotify.com/documentation/web-api/reference/#/operations/get-a-list-of-current-users-playlists",
	},
	[SpotifyScopes.userReadRecentlyPlayed]: {
		scope: "user-read-recently-played",
		label: "View Recently Played Tracks",
		endpoint: "Get Current User's Recently Played Tracks",
		link: "https://developer.spotify.com/documentation/web-api/reference/#/operations/get-recently-played",
	},
	[SpotifyScopes.userTopRead]: {
		scope: "user-top-read",
		label: "View Top Artists and Tracks",
		endpoint: "Get a User's Top Artists and Tracks",
		link: "https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-top-artists-and-tracks",
	},
	[SpotifyScopes.userLibraryModify]: {
		scope: "user-library-modify",
		label: "Like + Unlike Songs from CC",
		endpoint: "Save Tracks for User",
		link: "https://developer.spotify.com/documentation/web-api/reference/#/operations/save-tracks-user",
	},
};

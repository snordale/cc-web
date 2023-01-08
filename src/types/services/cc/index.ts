export type JoinRequestArgs = {
	email: string;
	username: string;
	password: string;
	token: string | undefined;
};

export type LoginRequestArgs = {
	usernameOrEmail: string;
	password: string;
};

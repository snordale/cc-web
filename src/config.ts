class GeneralConfig {
	isProd!: boolean
	isLocal!: boolean
}

class RoutingConfig {
	apiRoot!: string
	webRoot!: string
}

export const general: GeneralConfig = {
	isProd: process.env.NODE_ENV === "production",
	isLocal: process.env.LOCAL === "true",
}

export const routing: RoutingConfig = {
	apiRoot: process.env.API_ROOT!,
	webRoot: process.env.WEB_ROOT!
}


export default {
	general,
	routing
} as const
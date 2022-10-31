/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */

module.exports = {
	reactStrictMode: true,
	env: {
		IS_LOCAL: process.env.IS_LOCAL,
		ROOT: process.env.ROOT,
		API_ROOT: process.env.API_ROOT,
	}
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Manejo de Secciones Inhabilitadas \\
	async redirects() {
		return [];
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				port: "",
				pathname: "/*/**",
			},
		],
	},
	reactStrictMode: false,
};

export default nextConfig;

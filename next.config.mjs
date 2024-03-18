/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'obssolution.com.sg',
			},
		],
	},
};

export default nextConfig;

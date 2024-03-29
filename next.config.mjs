/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'obssolution.com.sg',
			},
			{
				protocol: 'https',
				hostname: 'picsum.photos',
			},
		],
	},
	env: {
		baseURL: 'https://jsonplaceholder.typicode.com',
		baseImageURL: 'https://picsum.photos',
	},
};

export default nextConfig;

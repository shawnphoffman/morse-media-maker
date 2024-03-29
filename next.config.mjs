/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.mp3/,
			use: [
				options.defaultLoaders.babel,
				{
					loader: 'file-loader',
					// options: pluginOptions.options,
				},
			],
		})

		return config
	},
}

export default nextConfig

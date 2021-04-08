const path = require('path');

module.exports = {
	trailingSlash: true,
  webpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader'
    });
    return config;
  },
	webpackDevMiddleware: config => {
		config.watchOptions = {
			poll: 1000,
			aggregateTimeout: 300
		};
		return config
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')]
	}
}
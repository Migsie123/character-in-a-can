const globImporter = require("node-sass-glob-importer");
const path = require("path");

module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  sassOptions: {
    importer: globImporter(),
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        ...{ child_process: false, fs: false, net: false, tls: false },
      };
    }
    return config;
  },
};

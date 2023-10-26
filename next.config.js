/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.externals.push({
      //'googleapis': 'commonjs googleapis'
    });


    return config;
  }
}

module.exports = nextConfig

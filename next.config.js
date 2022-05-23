/** @type {import('next').NextConfig} */

const withImages = require('next-images')

const withTM = require('next-transpile-modules')([
  'antd-mobile',
]);

const nextConfig = {
  basePath: "",
  // basePath: "/nextjs-demo",
  reactStrictMode: true,
  distDir: "build",
}

module.exports = withTM(withImages(nextConfig))

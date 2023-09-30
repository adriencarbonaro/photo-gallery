/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "adriencarbophotography.s3.eu-west-3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
    domains: ["adriencarbophotography.s3.eu-west-3.amazonaws.com"],
  },
};

module.exports = nextConfig;

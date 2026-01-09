/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
  compiler: {
    // Entfernt console.logs in Production für sauberen Code
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
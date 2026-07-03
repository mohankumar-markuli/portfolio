/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repoName = '/mohankumar-markuli';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  assetPrefix: isProd ? repoName : '',
  basePath: isProd ? repoName : '',
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;

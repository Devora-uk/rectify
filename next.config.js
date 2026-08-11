/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  async redirects() {
    return [
      {
        source: '/areas/united-kingdom',
        destination: '/areas/united-states',
        permanent: true,
      },
      {
        source: '/areas/united-kingdom/:path*',
        destination: '/areas/united-states',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

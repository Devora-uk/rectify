/** @type {import('next').NextConfig} */
const rybbitHost = process.env.NEXT_PUBLIC_RYBBIT_HOST || 'https://app.rybbit.io';

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  async rewrites() {
    return [
      {
        source: '/api/script.js',
        destination: `${rybbitHost}/api/script.js`,
      },
      {
        source: '/api/track',
        destination: `${rybbitHost}/api/track`,
      },
      {
        source: '/api/identify',
        destination: `${rybbitHost}/api/identify`,
      },
      {
        source: '/api/replay.js',
        destination: `${rybbitHost}/api/replay.js`,
      },
      {
        source: '/api/site/:path*',
        destination: `${rybbitHost}/api/site/:path*`,
      },
      {
        source: '/api/session-replay/:path*',
        destination: `${rybbitHost}/api/session-replay/:path*`,
      },
    ];
  },
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

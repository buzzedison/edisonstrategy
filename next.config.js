/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: false
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gazepjfxvgvrtuokiukz.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/cover-images/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

module.exports = nextConfig;

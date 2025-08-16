/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
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
    ],
  },
};

module.exports = nextConfig;

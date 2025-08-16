/** @type {import('next').NextConfig} */
const nextConfig = {
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
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;

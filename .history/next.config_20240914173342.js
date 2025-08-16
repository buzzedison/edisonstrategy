/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gazepjfxvgvrtuokiukz.supabase.co', // Your Supabase hostname
        port: '',
        pathname: '/storage/v1/object/public/cover-images/**', // Path for images
      },
    ],
  },
};

module.exports = nextConfig;

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
  async redirects() {
    return [
      {
        source: '/admin/blog/listing',
        destination: '/admin/insights',
        permanent: true,
      },
      {
        source: '/admin/blog/new',
        destination: '/admin/insights/new',
        permanent: true,
      },
      {
        source: '/admin/blog/edit/:id',
        destination: '/admin/insights/edit/:id',
        permanent: true,
      },
      {
        source: '/insights/admin',
        destination: '/admin/insights',
        permanent: true,
      }
    ];
  },
};

module.exports = nextConfig;

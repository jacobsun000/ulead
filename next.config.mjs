/** @type {import('next').NextConfig} */
export const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  serverExternalPackages: ['pg', 'cos-nodejs-sdk-v5', '@vercel/blob', '@neondatabase/serverless'],
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ulead-cn-1258928601.cos.ap-beijing.myqcloud.com',
        pathname: '/media/**',
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
export const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;

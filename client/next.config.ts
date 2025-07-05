import type { NextConfig } from "next";

const backendPort = process.env.BACKEND_PORT || '5065';
const nextConfig: NextConfig = {
  /* config options here */
    async rewrites() {
    return [
      {
        source: '/api/mood',
        destination: `http://localhost:${backendPort}/api/mood`,
      },
    ];
  },
};

export default nextConfig;



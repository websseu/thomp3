import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "is1-ssl.mzstatic.com",
      },
      {
        protocol: "https",
        hostname: "image.bugsm.co.kr",
      },
      {
        protocol: "https",
        hostname: "cdn.music-flo.com",
      },
      {
        protocol: "https",
        hostname: "image.genie.co.kr",
      },
      {
        protocol: "https",
        hostname: "cdnimg.melon.co.kr",
      },
      {
        protocol: "https",
        hostname: "musicmeta-phinf.pstatic.net",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "www.youtube.com",
      },
      {
        protocol: "https",
        hostname: "charts-static.billboard.com",
      },
      {
        protocol: "https",
        hostname: "www.billboard.com",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const cspHeader = `
    default-src 'self';
    connect-src 'self' https://formspree.io;
    script-src 'self' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self' https://formspree.io;
    frame-src 'self' https://my.matterport.com https://discover.matterport.com https://*.matterport.com https://www.youtube.com https://youtube.com;
    frame-ancestors 'self';
    upgrade-insecure-requests;
`;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  headers: () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
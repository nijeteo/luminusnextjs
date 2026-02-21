import type { NextConfig } from "next";

const cspHeader = `
    default-src 'self';
    connect-src 'self' https://formspree.io https://*.api.sanity.io wss://*.api.sanity.io https://registry.npmjs.org https://*.supabase.co;
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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      // Dodaj hostname svog Supabase projekta (npr. abc123xyz.supabase.co) kada koristiš slike iz Storage
      {
        protocol: "https",
        hostname: "supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
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
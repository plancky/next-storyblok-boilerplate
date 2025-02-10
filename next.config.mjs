/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a-ap.storyblok.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '30mb',
    },
  },
  redirects: async () => {
    return [
      {
        source: '/invest',
        destination: '/portfolio/#contact',
        permanent: true,
      },
      {
        source: '/our-core-values',
        destination: '/team/#our-core-beliefs',
        permanent: true,
      },
      {
        source: '/post/trading-up-decoding-young-urban-consumers-hunt-for-better-for-you-products-in-southeast-asia',
        destination: '/blog/young-urban-consumers-are-trading-up',
        permanent: true,
      },
      {
        source: '/post/skincare-southeast-asia-challenger-brands-affordable-quality',
        destination: '/blog/the-state-of-skincare-in-southeast-asia',
        permanent: true,
      },
      {
        source: '/post/how-the-blueprint-brand-value-score-works-apple',
        destination: '/blog/how-the-blueprint-brand-value-score-works-apple',
        permanent: true,
      },
      {
        source: '/post/blueprint-brand-value-score-framework',
        destination: '/blog/blueprint-brand-value-score-framework',
        permanent: true,
      },
      {
        source: '/post/brand-value-gamechanger-intangible-asset',
        destination: '/blog/brand-value-the-gamechanger-and-a-critical-intangible-asset',
        permanent: true,
      },
    ]
  }
};

export default nextConfig;
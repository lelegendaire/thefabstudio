/** @type {import('next').NextConfig} */
const nextConfig = {
  
  // ✅ Compression Gzip automatique
  compress: true,
  
  // ✅ Désactiver source maps en production (économise ~40%)
  productionBrowserSourceMaps: false,
  
  // ✅ Optimiser images
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1920],
    minimumCacheTTL: 31536000,
  },
  
  // ✅ Tree shaking agressif
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          three: {
            name: 'three',
            test: /[\\/]node_modules[\\/](three)[\\/]/,
            priority: 10,
          },
          gsap: {
            name: 'gsap',
            test: /[\\/]node_modules[\\/](gsap)[\\/]/,
            priority: 10,
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
const nextConfig = {
  images: {
    domains: ['img.pokemondb.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.pokemondb.net',
        port: '',
        pathname: '/artwork/large/**',
      },
    ],
  },
}

module.exports = nextConfig;

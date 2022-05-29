
module.exports = {
  async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://frme.igscs.in/:path*',
        },
      ]
    },
};
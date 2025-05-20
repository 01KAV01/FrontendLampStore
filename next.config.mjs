/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'placehold.co',
            port: ""
          },
           {
        protocol: 'https',
        hostname: 'backendlampstore-production.up.railway.app',
        port: ""
      },
       {
        protocol: 'https',
        hostname: 'frontendlampstore-production.up.railway.app',
        port: ""
      }
        ],
        
      },
callbacks: {

    async redirect({ url, baseUrl }) {

      const frontendUrl = process.env.NEXTAUTH_URL || baseUrl;

      if (url.startsWith('/')) {
        return `${frontendUrl}${url}`;
      }

      try {
        const parsedUrl = new URL(url);
        if (parsedUrl.origin === frontendUrl) {
          return url;
        }
      } catch (error) {
        console.error('Invalid URL in redirect:', url);
      }

      return baseUrl;
    },
  },
}


export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
    ignoreBuildErrors: (error) => {
      const ignoredLibs = [
        /packages\/ts\-/,
        /node_modules\/@problematic\-lib/
      ];
      return ignoredLibs.some(pattern => pattern.test(error.file));
    }
	}
	
};

export default nextConfig;

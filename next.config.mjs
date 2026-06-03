/** @type {import('next').NextConfig} */
const repo = "enav-booking";
const isGithubPages = process.env.DEPLOY_TARGET === "github-pages";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isGithubPages ? `/${repo}` : "",
  assetPrefix: isGithubPages ? `/${repo}/` : "",
  staticPageGenerationTimeout: 300,
};

export default nextConfig;

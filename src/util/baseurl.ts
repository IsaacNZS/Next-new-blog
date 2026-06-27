export const getbaseUrl = () => {
  const env = process.env.NODE_ENV;
  const baseUrl =
    env === "development"
      ? "http://localhost:3000"
      : "https://next-new-blog.vercel.app";
  return baseUrl;
};

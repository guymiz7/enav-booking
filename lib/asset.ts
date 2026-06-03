export const BASE_PATH =
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PUBLIC_DEPLOY_TARGET === "github-pages"
    ? "/enav-booking"
    : "";

export const asset = (p: string) =>
  `${BASE_PATH}${p.startsWith("/") ? p : `/${p}`}`;

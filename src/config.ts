interface GeneralConfig {
  isProd: boolean;
  isLocal: boolean;
  isPrerelease: boolean;
}

interface RoutingConfig {
  apiRoot: string;
  root: string;
}

export const isProd = process.env.NODE_ENV !== "development";
export const isLocal = process.env.IS_LOCAL !== "false";
export const isPrerelease = true;

export const general: GeneralConfig = {
  isProd,
  isLocal,
  isPrerelease,
};

export const root = process.env.ROOT ?? "http://localhost:3000";
export const apiRoot = process.env.API_ROOT ?? "http://localhost:3001";

export const routing: RoutingConfig = {
  root,
  apiRoot,
};

export default {
  general,
  routing,
} as const;

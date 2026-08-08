export const pageRoutes = [
  { path: "/", label: "Home", title: "Home | Yifan Suo" },
  { path: "/research", label: "Research", title: "Research | Yifan Suo" },
  { path: "/research/smco-workflow", label: "SmCo Workflow", title: "SmCo Workflow | Yifan Suo" },
  { path: "/cv", label: "CV", title: "CV | Yifan Suo" },
] as const;

export function routerBasename(baseUrl: string) {
  try {
    const pathname = new URL(baseUrl, "https://local.invalid").pathname;
    return pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  } catch {
    return "/";
  }
}

export function assetUrl(path: string, baseUrl = import.meta.env.BASE_URL) {
  const base = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return `${base}${path.replace(/^\/+/, "")}`;
}

export function titleForPath(pathname: string) {
  return pageRoutes.find((route) => route.path === pathname)?.title ?? pageRoutes[0].title;
}

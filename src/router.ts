import { useEffect, useState, type MouseEvent } from "react";

export const HOME = "#/";
export const PLANERA = "#/case-studies/planera";
const scrollAt = new Map<string, number>();

/**
 * Normalizes any route string into a standard hash format, e.g. "#/" or "#/case-studies/planera"
 */
export function normalizeRoute(route: string): string {
  if (!route || route === "#" || route === "#/" || route === "/") return HOME;
  const trimmed = route.replace(/\/+$/, "");
  if (trimmed === "#" || trimmed === "") return HOME;
  if (trimmed.startsWith("#/")) return trimmed;
  if (trimmed.startsWith("#")) return "#/" + trimmed.slice(1).replace(/^\/+/, "");
  if (trimmed.startsWith("/")) return "#" + trimmed;
  return "#/" + trimmed;
}

export function getCurrentRoute(): string {
  if (location.hash && location.hash !== "#") {
    return normalizeRoute(location.hash);
  }
  // Fallback if someone landed directly on a pathname like /case-studies/planera
  if (location.pathname.endsWith("/case-studies/planera")) {
    return PLANERA;
  }
  return HOME;
}

export function navigate(path: string) {
  const current = getCurrentRoute();
  scrollAt.set(current, window.scrollY);
  const target = normalizeRoute(path);
  if (location.hash !== target) {
    location.hash = target;
  } else {
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
}

/** onClick for internal <a href>: client-side navigation, but let new-tab clicks through. */
export function go(e: MouseEvent<HTMLAnchorElement>) {
  if (e.button || e.metaKey || e.ctrlKey || e.shiftKey) return;
  e.preventDefault();
  const href = e.currentTarget.getAttribute("href") || HOME;
  navigate(href);
}

export function usePath() {
  const [route, setRoute] = useState(getCurrentRoute);

  useEffect(() => {
    history.scrollRestoration = "manual";
    const sync = () => setRoute(getCurrentRoute());
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, scrollAt.get(route) ?? 0);
  }, [route]);

  return route;
}

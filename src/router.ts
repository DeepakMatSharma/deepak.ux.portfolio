import { useEffect, useState, type MouseEvent } from "react";

export const PLANERA = "/case-studies/planera";
const scrollAt = new Map<string, number>();

export function navigate(path: string) {
  scrollAt.set(location.pathname, scrollY);
  history.pushState(null, "", path);
  dispatchEvent(new PopStateEvent("popstate"));
}

/** onClick for internal <a href>: client-side navigation, but let new-tab clicks through. */
export function go(e: MouseEvent<HTMLAnchorElement>) {
  if (e.button || e.metaKey || e.ctrlKey || e.shiftKey) return;
  e.preventDefault();
  navigate(e.currentTarget.getAttribute("href")!);
}

export function usePath() {
  const [path, setPath] = useState(location.pathname);
  useEffect(() => {
    history.scrollRestoration = "manual";
    const sync = () => setPath(location.pathname);
    addEventListener("popstate", sync);
    return () => removeEventListener("popstate", sync);
  }, []);
  useEffect(() => {
    window.scrollTo(0, scrollAt.get(path) ?? 0);
  }, [path]);
  return path;
}

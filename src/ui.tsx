import { useEffect, useRef, useState, type ReactNode } from "react";

export const A = `${import.meta.env.BASE_URL}assets/`;
export const links = {
  linkedin: "https://www.linkedin.com/in/ux-deepak/",
  email: "mailto:ux.deepak@gmail.com",
};

export function Section({ children, className = "", flush = false }: { children: ReactNode; className?: string; flush?: boolean }) {
  return (
    <div className={`mx-auto w-full max-w-[1920px] px-(--pad-x) ${flush ? "" : "py-(--pad-y)"} ${className}`}>{children}</div>
  );
}

export const Display = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <h2 className={`font-serif text-display font-bold italic tracking-[-0.0069em] ${className}`}>{children}</h2>
);

/** Fades and rises into place the first time it scrolls into view. */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setOn(true);
        io.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-on={on} className={`rise ${className}`}>
      {children}
    </div>
  );
}

/** Hover overlay for case studies that aren't published yet. Parent needs `group relative overflow-hidden`. */
export const ComingSoon = () => (
  <span
    aria-hidden
    className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/60 font-serif text-title font-bold text-white italic opacity-0 transition-opacity duration-300 group-hover:opacity-100"
  >
    Coming soon
  </span>
);

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Section } from "./ui";
import { steps } from "./steps";

const ZONE = 60; // svh of scrolling per step
const COLLAPSE_MS = 600; // Figma: smart animate, 0.6s ease-out
const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Approach() {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const targetRef = useRef(0);
  const fast = useRef(false); // first expand is 1s (intro), later ones 0.6s
  const [phase, setPhase] = useState(0); // intro: 0 hidden, 1 title, 2 first line, 3 steps live
  const [target, setTarget] = useState(0); // step the scroll position points at
  const [shown, setShown] = useState(0); // step currently on screen
  const [open, setOpen] = useState(false); // pill + body expanded

  // Intro (Figma 70 → 73): plays once, when the slide pins in view.
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (reduceMotion()) {
          setPhase(3);
          setShown(targetRef.current);
          return;
        }
        setTimeout(() => setPhase(1), 500);
        setTimeout(() => setPhase(2), 1500);
        setTimeout(() => {
          setPhase(3);
          setShown(targetRef.current);
        }, 2500);
      },
      { threshold: 0.6 },
    );
    io.observe(stage.current!);
    return () => io.disconnect();
  }, []);

  // Scroll position → step. Each sentinel spans one zone; the one crossing the viewport centre wins.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = Number((e.target as HTMLElement).dataset.i);
          targetRef.current = i;
          setTarget(i);
        }),
      { rootMargin: "-50% 0px -50% 0px" },
    );
    track.current!.querySelectorAll("[data-i]").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // Step change (Figma 73 → 74 → 75 → 76): collapse, swap copy, expand.
  useEffect(() => {
    if (phase < 3) return;
    if (shown === target) {
      setOpen(true);
      return;
    }
    fast.current = true;
    setOpen(false);
    const t = setTimeout(() => {
      setShown(target);
      setOpen(true);
    }, reduceMotion() ? 0 : COLLAPSE_MS);
    return () => clearTimeout(t);
  }, [target, shown, phase]);

  const live = phase >= 3 && open;
  const step = steps[shown];

  return (
    <section className="bg-surface">
      <h2 className="sr-only">How I approach design</h2>
      <ol className="sr-only">
        {steps.map((s) => (
          <li key={s.pill}>
            <strong>{s.pill}</strong>. {s.body.join(" ")}
          </li>
        ))}
      </ol>

      <div ref={track} className="relative" style={{ height: `calc(100svh + ${steps.length * ZONE}svh)` }} aria-hidden>
        <div className="pointer-events-none absolute inset-x-0 top-[50svh]">
          {steps.map((s, i) => (
            <div key={s.pill} data-i={i} style={{ height: `${ZONE}svh` }} />
          ))}
        </div>

        <div
          ref={stage}
          className="sticky top-0 flex h-svh min-h-[34rem] items-center overflow-hidden"
          style={{ "--wipe-dur": fast.current ? "0.6s" : "1s" } as CSSProperties}
        >
          <Section flush className="grid items-center gap-10 md:grid-cols-[856fr_824fr] md:gap-[4.167vw]">
            <p
              className={`font-serif text-display font-bold italic tracking-[-0.0069em] transition-[opacity,transform] duration-1000 ease-out motion-reduce:transition-none ${
                phase >= 1 ? "" : "translate-y-[clamp(1.5rem,3.65vw,4.375rem)] opacity-0"
              }`}
            >
              How I approach design
            </p>

            <div className="text-subhead tracking-[-0.025em]">
              <p className="wipe [--wipe-dur:1s]" data-on={phase >= 2}>
                Good design isn't about attractive visuals.
              </p>
              <div className="-mt-[0.078em] flex flex-wrap items-center gap-x-[0.3125em]">
                <p className="wipe" data-on={phase >= 3}>Its about</p>
                <mark
                  data-on={live}
                  className="wipe bg-transparent pr-[0.16em] pl-[0.19em] font-serif leading-[1.5] font-bold text-white italic [background:linear-gradient(transparent_0.125em,var(--color-accent)_0.125em_1.47em,transparent_1.47em)]"
                >
                  {step.pill}
                </mark>
              </div>
              {/* All bodies share one grid cell so the column keeps the tallest height: no jumping between steps. */}
              <div data-on={live} className="wipe mt-[clamp(2rem,4.3vw,5.15rem)] grid max-w-[555px] text-body tracking-[-0.0167em]">
                {steps.map((s, i) => (
                  <div key={s.pill} className={`col-start-1 row-start-1 ${i === shown ? "" : "invisible"}`}>
                    {s.body.map((t) => (
                      <p key={t}>{t}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </div>
    </section>
  );
}

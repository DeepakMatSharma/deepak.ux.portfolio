import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Section } from "./ui";
import { steps } from "./steps";

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const COOLDOWN_MS = 500; // prevents multiple step skips on single trackpad gesture

export default function Approach() {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const hasTriggeredIntro = useRef(false);
  const lastStepTime = useRef(0);

  const [phase, setPhase] = useState(0); // 0: offscreen, 1: title, 2: first line, 3: "its about"
  const [pillWipe, setPillWipe] = useState(false); // first-time swipe animation on pill
  const [bodyLive, setBodyLive] = useState(false); // body text entrance
  const [hasEntered, setHasEntered] = useState(false); // first-time entrance completed

  const [currentStep, setCurrentStep] = useState(0);
  const [outgoingStep, setOutgoingStep] = useState<number | null>(null);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isSliding, setIsSliding] = useState(false);

  const currentStepRef = useRef(0);
  currentStepRef.current = currentStep;

  // Advance to a specific step with vertical sliding animation
  const advanceToStep = (targetStep: number) => {
    const prev = currentStepRef.current;
    if (targetStep === prev) return;

    const isFwd = targetStep > prev;
    setDirection(isFwd ? "forward" : "backward");
    setOutgoingStep(prev);
    setCurrentStep(targetStep);
    setIsSliding(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsSliding(true);
      });
    });

    setTimeout(() => {
      setOutgoingStep(null);
    }, 350);
  };

  // Intro: ONLY trigger when user reaches this section (section pins to top)
  useEffect(() => {
    const checkReach = () => {
      if (hasTriggeredIntro.current || !track.current) return;
      const rect = track.current.getBoundingClientRect();

      // Only trigger when the top of the track reaches near the top of the viewport
      if (rect.top <= 80) {
        hasTriggeredIntro.current = true;
        window.removeEventListener("scroll", checkReach);

        if (reduceMotion()) {
          setPhase(3);
          setPillWipe(true);
          setBodyLive(true);
          setHasEntered(true);
          setIsSliding(true);
          return;
        }

        // Unrushed, readable entrance sequence:
        setTimeout(() => setPhase(1), 150);   // "How I approach design"
        setTimeout(() => setPhase(2), 850);   // "Good design isn't about attractive visuals."
        setTimeout(() => setPhase(3), 1650);  // "Its about"
        setTimeout(() => setPillWipe(true), 2200); // Pill swipes in just like the text above!
        setTimeout(() => setBodyLive(true), 2450); // Body text rises up
        setTimeout(() => {
          setHasEntered(true);               // Entrance done; subsequent scrolls do up/down text roll
          setIsSliding(true);
        }, 2850);
      }
    };

    window.addEventListener("scroll", checkReach, { passive: true });
    checkReach();
    return () => window.removeEventListener("scroll", checkReach);
  }, []);

  // Wheel listener: triggers the up/down animation each time user scrolls a bit
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!hasEntered || !track.current) return;

      const rect = track.current.getBoundingClientRect();
      const isPinned = rect.top <= 20 && rect.bottom >= window.innerHeight - 20;

      if (!isPinned) return;

      const now = Date.now();
      const curr = currentStepRef.current;

      // Scroll Down (advancing steps)
      if (e.deltaY > 15) {
        if (curr < steps.length - 1) {
          e.preventDefault();
          if (now - lastStepTime.current >= COOLDOWN_MS) {
            lastStepTime.current = now;
            advanceToStep(curr + 1);
          }
        }
        // If at last step, allow natural scroll down into footer
      }
      // Scroll Up (going back)
      else if (e.deltaY < -15) {
        if (curr > 0) {
          e.preventDefault();
          if (now - lastStepTime.current >= COOLDOWN_MS) {
            lastStepTime.current = now;
            advanceToStep(curr - 1);
          }
        }
        // If at first step, allow natural scroll up into Case Studies
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [hasEntered]);

  // Touch listener for mobile devices
  useEffect(() => {
    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!hasEntered || !track.current) return;
      const rect = track.current.getBoundingClientRect();
      const isPinned = rect.top <= 20 && rect.bottom >= window.innerHeight - 20;
      if (!isPinned) return;

      const deltaY = touchStartY - e.touches[0].clientY;
      const now = Date.now();
      const curr = currentStepRef.current;

      if (deltaY > 30) {
        if (curr < steps.length - 1) {
          e.preventDefault();
          if (now - lastStepTime.current >= COOLDOWN_MS) {
            lastStepTime.current = now;
            touchStartY = e.touches[0].clientY;
            advanceToStep(curr + 1);
          }
        }
      } else if (deltaY < -30) {
        if (curr > 0) {
          e.preventDefault();
          if (now - lastStepTime.current >= COOLDOWN_MS) {
            lastStepTime.current = now;
            touchStartY = e.touches[0].clientY;
            advanceToStep(curr - 1);
          }
        }
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [hasEntered]);

  const step = steps[currentStep];

  return (
    <section className="bg-white">
      <h2 className="sr-only">How I approach design</h2>
      <ol className="sr-only">
        {steps.map((s) => (
          <li key={s.pill}>
            <strong>{s.pill}</strong>. {s.body.join(" ")}
          </li>
        ))}
      </ol>

      <div
        ref={track}
        className="relative"
        style={{ height: "300svh" }}
        aria-hidden
      >
        <div
          ref={stage}
          className="sticky top-0 flex h-svh min-h-[34rem] items-center overflow-hidden"
          style={{ "--wipe-dur": "0.6s" } as CSSProperties}
        >
          {/* items-start so header top-aligns with right column's first line */}
          <Section flush className="grid items-start gap-10 md:grid-cols-[856fr_824fr] md:gap-[4.167vw]">
            <p
              className={`font-serif text-display font-bold italic tracking-[-0.0069em] transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                phase >= 1 ? "" : "translate-y-[clamp(1.5rem,3.65vw,4.375rem)] opacity-0"
              }`}
            >
              How I approach design
            </p>

            <div className="text-subhead tracking-[-0.025em]">
              <p className="wipe [--wipe-dur:0.7s]" data-on={phase >= 2}>
                Good design isn't about attractive visuals.
              </p>
              <div className="-mt-[0.078em] flex flex-wrap items-center gap-x-[0.3125em]">
                {/* "Its about" wipes in (phase >= 3) */}
                <p className="wipe [--wipe-dur:0.5s]" data-on={phase >= 3}>
                  Its about
                </p>

                {/* First time: swipe animation just like the text on top of it.
                    After that: vertical up/down text roll inside the black frame */}
                {!hasEntered ? (
                  <mark
                    data-on={pillWipe}
                    className="wipe [--wipe-dur:0.6s] rounded-[4px] bg-black px-[0.35em] py-[0.06em] font-serif font-bold italic text-white"
                  >
                    {steps[0].pill}
                  </mark>
                ) : (
                  <span
                    className="relative inline-flex items-center overflow-hidden rounded-[4px] bg-black px-[0.35em] py-[0.06em] font-serif font-bold italic text-white transition-[width] duration-300 ease-out"
                    style={{
                      height: "1.45em",
                      lineHeight: "1.2",
                    }}
                  >
                    {/* Invisible sizer that sets the exact width of the black frame */}
                    <span className="invisible pointer-events-none select-none whitespace-nowrap" aria-hidden="true">
                      {step.pill}
                    </span>

                    {/* Outgoing text: slides up (forward) or down (backward) out of the frame */}
                    {outgoingStep !== null && (
                      <span
                        key={`out-${outgoingStep}`}
                        className="absolute inset-0 flex items-center justify-center whitespace-nowrap transition-all duration-300 ease-out"
                        style={{
                          transform: isSliding
                            ? direction === "forward"
                              ? "translateY(-120%)"
                              : "translateY(120%)"
                            : "translateY(0%)",
                          opacity: isSliding ? 0 : 1,
                        }}
                      >
                        {steps[outgoingStep].pill}
                      </span>
                    )}

                    {/* Incoming / Current text: enters from below (forward) or above (backward) into the frame */}
                    <span
                      key={`in-${currentStep}`}
                      className="absolute inset-0 flex items-center justify-center whitespace-nowrap transition-all duration-300 ease-out"
                      style={{
                        transform: isSliding
                          ? "translateY(0%)"
                          : direction === "forward"
                          ? "translateY(120%)"
                          : "translateY(-120%)",
                        opacity: isSliding ? 1 : 0,
                      }}
                    >
                      {step.pill}
                    </span>
                  </span>
                )}
              </div>

              {/* Body text rises from bottom */}
              <div
                data-on={bodyLive}
                className="approach-body mt-[clamp(2rem,4.3vw,5.15rem)] grid max-w-[555px] text-body tracking-[-0.0167em]"
              >
                {steps.map((s, i) => (
                  <div
                    key={s.pill}
                    className={`col-start-1 row-start-1 transition-all duration-300 ease-out ${
                      i === currentStep
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-3 pointer-events-none"
                    }`}
                  >
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

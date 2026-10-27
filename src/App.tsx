import { useEffect, useState } from "react";
import Lenis from "lenis";
import Approach from "./Approach";
import CaseStudy from "./CaseStudy";
import CaseStudyEmployment from "./CaseStudyEmployment";
import CaseStudyEnvironment from "./CaseStudyEnvironment";
import Contact from "./Contact";
import { go, PLANERA, EMPLOYMENT, ENVIRONMENT, usePath } from "./router";
import { A, Display, Reveal, Section } from "./ui";

function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallaxY = Math.min(scrollY * 0.35, 300);

  return (
    <section className="relative flex flex-col justify-between overflow-hidden bg-white h-svh min-h-[36rem] md:block md:h-svh">
      <div
        className="pointer-events-none relative z-0 mx-auto max-h-[42vh] w-full max-w-[92vw] order-2 md:order-none md:absolute md:right-0 md:bottom-0 md:max-h-[82vh] md:w-[55vw] md:max-w-[1100px] will-change-transform"
        style={{ transform: `translate3d(0, ${parallaxY}px, 0)` }}
      >
        <video
          src={`${A}Kitten jumping.mp4`}
          width={1673}
          height={940}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="hero-zoom size-full object-contain object-bottom md:object-bottom-right"
        />
      </div>
      <div className="relative z-10 px-(--pad-x) pt-8 md:absolute md:top-[43%] md:left-(--pad-x) md:w-[42.4vw] md:max-w-[42.4vw] md:-translate-y-1/2 md:p-0">
        <h1 className="hero-title text-display font-extralight tracking-[-0.0347em]">
          Making complex products<br />feel{" "}
          <em className="font-serif font-bold tracking-[-0.0069em]">Simple</em>
        </h1>
      </div>
      <div className="relative z-10 px-(--pad-x) pb-6 md:absolute md:bottom-[clamp(2.5rem,6.5vh,5.5rem)] md:left-(--pad-x) md:w-[32.6vw] md:max-w-[32.6vw] md:p-0">
        <p className="hero-body text-body tracking-[-0.0167em] text-black">
          {"Hi 👋  I'm Deepak."}<br />{"A product designer with 6 years of experience turning complex workflows into clear, usable digital experiences. I have designed digital products across B2B SaaS, B2C websites and mobile applications."}
        </p>
      </div>
    </section>
  );
}

function CaseCard({
  title,
  tag,
  imageSrc,
  imageAlt,
  imagePosition = "object-center",
  href,
}: {
  title: string;
  tag: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
  href?: string;
}) {
  const content = (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-black">
      <img
        src={imageSrc}
        alt={imageAlt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08] motion-reduce:transition-none ${imagePosition}`}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/70 via-35% to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1.5 p-6 md:p-8">
        <h3 className="font-sans text-[clamp(1.125rem,1.35vw,1.4rem)] font-semibold leading-snug tracking-[-0.02em] text-white">
          {title}
        </h3>
        <p className="font-sans text-[clamp(0.8125rem,0.9vw,0.9375rem)] tracking-[-0.01em] text-white/80">
          {tag}
        </p>
      </div>
    </div>
  );

  return (
    <article className="group">
      {href ? (
        <a href={href} onClick={go} className="block cursor-pointer">
          {content}
        </a>
      ) : (
        <div className="block cursor-default">
          {content}
        </div>
      )}
    </article>
  );
}

function CaseStudies() {
  return (
    <section className="bg-surface">
      <Section className="flex flex-col gap-[clamp(2.5rem,4.167vw,5rem)]">
        <Reveal>
          <Display>Case studies</Display>
        </Reveal>
        <div className="grid gap-[clamp(1.5rem,4.167vw,5rem)] md:grid-cols-3">
          <Reveal>
            <CaseCard
              href={PLANERA}
              title="Making complex construction schedules easier to build and manage"
              tag="B2B SaaS • Construction Domain"
              imageSrc={`${A}case-construction.png`}
              imageAlt="Construction site with workers, scaffolding and steel reinforcement"
              imagePosition="object-[50%_72%]"
            />
          </Reveal>
          <Reveal>
            <CaseCard
              href={EMPLOYMENT}
              title="Bridging the gap between employers and blue-collar workers"
              tag="B2C Mobile App • Talent Marketplace"
              imageSrc={`${A}case-hiring.png`}
              imageAlt="Two professionals shaking hands across a table"
              imagePosition="object-[55%_50%]"
            />
          </Reveal>
          <Reveal>
            <CaseCard
              href={ENVIRONMENT}
              title="Redesigning a complex Environmental monitoring platform"
              tag="B2B SaaS • Environmental Technology"
              imageSrc={`${A}case-environment.jpg`}
              imageAlt="Industrial smokestacks emitting smoke into twilight sky"
              imagePosition="object-[50%_25%]"
            />
          </Reveal>
        </div>
      </Section>
    </section>
  );
}

function Home() {
  return (
    <main>
      <Hero />
      <CaseStudies />
      <Approach />
      <Contact />
    </main>
  );
}

export default function App() {
  const path = usePath();
  const isPlanera = path === PLANERA;
  const isEmployment = path === EMPLOYMENT;
  const isEnvironment = path === ENVIRONMENT;

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });
    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (isPlanera) {
      document.title = "Planera case study • Deepak Sharma";
    } else if (isEmployment) {
      document.title = "Employment platform case study • Deepak Sharma";
    } else if (isEnvironment) {
      document.title = "Environmental monitoring case study • Deepak Sharma";
    } else {
      document.title = "Deepak Sharma • Product Designer";
    }
  }, [isPlanera, isEmployment, isEnvironment]);

  if (isPlanera) return <CaseStudy />;
  if (isEmployment) return <CaseStudyEmployment />;
  if (isEnvironment) return <CaseStudyEnvironment />;
  return <Home />;
}
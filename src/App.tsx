import { useEffect, type ReactNode } from "react";
import Approach from "./Approach";
import CaseStudy from "./CaseStudy";
import Contact from "./Contact";
import { go, PLANERA, usePath } from "./router";
import { A, ComingSoon, Display, Section } from "./ui";

const gap = "gap-[clamp(1rem,1.667vw,2rem)]";
const zoom = "transition-transform duration-500 ease-out group-hover:scale-[1.15] motion-reduce:transition-none";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface md:aspect-video">
      <img
        src={`${A}hero-bg.png`} alt="" width={1920} height={1081} fetchPriority="high"
        className="hero-zoom h-[70vw] w-full object-cover object-right md:absolute md:inset-0 md:h-full"
      />
      <div className="flex flex-col gap-[clamp(1.5rem,2.5vw,3rem)] px-(--pad-x) py-12 md:absolute md:top-[calc(50%+60.5px)] md:left-(--pad-x) md:w-[42.4vw] md:-translate-y-1/2 md:p-0">
        <h1 className="hero-title text-display font-extralight tracking-[-0.0347em]">
          Making<br />complex products<br />feel{" "}
          <em className="font-serif font-bold tracking-[-0.0069em]">Simple</em>
        </h1>
        <p className="hero-body text-body tracking-[-0.0167em] md:max-w-[max(33.2vw,20rem)]">
          {"Hi 👋  I'm Deepak. A product designer with 6 years of experience turning complex workflows into clear, usable digital experiences. I have designed digital products across B2B SaaS, B2C websites and mobile applications"}
        </p>
      </div>
    </section>
  );
}

function Card({ title, tag, children, className = "", href, soon }: { title: string; tag: string; children: ReactNode; className?: string; href?: string; soon?: boolean }) {
  const body = (
    <>
      {children}
      <div className="flex flex-col gap-2">
        <h3 className="text-title font-semibold tracking-[-0.025em]">{title}</h3>
        <p className="text-body tracking-[-0.0167em]">
          {tag}
          {soon && <span className="sr-only"> (coming soon)</span>}
        </p>
      </div>
    </>
  );
  const cls = `flex flex-col ${gap}`;
  return (
    <article className={`group ${className}`}>
      {href ? <a href={href} onClick={go} className={cls}>{body}</a> : <div className={cls}>{body}</div>}
    </article>
  );
}

function CaseStudies() {
  return (
    <section className="bg-surface">
      <Section className="flex flex-col gap-[clamp(2.5rem,4.167vw,5rem)]">
        <Display>Case studies</Display>
        <div className="grid gap-[clamp(2.5rem,4.167vw,5rem)] md:grid-cols-2">
          <Card
            className="md:col-span-2"
            href={PLANERA}
            title="Making complex construction schedules easier to build and manage"
            tag="B2B SaaS · Construction Domain"
          >
            <div className="overflow-hidden">
              <img
                src={`${A}case-construction.png`} alt="Construction site with workers, scaffolding and steel reinforcement"
                width={1760} height={640} loading="lazy" decoding="async"
                className={`aspect-[16/10] w-full object-cover object-[50%_76.2%] md:aspect-[2.75] ${zoom}`}
              />
            </div>
          </Card>
          <Card soon title="Bridging the gap between employers and blue-collar workers" tag="B2C Mobile App · Talent Marketplace">
            <div className="relative aspect-[21/16] overflow-hidden">
              <div className={`absolute inset-0 ${zoom}`}>
                <img
                  src={`${A}case-hiring.png`} alt="Two professionals shaking hands across a table"
                  loading="lazy" decoding="async"
                  className="absolute top-[-55.47%] left-[-33.33%] h-[164.84%] w-[188.39%] max-w-none"
                />
              </div>
              <ComingSoon />
            </div>
          </Card>
          <Card soon title="Transforming real-time environmental data into actionable insights" tag="B2B SaaS · Environmental Technology">
            <div className="relative overflow-hidden">
              <img
                src={`${A}case-environment.png`} alt="Industrial plant releasing smoke over fields at sunset"
                width={840} height={640} loading="lazy" decoding="async"
                className={`aspect-[21/16] w-full object-cover ${zoom}`}
              />
              <ComingSoon />
            </div>
          </Card>
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
  const isCase = path === PLANERA;
  useEffect(() => {
    document.title = isCase ? "Planera case study · Deepak Sharma" : "Deepak Sharma · Product Designer";
  }, [isCase]);
  return isCase ? <CaseStudy /> : <Home />;
}

import { Fragment, type ReactNode } from "react";
import Contact from "./Contact";
import { go, HOME, PLANERA } from "./router";
import { A, Reveal } from "./ui";

const h2 = "font-serif text-h2 font-bold tracking-[-0.03125em]";
const h3 = "text-body font-semibold tracking-[-0.0167em] text-black";
const copy = "text-copy text-ink-soft";
const g56 = "gap-[clamp(2rem,2.9vw,3.5rem)]";
const g80 = "gap-[clamp(2.5rem,4.167vw,5rem)]";
const g120 = "gap-[clamp(3rem,6.25vw,7.5rem)]";
const colGap = "lg:gap-[6.8%]"; // 120px of the 1760px content width

function Band({ bg, className = "", children }: { bg: string; className?: string; children: ReactNode }) {
  return (
    <section className={bg}>
      <div className={`mx-auto flex w-full max-w-[1920px] flex-col px-(--pad-x) py-(--pad-y) ${className}`}>{children}</div>
    </section>
  );
}

const H2 = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <Reveal>
    <h2 className={`${h2} ${className}`}>{children}</h2>
  </Reveal>
);

/** Section title on the left, content on the right (two equal halves from lg). */
function Split({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-4">
      <div className="lg:flex-1">
        <H2>{title}</H2>
      </div>
      <div className={`flex flex-col lg:flex-1 ${g56}`}>{children}</div>
    </div>
  );
}

function Block({ title, tight, children }: { title?: string; tight?: boolean; children: ReactNode }) {
  return (
    <Reveal className={`flex flex-col ${tight ? "gap-2" : "gap-4"}`}>
      {title && <h3 className={h3}>{title}</h3>}
      <div className={copy}>{children}</div>
    </Reveal>
  );
}

/** Web app screenshot card with subtle border and elevation */
function ScreenShot({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-line bg-surface p-2 md:p-3">
      <img
        src={`${A}${src}`}
        alt={alt}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
        className="w-full object-contain"
      />
    </div>
  );
}

const meta: [string, ReactNode][] = [
  ["MY ROLE", "Product Designer"],
  ["TEAM", "Sole Designer"],
  ["RESPONSIBILITIES", <>Requirements Gathering, Information Architecture,<br />UI/UX Design, Design handoff</>],
  ["PROJECT DURATION", "3 months"],
];
const tags = ["Environmental Monitoring", "B2B SaaS"];

export default function CaseStudyEnvironment() {
  return (
    <>
      <main className="[--pad-y:clamp(4.5rem,7.8125vw,9.375rem)]">
        {/* Header section */}
        <Band bg="bg-white" className="gap-6">
          <Reveal>
            <a
              href={HOME}
              onClick={go}
              className="group inline-flex items-center gap-2 text-body font-medium text-ink-soft transition-colors hover:text-black mb-2"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-1" aria-hidden>←</span>
              <span>Back to all work</span>
            </a>
          </Reveal>
          <Reveal className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-[6.8%]">
            <div className="flex flex-col gap-[clamp(1.5rem,2.5vw,3rem)] lg:w-[66.6%]">
              <h1 className="font-serif text-display font-bold italic tracking-[-0.0069em]">
                Redesigning a Complex Environmental Monitoring Platform into a Clear, Connected Experience
              </h1>
              <p className="text-body tracking-[-0.0167em]">
                Bringing industrial site status, environmental data, and reporting workflows into a more structured interface, making a complex monitoring platform easier to navigate and understand.
              </p>
            </div>
            <dl className="flex flex-col gap-6">
              {meta.map(([k, v]) => (
                <div key={k} className="flex flex-col gap-2">
                  <dt className="text-micro font-bold">{k}</dt>
                  <dd className="text-meta">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal className="flex flex-wrap gap-2 text-meta font-bold">
            {tags.map((t, i) => (
              <Fragment key={t}>
                {i > 0 && <span aria-hidden>·</span>}
                <span>{t}</span>
              </Fragment>
            ))}
          </Reveal>
        </Band>

        {/* Hero image */}
        <Reveal>
          <img
            src={`${A}case-environment.jpg`}
            alt="Industrial plant releasing smoke over fields at sunset"
            width={1920}
            height={704}
            decoding="async"
            className="aspect-[16/10] w-full object-cover object-[50%_40%] md:aspect-[1920/704]"
          />
        </Reveal>

        {/* Context and problem */}
        <Band bg="bg-mist">
          <Split title="Context and problem">
            <Block title="The Product">
              <p>
                The product is an environmental monitoring platform that helps teams monitor industrial sites, track environmental data from connected monitoring stations, and generate reports for analysis and compliance.
              </p>
              <p className="mt-[1.667em]">
                The existing software, built by a freelance developer, provided these capabilities but was difficult to navigate and lacked a clear, consistent interface. The goal was to redesign the experience from the ground up, making complex data easier to access and manage.
              </p>
            </Block>
            <Block title="The Challenge">
              <p>
                Environmental monitoring involves data from multiple machines, stations, parameters, and industrial sites. The challenge was to organise these interconnected data points into an interface where users could understand site status, explore readings, and access reports without navigating a confusing system.
              </p>
            </Block>
          </Split>
        </Band>

        {/* Understanding the requirements */}
        <Band bg="bg-white">
          <Split title="Understanding the requirements">
            <Block title="From the client's brief to a clear user journey">
              <p>
                I worked onsite for three months, starting by exploring the existing software and gathering requirements directly from the CEO. I documented the current workflows, asked clarifying questions, and developed an understanding of how monitoring data moved through the system before making design decisions.
              </p>
            </Block>
          </Split>
        </Band>

        {/* Design Approach */}
        <Band bg="bg-mist">
          <Split title="Design Approach">
            <Block>
              <p>
                I focused on structuring the platform around connected workflows rather than treating each screen as a standalone redesign. This meant creating a clear path from an overview of site health to industry-level information, site configuration, and reporting.
              </p>
              <p className="mt-[1.667em]">
                The design aimed to make information easier to scan, improve navigation across different areas, and give monitoring and environmental teams a more coherent way to work with the data.
              </p>
            </Block>
          </Split>
        </Band>

        {/* Key screens & flows */}
        <Band bg="bg-white" className={g120}>
          <H2>Key screens & flows</H2>

          {/* Screen 1: Admin Login */}
          <Reveal className={`flex flex-col gap-8 lg:items-center ${colGap} lg:flex-row`}>
            <div className="min-w-0 lg:flex-1">
              <Block title="Admin Login">
                <p>
                  A dedicated entry point for administrators to access the monitoring platform. The screen provides a straightforward login experience before users move into the monitoring dashboard.
                </p>
              </Block>
            </div>
            <div className="lg:shrink-0 lg:basis-[50%]">
              <ScreenShot src="cs-enviro-admin-login.png" alt="Admin Login screen" width={880} height={550} />
            </div>
          </Reveal>

          {/* Screen 2: Dashboard */}
          <Reveal className={`flex flex-col gap-8 lg:items-center ${colGap} lg:flex-row-reverse`}>
            <div className="min-w-0 lg:flex-1">
              <Block title="Dashboard">
                <p>
                  A consolidated overview of monitoring activity across sites and stations. Summary cards and status charts help users identify live, delayed, offline, maintenance, migrated, and shutdown sites.
                </p>
              </Block>
            </div>
            <div className="lg:shrink-0 lg:basis-[50%]">
              <ScreenShot src="cs-enviro-dashboard.png" alt="Consolidated monitoring activity dashboard" width={871} height={550} />
            </div>
          </Reveal>

          {/* Screen 3: New Site Setup */}
          <Reveal className={`flex flex-col gap-8 lg:items-center ${colGap} lg:flex-row`}>
            <div className="min-w-0 lg:flex-1">
              <Block title="New Site Setup">
                <p>
                  A guided setup flow for registering and configuring an industrial site. It brings together industry information, data logger details, station configuration, environmental parameters, and regulatory reporting setup.
                </p>
              </Block>
            </div>
            <div className="lg:shrink-0 lg:basis-[50%]">
              <ScreenShot src="cs-enviro-site-setup.png" alt="Guided site setup and configuration interface" width={871} height={717} />
            </div>
          </Reveal>

          {/* Screen 4: Geographical View */}
          <Reveal className={`flex flex-col gap-8 lg:items-center ${colGap} lg:flex-row-reverse`}>
            <div className="min-w-0 lg:flex-1">
              <Block title="Geographical View">
                <p>
                  A map-based view of registered industry locations, supported by filters. It gives users a geographical perspective of monitoring sites alongside the platform’s dashboard and data views.
                </p>
              </Block>
            </div>
            <div className="lg:shrink-0 lg:basis-[50%]">
              <ScreenShot src="cs-enviro-geographical.png" alt="Map-based geographical view of industry locations" width={880} height={581} />
            </div>
          </Reveal>

          {/* Screen 5: Reports */}
          <Reveal className={`flex flex-col gap-8 lg:items-center ${colGap} lg:flex-row`}>
            <div className="min-w-0 lg:flex-1">
              <Block title="Reports">
                <p>
                  A configurable reporting workflow where users select an industry, monitoring type, station, parameters, and date range. Generated reports include data trends and options to export the results.
                </p>
              </Block>
            </div>
            <div className="lg:shrink-0 lg:basis-[50%]">
              <ScreenShot src="cs-enviro-reports.png" alt="Configurable reporting workflow with data trends" width={880} height={572} />
            </div>
          </Reveal>
        </Band>

        {/* Review, Outcome & Reflection */}
        <Band bg="bg-mist" className={g80}>
          <Split title="Collaboration & Validation">
            <Block>
              <p>
                As the sole designer, I worked directly with the CEO to understand requirements and collaborated with the engineering team throughout the project. I used the existing software, workflow discussions, and informal reviews to guide and refine the designs.
              </p>
            </Block>
          </Split>

          <Split title="Outcome & Handover">
            <Block>
              <p>
                I completed the end-to-end design flows and handed the work over to another designer when I left the company. Development was still underway at that point, and I’m unaware of the product’s eventual launch or impact.
              </p>
            </Block>
          </Split>

          <Split title="Reflection">
            <Block>
              <p>
                This project reinforced the importance of understanding a complex domain before designing its interface. Mapping the relationships between sites, stations, parameters, and reports helped me approach the redesign as a connected system rather than a collection of individual screens.
              </p>
            </Block>
          </Split>
        </Band>

        {/* Next Case Study (links back to Planera!) */}
        <Band bg="bg-white">
          <Reveal className={`flex flex-col gap-10 lg:flex-row lg:items-center ${colGap}`}>
            <div className="flex flex-col gap-4 lg:flex-1">
              <p className="text-title tracking-[-0.025em] text-ink-soft">Next case study</p>
              <a href={PLANERA} onClick={go} className="group">
                <p className="font-serif text-display font-bold italic tracking-[-0.0069em] transition-colors group-hover:text-black/70">
                  Making complex construction schedules easier to build and manage
                </p>
              </a>
            </div>
            <a
              href={PLANERA}
              onClick={go}
              className="group overflow-hidden rounded-[6px] lg:shrink-0 lg:basis-[46.59%]"
            >
              <div className="relative aspect-[820/600] overflow-hidden">
                <img
                  src={`${A}case-construction.png`}
                  alt="Construction site with workers, scaffolding and steel reinforcement"
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover object-[50%_76.2%]"
                />
              </div>
            </a>
          </Reveal>
        </Band>
      </main>
      <Contact />
    </>
  );
}

import { Fragment, type ReactNode } from "react";
import Contact from "./Contact";
import { ENVIRONMENT, go, HOME } from "./router";
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
function Split({ title, children, dark = false }: { title: string; children: ReactNode; dark?: boolean }) {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-4">
      <div className="lg:flex-1">
        <H2 className={dark ? "text-white" : ""}>{title}</H2>
      </div>
      <div className={`flex flex-col lg:flex-1 ${g56}`}>{children}</div>
    </div>
  );
}

function Block({ title, tight, children, dark = false }: { title: string; tight?: boolean; children: ReactNode; dark?: boolean }) {
  return (
    <Reveal className={`flex flex-col ${tight ? "gap-2" : "gap-4"}`}>
      <h3 className={dark ? "text-body font-semibold tracking-[-0.0167em] text-white" : h3}>{title}</h3>
      <div className={dark ? "text-copy text-[#d5d8df]" : copy}>{children}</div>
    </Reveal>
  );
}

/** Phone mockup frame with subtle hover elevation */
function PhoneShot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex justify-center py-4 lg:py-0">
      <div className="relative w-full max-w-[340px] md:max-w-[400px]">
        <img
          src={`${A}${src}`}
          alt={alt}
          loading="lazy"
          decoding="async"
          width={416}
          height={800}
          className="h-auto w-full drop-shadow-xl"
        />
      </div>
    </div>
  );
}

const meta = [
  ["MY ROLE", "Freelance Product Designer"],
  ["TEAM", "Sole Designer"],
  ["RESPONSIBILITIES", "Requirement gathering, User flows, Wireframes, High fidelity designs"],
  ["PROJECT DURATION", "3 weeks"],
];
const tags = ["Talent Marketplace", "B2C Mobile App"];

const swatches = [
  { hex: "#0077AF", label: "#0077AF", border: false },
  { hex: "#263228", label: "#263228", border: true },
  { hex: "#DADADA", label: "#DADADA", border: false },
  { hex: "#FFFFFF", label: "#FFFFFF", border: false },
];

export default function CaseStudyEmployment() {
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
                Bridging the gap between employers and blue-collar workers
              </h1>
              <p className="text-body tracking-[-0.0167em]">
                One app to find contract jobs and manage the entire employment journey.
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
            src={`${A}case-hiring.png`}
            alt="Two professionals shaking hands across a table"
            width={1920}
            height={704}
            decoding="async"
            className="aspect-[16/10] w-full object-cover object-center md:aspect-[1920/704]"
          />
        </Reveal>

        {/* Context and problem */}
        <Band bg="bg-mist">
          <Split title="Context and problem">
            <Block title="Managing multiple jobs shouldn't mean managing multiple systems">
              <p>
                Contract workers living abroad often juggle multiple jobs, shifts, and employers. Finding verified jobs and managing contracts, payslips, attendance, and leave adds to the complexity.
              </p>
              <p className="mt-[1.667em]">
                The client wanted to bring the entire employment journey into one app, from finding work to managing ongoing contracts.
              </p>
            </Block>
            <Block title="Users">
              <p>
                The app was designed for contract-based job seekers living in the US and other countries on work visas, particularly those working multiple jobs to support themselves and their families.
              </p>
            </Block>
            <Block title="The design challenge">
              <p>
                <b className="text-black">How might we</b> simplify job discovery and employment management for contract workers?
              </p>
              <p className="mt-[1.667em]">
                The goal was to bring job applications, shift tracking, employment documents, and contract signing into one accessible experience.
              </p>
            </Block>
          </Split>
        </Band>

        {/* Understanding the requirements */}
        <Band bg="bg-white">
          <Split title="Understanding the requirements">
            <Block title="From the client's brief to a clear user journey">
              <p>
                In the first meeting, the client shared the requirements. I asked follow-up questions to clarify expectations and understand how the different features should work together.
              </p>
              <p className="mt-[1.667em]">
                I mapped the core user flows and shared them asynchronously. After the client approved the direction, I moved on to wireframes and high-fidelity designs.
              </p>
            </Block>
          </Split>
        </Band>

        {/* Style guide (Dark Theme Band matching Figma) */}
        <section className="bg-[#263238] text-white">
          <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-[clamp(3rem,6vw,7rem)] px-(--pad-x) py-(--pad-y)">
            <Split title="Style guide" dark>
              <Block title="Keeping the interface clean and approachable" dark>
                <p>
                  The client wanted a simple, clean interface. I used Poppins typography and a restrained colour palette to create a consistent visual language.
                </p>
              </Block>
            </Split>

            <Reveal className="grid gap-12 lg:grid-cols-2 lg:gap-x-[6.8%]">
              {/* Colors subsection */}
              <div className="flex flex-col gap-6">
                <h3 className="font-serif text-h2 font-bold tracking-[-0.03125em] text-white">Colors</h3>
                <div className="flex flex-col gap-8">
                  {/* Overlapping swatches */}
                  <div className="flex items-center -space-x-8 md:-space-x-12 overflow-x-auto py-4">
                    {swatches.map((s, idx) => (
                      <div
                        key={s.hex}
                        className="relative flex flex-col items-center group"
                        style={{ zIndex: 10 - idx }}
                      >
                        <div
                          className={`size-24 rounded-full shadow-2xl transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-105 md:size-32 ${
                            s.border ? "border-2 border-white/30" : ""
                          }`}
                          style={{ backgroundColor: s.hex }}
                        />
                      </div>
                    ))}
                  </div>
                  {/* Hex labels */}
                  <div className="grid grid-cols-4 gap-2 text-center font-['Poppins'] text-small font-medium text-white/80 md:text-body">
                    {swatches.map((s) => (
                      <span key={s.hex}>{s.label}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Typography subsection */}
              <div className="flex flex-col gap-6">
                <h3 className="font-serif text-h2 font-bold tracking-[-0.03125em] text-white">Typography</h3>
                <div className="flex flex-col gap-4 font-['Poppins']">
                  <p className="text-[clamp(1.5rem,2.2vw,2.5rem)] font-normal text-white">Poppins</p>
                  <div className="flex flex-col gap-2 text-[clamp(1rem,1.25vw,1.5rem)] tracking-wider text-white/90">
                    <p className="uppercase">A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</p>
                    <p className="lowercase">a b c d e f g h i j k l m n o p q r s t u v w x y z</p>
                    <p>0 1 2 3 4 5 6 7 8 9</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Designing the experience */}
        <Band bg="bg-white" className={g120}>
          <H2>Designing the experience</H2>

          {/* User Flow diagram */}
          <Reveal className={`flex flex-col gap-8 lg:items-center ${colGap} lg:flex-row`}>
            <div className="min-w-0 lg:flex-1">
              <Block title="Organising the app around key user needs">
                <p>
                  I mapped the app's information architecture to organise its core features into a clear, intuitive structure. This established the foundation for the main screens, from onboarding and job discovery to shift management and digital contract signing.
                </p>
              </Block>
            </div>
            <div className="overflow-hidden rounded-[8px] border border-line bg-surface p-4 lg:shrink-0 lg:basis-[52%]">
              <img
                src={`${A}cs-hiring-user-flow.png`}
                alt="Information architecture and core user flow diagram"
                loading="lazy"
                decoding="async"
                width={880}
                height={1377}
                className="w-full object-contain"
              />
            </div>
          </Reveal>

          {/* Wireframes */}
          <Reveal className={`flex flex-col gap-8 lg:items-center ${colGap} lg:flex-row-reverse`}>
            <div className="min-w-0 lg:flex-1">
              <Block title="Wireframes">
                <p>Created rough wireframes to explore few directions internally</p>
              </Block>
            </div>
            <div className="overflow-hidden rounded-[8px] border border-line bg-surface p-2 lg:shrink-0 lg:basis-[50%]">
              <img
                src={`${A}cs-hiring-wireframes.png`}
                alt="Wireframes for Home Screen, Job Portal, and Contract Sign"
                loading="lazy"
                decoding="async"
                width={860}
                height={472}
                className="w-full object-contain"
              />
            </div>
          </Reveal>

          {/* Key Screen 1: Onboarding */}
          <Reveal className={`flex flex-col gap-8 lg:items-center ${colGap} lg:flex-row`}>
            <div className="min-w-0 lg:flex-1">
              <Block title="Onboarding">
                <p>
                  Introduces users to the app's key features, highlighting how they can discover jobs and manage their employment in one place.
                </p>
              </Block>
            </div>
            <div className="lg:shrink-0 lg:basis-[48%]">
              <PhoneShot src="cs-hiring-onboarding.png" alt="Onboarding screen on iPhone mockup" />
            </div>
          </Reveal>

          {/* Key Screen 2: Sign up / Login */}
          <Reveal className={`flex flex-col gap-8 lg:items-center ${colGap} lg:flex-row-reverse`}>
            <div className="min-w-0 lg:flex-1">
              <Block title="Sign up / Login">
                <p>
                  Allows new users to create an account and existing users to log in and access their employment information
                </p>
              </Block>
            </div>
            <div className="lg:shrink-0 lg:basis-[48%]">
              <PhoneShot src="cs-hiring-login.png" alt="Sign up and login screen on iPhone mockup" />
            </div>
          </Reveal>

          {/* Key Screen 3: Home and Shift Management */}
          <Reveal className={`flex flex-col gap-8 lg:items-center ${colGap} lg:flex-row`}>
            <div className="min-w-0 lg:flex-1">
              <Block title="Home and Shift Management">
                <p>
                  Provides an overview of the day's shifts, with job cards displaying the user's position, company, and income earned through each job.
                </p>
              </Block>
            </div>
            <div className="lg:shrink-0 lg:basis-[48%]">
              <PhoneShot src="cs-hiring-home-shift.png" alt="Home and shift management screen on iPhone mockup" />
            </div>
          </Reveal>

          {/* Key Screen 4: Job discovery */}
          <Reveal className={`flex flex-col gap-8 lg:items-center ${colGap} lg:flex-row-reverse`}>
            <div className="min-w-0 lg:flex-1">
              <Block title="Job discovery">
                <p>
                  Enables users to browse available contract-based job opportunities and apply for positions that match their needs.
                </p>
              </Block>
            </div>
            <div className="lg:shrink-0 lg:basis-[48%]">
              <PhoneShot src="cs-hiring-job-discovery.png" alt="Job discovery screen on iPhone mockup" />
            </div>
          </Reveal>

          {/* Key Screen 5: Digital contract signing */}
          <Reveal className={`flex flex-col gap-8 lg:items-center ${colGap} lg:flex-row`}>
            <div className="min-w-0 lg:flex-1">
              <Block title="Digital contract signing">
                <p>
                  Allows users to receive employment contracts digitally and sign directly on the screen using their finger, eliminating the need for physical paperwork.
                </p>
              </Block>
            </div>
            <div className="lg:shrink-0 lg:basis-[48%]">
              <PhoneShot src="cs-hiring-contract-signing.png" alt="Digital contract signing screen on iPhone mockup" />
            </div>
          </Reveal>
        </Band>

        {/* Review, Outcome & Reflection */}
        <Band bg="bg-mist" className={g80}>
          <Split title="Design review and sign-off">
            <Block title="From mapped flows to approved designs">
              <p>
                In the second meeting, I presented the high-fidelity designs for the core flows. The client responded positively and signed off on the designs during the meeting.
              </p>
              <p className="mt-[1.667em]">
                Following approval, the client asked us to continue designing the remaining screens and begin development.
              </p>
            </Block>
          </Split>

          <Split title="The outcome">
            <Block title="A defined and approved product experience">
              <p>
                Within three weeks, I translated the client's requirements into mapped user flows and high-fidelity designs that received client approval.
              </p>
              <p className="mt-[1.667em]">
                Development began, but the project was later halted because the client's desired delivery timeline wasn't feasible for the development team. The product did not reach launch.
              </p>
            </Block>
          </Split>

          <Split title="Reflection">
            <Block title="Aligning design with delivery">
              <p>
                Clarifying requirements and getting early approval helped establish a shared direction before development. The project also reinforced the importance of aligning delivery expectations with development capacity from the start.
              </p>
            </Block>
          </Split>
        </Band>

        {/* Next Case Study */}
        <Band bg="bg-white">
          <Reveal className={`flex flex-col gap-10 lg:flex-row lg:items-center ${colGap}`}>
            <div className="flex flex-col gap-4 lg:flex-1">
              <p className="text-title tracking-[-0.025em] text-ink-soft">Next case study</p>
              <a href={ENVIRONMENT} onClick={go} className="group">
                <p className="font-serif text-display font-bold italic tracking-[-0.0069em] transition-colors group-hover:text-black/70">
                  Redesigning a Complex Environmental Monitoring Platform into a Clear, Connected Experience
                </p>
              </a>
            </div>
            <a
              href={ENVIRONMENT}
              onClick={go}
              className="group overflow-hidden rounded-[6px] lg:shrink-0 lg:basis-[46.59%]"
            >
              <div className="relative aspect-[820/600] overflow-hidden">
                <img
                  src={`${A}case-environment.png`}
                  alt="Industrial plant releasing smoke over fields at sunset"
                  width={820}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover"
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

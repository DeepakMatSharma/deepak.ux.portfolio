import { Fragment, type ReactNode } from "react";
import Contact from "./Contact";
import { go, HOME } from "./router";
import { A, ComingSoon, Reveal } from "./ui";

const h2 = "font-serif text-h2 font-bold tracking-[-0.03125em]";
const h3 = "text-body font-semibold tracking-[-0.0167em] text-black";
const copy = "text-copy text-ink-soft";
const ul = "list-disc ps-[27px]";
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

const H2 = ({ children }: { children: ReactNode }) => (
  <Reveal>
    <h2 className={h2}>{children}</h2>
  </Reveal>
);

/** Section title on the left, content on the right (two equal halves from lg). */
function Split({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-4">
      <div className="lg:flex-1"><H2>{title}</H2></div>
      <div className={`flex flex-col lg:flex-1 ${g56}`}>{children}</div>
    </div>
  );
}

function Block({ title, tight, children }: { title: string; tight?: boolean; children: ReactNode }) {
  return (
    <Reveal className={`flex flex-col ${tight ? "gap-2" : "gap-4"}`}>
      <h3 className={h3}>{title}</h3>
      <div className={copy}>{children}</div>
    </Reveal>
  );
}

function Row({ label, stack, children }: { label: string; stack?: boolean; children: ReactNode }) {
  return (
    <Reveal className="flex flex-col gap-4 lg:flex-row">
      <h3 className={`${h3} lg:flex-1`}>{label}</h3>
      <div className={`${copy} lg:flex-1 ${stack ? "flex flex-col gap-2" : ""}`}>{children}</div>
    </Reveal>
  );
}

function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal className="flex w-full flex-col gap-1 border-2 border-black px-6 py-4 text-copy">
      <p className="font-bold text-black">{title}</p>
      <div className="text-ink-soft">{children}</div>
    </Reveal>
  );
}

function Cols({ items, tight, bold }: { items: [string, string][]; tight?: boolean; bold?: boolean }) {
  return (
    <Reveal className={`grid gap-10 lg:grid-cols-3 lg:gap-x-[6.8%] lg:gap-y-[clamp(2.5rem,4.167vw,5rem)]`}>
      {items.map(([t, d]) => (
        <div key={t} className={`flex flex-col ${tight ? "gap-2" : "gap-4"}`}>
          <h3 className={bold ? "text-body font-bold tracking-[-0.0167em] text-black" : h3}>{t}</h3>
          <p className={copy}>{d}</p>
        </div>
      ))}
    </Reveal>
  );
}

type Crop = [height: number, left: number, top: number, width: number]; // % values from Figma
function Shot({ src, alt, aspect, crop, frame = "full", className = "", children }: {
  src: string; alt: string; aspect: string; crop?: Crop; frame?: "full" | "round" | "none"; className?: string; children?: ReactNode;
}) {
  const f = frame === "full" ? "rounded-[6px] border border-line" : frame === "round" ? "rounded-[6px]" : "";
  return (
    <div className={`relative overflow-hidden ${f} ${className}`} style={{ aspectRatio: aspect }}>
      <img
        src={`${A}${src}`} alt={alt} loading="lazy" decoding="async"
        className={crop ? "absolute max-w-none" : "absolute inset-0 size-full object-cover"}
        style={crop ? { height: `${crop[0]}%`, left: `${crop[1]}%`, top: `${crop[2]}%`, width: `${crop[3]}%` } : undefined}
      />
      {children}
    </div>
  );
}

/** Text beside a screenshot. `flip` puts the screenshot on the left from lg. */
function Media({ shot, flip, children }: { shot: ReactNode; flip?: boolean; children: ReactNode }) {
  return (
    <Reveal className={`flex flex-col gap-8 lg:items-center ${colGap} ${flip ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
      <div className="min-w-0 lg:flex-1">{children}</div>
      {shot}
    </Reveal>
  );
}

function DiveHead({ n, lines }: { n: number; lines: [string, string] }) {
  return (
    <Reveal className="flex flex-col gap-4">
      <p className="text-title tracking-[-0.025em]">Deep dive #{n}</p>
      <h2 className={h2}>{lines[0]}<br />{lines[1]}</h2>
    </Reveal>
  );
}

const meta = [
  ["MY ROLE", "Product Designer"],
  ["TEAM", "Product, Design and Engineering"],
  ["RESPONSIBILITIES", "Research, Ideate, Design, Prototype, Test"],
  ["PROJECT DURATION", "4 years"],
];
const tags = ["Construction", "B2B SaaS Web app", "Global"];
const steps: [string, string][] = [
  ["1. Requirements", "Worked with the product stakeholders, the CEO and engineering to turn requests into clearly defined user problems. I asked what users were trying to do, not just what was asked for. We used to get those requirements in Jira board."],
  ["2. Research", "Reviewed user interview recordings and competitors, and developed an understanding of scheduling concepts such as WBS, constraints, critical paths and float. A flow can look simple and still break on a missed dependency."],
  ["3. User flows", "Mapped end-to-end flows before designing any screen, so edge cases showed up early."],
  ["4. Wireframes and explorations", "Created wireframes to explore multiple solutions and evaluated their trade-offs before committing to one"],
  ["5. UI and prototype", "Final UI, then a clickable prototype to walk the flow and catch gaps. For 15+ features I used Claude Code and Figma Make, so stakeholders could try a live prototype in 3–4 hours instead of 3–4 days like WBS edit mode"],
  ["6. Handoff and review", "Delivered annotated Figma designs, prototypes and Loom walkthroughs, then reviewed builds to catch implementation gaps before QA."],
];
const wbsFeatures: [string, string][] = [
  ["Restructure faster", "Drag one or multiple groups to reorder them or move them in and out of other groups."],
  ["Edit in context", "Rename, delete and change group colours in one place."],
  ["Create with ease", "Add groups as children or at the same hierarchy level."],
];
const reflections: [string, string][] = [
  ["Judgement over screens", "The most valuable decisions often involved knowing what not to build, when to adapt an existing pattern and when a simpler solution could meet the need."],
  ["Systems earlier", "I contributed to defining design-system components and states and reviewing their implementation. Looking back, I'd advocate for establishing a scalable foundation earlier to reduce rework as the product grows."],
  ["Prototypes as a shared language", "AI-assisted prototyping helped me explore interactions faster and make ideas tangible for stakeholders. It created more room to evaluate alternatives before committing engineering effort."],
];
const stats = [["~200", "features shipped, roughly one a week"], ["20%", "faster onboarding"], ["15+", "live prototypes created using AI"]];

export default function CaseStudy() {
  return (
    <>
      <main className="[--pad-y:clamp(4.5rem,7.8125vw,9.375rem)]">
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
          <Reveal className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-[clamp(1.5rem,2.5vw,3rem)] lg:w-[66.6%]">
              <h1 className="font-serif text-display font-bold italic tracking-[-0.0069em]">
                Making complex construction schedules easier to build and manage
              </h1>
              <p className="text-body tracking-[-0.0167em]">
                Planera is a construction planning and scheduling platform that helps teams manage complex projects without the steep learning curve of traditional tools like Primavera P6. I joined around the MVP stage and contributed over four years as the product and design team grew, helping make complex scheduling workflows easier to understand and use.
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

        <Reveal>
          <img
            src={`${A}planera-hero.png`} alt="Construction site with workers, scaffolding and steel reinforcement"
            width={1920} height={704} decoding="async"
            className="aspect-[16/10] w-full object-cover object-[50%_76.2%] md:aspect-[1920/704]"
          />
        </Reveal>

        <Band bg="bg-mist">
          <Split title="Context and problem">
            <Block title="Users">
              <p>Construction schedules are used by three groups: </p>
              <ul className={ul}>
                <li><b className="text-black">Schedulers</b> build the plan</li>
                <li><b className="text-black">Managers</b> review it</li>
                <li><b className="text-black">Site teams</b> track progress against it</li>
              </ul>
            </Block>
            <Block title="Why existing tools were hard">
              <p>The tools they had were powerful but hard to learn, weak at collaboration, and organised around tables and timelines. That didn't match how schedulers described their own work, which was spatial: activities and the relationships between them.</p>
            </Block>
            <Block title="The design challenge">
              <p><b className="text-black">How might we</b> simplify construction scheduling without compromising the precision and flexibility complex projects demand?</p>
              <p>The goal wasn't to remove complexity from the work, but to make it easier to manage.</p>
            </Block>
          </Split>
        </Band>

        <Band bg="bg-white">
          <Split title="Research and the Canvas bet">
            <Reveal className={`${copy} flex flex-col gap-[1.667em]`}>
              <p>We watched recordings of user interviews as a team. The pattern was clear: people think in groups of activities and links, but their software showed rows and bars.</p>
              <p>To test that, we put simple shapes for activities, groups and milestones on a Miro board and asked users to build a schedule. [N participants, type of user.] It felt natural to them. [One specific observation or quote.]</p>
            </Reveal>
            <Callout title="THAT BECAME THE PRODUCT’S CORE IDEA">
              <ul className={ul}>
                <li>Start from how people organise the work (Canvas)</li>
                <li>Then connect it to the structured data (Table) and timeline (Gantt) they still need.</li>
              </ul>
            </Callout>
          </Split>
        </Band>

        <Band bg="bg-mist" className={`gap-[clamp(5rem,12.5vw,15rem)]`}>
          <Split title="My Process">
            <Block title="How a feature moved from request to release">
              <p>The same six steps ran across most of the ~200 features, scaled to the size of the feature. The three chapters that follow don't repeat them; they show what I decided inside them.</p>
            </Block>
          </Split>
          <Cols items={steps} bold />
        </Band>

        <Band bg="bg-white" className={g80}>
          <DiveHead n={1} lines={["Version comparison: ", "One capability, three different answers"]} />
          <Callout title="MY ROLE">
            <p>Led version comparison end to end, from exploring interaction models and evaluating trade-offs to defining the final experience across Canvas, Table and Gantt.</p>
          </Callout>
          <div className={`flex flex-col ${g120}`}>
            <Row label="The Ask">
              <p>Users needed to compare alternate project plans and understand what had changed. </p>
              <p>The initial request was to support comparison across Canvas, Table and Gantt.</p>
            </Row>
            <Row label="What went wrong">
              <p>A consistent side-by-side approach created different problems in each view.</p>
              <p>Canvas became cluttered with duplicate elements, while duplicating Table columns made an already dense interface harder to scan and edit. One interaction pattern wasn't suited to every task.</p>
            </Row>
          </div>
          <div className="lg:w-1/2"><Block title="The Decision" tight><p>Match the pattern to the task</p></Block></div>
          <Media shot={<Shot src="cs-version-gantt.png" alt="Gantt view in version comparison mode" aspect="981/499" frame="none" className="lg:shrink-0 lg:basis-[55.74%]" />}>
            <Block title="Gantt first" tight><p>Comparison is an analytical task, so Gantt received a dedicated mode for examining differences without complicating everyday scheduling.</p></Block>
          </Media>
          <Media flip shot={<Shot src="cs-version-table.png" alt="Table view with a Variance tab and extra version columns" aspect="866/480" crop={[100, -11.13, 0, 125.54]} className="lg:shrink-0 lg:basis-[49.2%]" />}>
            <Block title="Table later, differently" tight><p>When users asked for it, I didn't copy the side-by-side pattern. I introduced a Variance tab that lets users add variance columns for chosen fields, up to two extra versions.</p></Block>
          </Media>
          <Media shot={<Shot src="cs-version-canvas.png" alt="Canvas view without any comparison layer" aspect="1045/480" crop={[117.77, -14.43, -9.23, 122.5]} className="lg:shrink-0 lg:basis-[59.38%]" />}>
            <Block title="Canvas stayed clean" tight><p>Canvas stays focused on creating and arranging the plan, with no comparison layer added.</p></Block>
          </Media>
          <Callout title="WHAT I LEARNED">
            <p>The same capability doesn't need the same interface. Consistency comes from coherent behaviour, not copying the same interaction everywhere.</p>
          </Callout>
        </Band>

        <Band bg="bg-white" className={g80}>
          <DiveHead n={2} lines={["WBS Edit mode: ", "Simplifying complex project hierarchies"]} />
          <Callout title="MY ROLE">
            <p>Led the feature end to end, using Claude Design to accelerate explorations, prototype interactions and validate the experience with stakeholders.</p>
          </Callout>
          <div className={`flex flex-col ${g56}`}>
            <Row label="The problem" stack>
              <p>Construction projects can contain hundreds of activities, milestones and nested groups. While Canvas made it easy to create hierarchies initially, managing them as projects grew became time-consuming.</p>
              <p>Reordering groups, nesting them and restructuring large projects required repeated drag-and-drop interactions. The Table view supported basic reordering, but its mix of activities, milestones and groups made structural changes difficult to manage efficiently.</p>
            </Row>
            <Row label="The solution">
              <div className="flex flex-col gap-2">
                <p className={h3}>A dedicated editing experience</p>
                <p>I designed WBS Edit mode as a separate space focused exclusively on groups, reusing the familiar tree structure from the existing Table and Project navigator.  For easy discoverability, I added entry points in the Table's Element Name column header and the Canvas Project navigator.</p>
              </div>
            </Row>
            <div className="lg:flex lg:min-h-[400px] lg:items-center"><div className="w-full"><Cols items={wbsFeatures} tight /></div></div>
            <Row label="Prototyping with AI">
              <p>I used Claude Design to explore interaction patterns and build a complete, interactive prototype with real-time dragging, reordering and microanimations.</p>
              <p>Stakeholders could experience the workflow firsthand and share feedback before development, helping us refine the experience early.</p>
            </Row>
            <Row label="Handoff: Bridging the gap between prototype and production" stack>
              <p>The Claude prototype wasn't a one-to-one representation of our design system, so developers needed clear references for both the interface and its behaviour.</p>
              <p>I created base screens in Figma as the source of truth for the UI, while the Claude prototype demonstrated interactions and microanimations.</p>
              <p>I also recorded a Loom walkthrough covering both, leaving little room for ambiguity during implementation.</p>
              <p>Once development began, I tested the feature before QA, identifying UI inconsistencies & bugs early.</p>
            </Row>
          </div>
          <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-[3.18%]">
            <Shot src="cs-wbs-base.png" alt="WBS Edit mode base screen designed in Figma" aspect="623/580" crop={[100.34, -0.02, -0.34, 100.03]} className="lg:shrink-0 lg:basis-[35.4%]" />
            <Shot src="cs-wbs-prototype.png" alt="WBS Edit mode interactive prototype built with Claude Design" aspect="960/582" crop={[101.05, -0.32, -1.04, 101.57]} className="lg:flex-1" />
          </Reveal>
          <div className={`flex flex-col ${g56}`}>
            <Row label="The result">
              <p>The feature was well received by stakeholders, and users later described the experience as easy to use and effective in solving their hierarchy-management challenges. Clear handoff materials and early implementation reviews helped the team develop the feature quickly and deliver it on time.</p>
            </Row>
            <Callout title="WHAT I LEARNED">
              <p>AI speeds up exploration, but clear communication turns prototypes into well-built products.</p>
            </Callout>
          </div>
        </Band>

        <Band bg="bg-mist" className={g80}>
          <H2>Also shipped</H2>
          <div className={`flex flex-col ${g120}`}>
            <Media shot={<Shot src="cs-onboarding.png" alt="Illustrated empty state guiding users to start their first project" aspect="982/396" crop={[159.6, -3.56, -37.03, 107.13]} className="lg:shrink-0 lg:basis-[55.8%]" />}>
              <div className="flex flex-col justify-between gap-4 lg:min-h-[min(11.875vw,228px)]">
                <h3 className={h3}>Onboarding: Simplifying the first experience</h3>
                <div className={copy}>
                  <ul className={ul}><li>Introduced illustrated empty states with concise descriptions and clear CTAs across modules to help users understand how to get started.</li></ul>
                  <ul className={`${ul} mt-[1.667em]`}><li>To solve the blank canvas problem, prepopulated new projects with start and finish milestones and an activity, giving users a clear starting point to build and run their first schedule.</li></ul>
                </div>
              </div>
            </Media>
            <Media flip shot={<Shot src="cs-canvas-shortcut.png" alt="Canvas activity chain created with the Shift + Enter shortcut" aspect="897/415" className="lg:shrink-0 lg:basis-[50.97%]" />}>
              <Block title="Canvas interactions: Faster activity creation">
                <ul className={ul}>
                  <li>Introduced a Shift + Enter shortcut for creating activity chains, reducing the workflow from approximately 3–4 steps to 2. </li>
                  <li>This made a frequent scheduling task faster while preserving the existing Canvas interaction model.</li>
                </ul>
              </Block>
            </Media>
            <Media shot={<Shot src="cs-canvas-embeds.png" alt="Canvas with an embedded image" aspect="864/537" crop={[100.63, 0, -0.63, 100]} className="lg:shrink-0 lg:basis-[49.09%]" />}>
              <Block title="Canvas embeds: Solving the need, not just the request">
                <ul className={ul}>
                  <li>The initial request was to support embedding both images and PDFs on Canvas. When engineering flagged the complexity of PDF embedding, I revisited the underlying use case and realised images already covered the core need. Users could embed screenshots of PDF content or paste a PDF URL to open the full document in a new tab. </li>
                  <li>By demonstrating these alternatives, I convinced the client to drop direct PDF embedding, avoiding significant engineering effort and development time.</li>
                </ul>
              </Block>
            </Media>
          </div>
        </Band>

        <Band bg="bg-white" className={g120}>
          <H2>The numbers</H2>
          <div className={`flex flex-col ${g80}`}>
            <Reveal className={`grid gap-10 lg:grid-cols-3 lg:gap-x-[6.8%]`}>
              {stats.map(([v, d]) => (
                <div key={v} className="flex flex-col gap-4">
                  <p className="font-serif text-display font-bold italic tracking-[-0.0069em]">{v}</p>
                  <p className={copy}>{d}</p>
                </div>
              ))}
            </Reveal>
            <Callout title="Impact">
              <p>Planera raised a $5.4M seed and a $13.5M Series A over this period. I contributed to the product behind them, not the rounds themselves.</p>
            </Callout>
          </div>
        </Band>

        <Band bg="bg-mist" className={g120}>
          <H2>Reflection</H2>
          <Cols items={reflections} />
        </Band>

        <Band bg="bg-white">
          <Reveal className={`flex flex-col gap-10 lg:flex-row lg:items-center ${colGap}`}>
            <div className="flex flex-col gap-4 lg:flex-1">
              <p className="text-title tracking-[-0.025em] text-ink-soft">Next case study</p>
              <p className="font-serif text-display font-bold italic tracking-[-0.0069em]">Bridging the gap between employers and blue-collar workers</p>
            </div>
            <Shot src="next-case.png" alt="Two professionals shaking hands across a table" aspect="820/600" crop={[164.84, -33.33, -55.47, 188.39]} frame="round" className="group lg:shrink-0 lg:basis-[46.59%]">
              <ComingSoon />
            </Shot>
          </Reveal>
        </Band>
      </main>
      <Contact />
    </>
  );
}

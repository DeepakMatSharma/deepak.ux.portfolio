import { A, Reveal, Section, links } from "./ui";

function IconLink({ href, label, name }: { href: string; label: string; name: string }) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group flex size-14 shrink-0 items-center justify-center rounded-full border border-white text-white transition-all duration-300 hover:bg-white focus-visible:outline-2 focus-visible:outline-white"
    >
      <img
        src={`${A}${name}-group.svg`}
        alt=""
        className={
          name === "email"
            ? "h-4 w-6 object-contain brightness-0 invert transition-all duration-300 group-hover:invert-0"
            : "size-5 object-contain brightness-0 invert transition-all duration-300 group-hover:invert-0"
        }
      />
    </a>
  );
}

export default function Contact() {
  return (
    <footer className="bg-black text-white">
      <Section className="flex flex-col gap-[clamp(5rem,12vw,14rem)] pb-[clamp(3rem,6vw,6rem)] pt-[clamp(4rem,8vw,8rem)]">
        <Reveal className="text-center">
          <h2 className="font-serif text-display font-bold italic tracking-[-0.0069em] text-white">
            Have an interesting problem to solve?
          </h2>
          <p className="mt-4 text-subhead tracking-[-0.025em] text-white">
            I'd love to hear about it.
          </p>
        </Reveal>

        {/* Two-column row: name/info on left, contacts at roughly the midpoint */}
        <Reveal className="flex flex-col gap-12 lg:flex-row lg:items-end lg:gap-[clamp(6rem,22vw,26rem)]">
          {/* Left: name and info */}
          <div className="flex flex-col gap-6">
            <p className="font-serif text-title font-bold tracking-[-0.025em] text-white">
              Deepak Sharma
            </p>
            <div className="flex flex-col gap-1 text-body tracking-[-0.0167em] text-white">
              <p>Product Designer</p>
              <p>New Delhi, India</p>
            </div>
            <p className="mt-6 text-small text-white/70">
              © {new Date().getFullYear()} Deepak Sharma. All rights reserved.
            </p>
          </div>

          {/* Right: let's get in touch */}
          <div className="flex flex-col gap-6">
            <p className="text-body tracking-[-0.0167em] text-white">
              Let's get in touch
            </p>
            <div className="flex items-center gap-5">
              <IconLink href={links.linkedin} label="LinkedIn" name="linkedin" />
              <IconLink href={links.email} label="Email" name="email" />
            </div>
          </div>
        </Reveal>
      </Section>
    </footer>
  );
}

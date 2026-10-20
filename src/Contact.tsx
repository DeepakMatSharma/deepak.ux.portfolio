import { A, Display, Reveal, Section, links } from "./ui";

function IconLink({ href, label, name, inset }: { href: string; label: string; name: string; inset: string }) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="relative block size-16 shrink-0 overflow-hidden rounded-full outline-offset-4 focus-visible:outline-2"
    >
      <img src={`${A}${name}-group.svg`} alt="" className={`absolute block max-w-none ${inset}`} />
      <img src={`${A}${name}-mask.svg`} alt="" className="absolute inset-0 block size-full max-w-none" />
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_0_3.556px_black]" />
    </a>
  );
}

export default function Contact() {
  return (
    <footer className="bg-mist">
      <Section className="flex flex-col gap-[clamp(5rem,12.5vw,15rem)] pb-(--pad-x)">
        <Reveal className="text-center">
          <Display>Have an interesting problem to solve?</Display>
          <p className="mt-4 text-subhead tracking-[-0.025em]">I’d love to hear about it.</p>
        </Reveal>
        <Reveal className="flex flex-col gap-12 lg:flex-row lg:gap-[16.25vw]">
          <div className="flex flex-col gap-[clamp(2rem,3.65vw,4.375rem)] lg:w-[30vw]">
            <div className="flex flex-col gap-6">
              <p className="font-serif text-title font-bold tracking-[-0.025em]">Deepak Sharma</p>
              <div className="flex flex-col gap-2 text-body tracking-[-0.0167em]">
                <p>Product Designer</p>
                <p>New Delhi, India</p>
              </div>
            </div>
            <p className="text-small">© 2026 Deepak Sharma. All rights reserved.</p>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-body tracking-[-0.0167em]">Let’s get in touch</p>
            <div className="flex items-center gap-6">
              <IconLink href={links.linkedin} label="LinkedIn" name="linkedin" inset="inset-[28.13%_28.13%_31.25%_31.25%]" />
              <IconLink href={links.email} label="Email" name="email" inset="inset-[34.38%_26.56%]" />
            </div>
          </div>
        </Reveal>
      </Section>
    </footer>
  );
}

// Downloads every asset used in the Figma design into public/assets.
// The Figma links expire 7 days after they were issued (Oct 20, 2026): run this first.
import { mkdir, writeFile } from "node:fs/promises";

const base = "https://www.figma.com/api/mcp/asset/";
const assets = {
  "hero-bg.png": "411942fa-4a6b-4e28-be0c-91ecf94aa3c8.png",
  "case-construction.png": "f01a2010-3a3e-493e-a1dc-057fb49fcd65.png",
  "case-hiring.png": "911e39e6-cd50-41d0-a1f4-5d95fa3cedcb.png",
  "case-environment.png": "18afce6f-6f4f-46a6-92af-27d140e3fbaa.png",
  "linkedin-group.svg": "cd1b3b0c-e337-461f-966e-3a002d917ce5.svg",
  "linkedin-mask.svg": "42390908-bc7d-4871-8943-30d78d2cef0e.svg",
  "email-group.svg": "63af28bf-2dbd-4103-a617-f0626fac7f14.svg",
  "email-mask.svg": "10c821f5-5ae0-413c-bd07-874a0dc0aee4.svg",
  // Planera case study page
  "planera-hero.png": "9fa5d54f-adc7-4e6b-bc79-c45fca1ebfae.png",
  "cs-version-gantt.png": "767b41db-1879-4bcb-b940-0c085ac61661.png",
  "cs-version-table.png": "72d26798-2358-4a2d-aa8e-af63d98c01e0.png",
  "cs-version-canvas.png": "86b292b2-0d45-4d43-96a9-feece05b7680.png",
  "cs-wbs-base.png": "2c593c6a-f74f-47df-9f70-2c330f4ecbde.png",
  "cs-wbs-prototype.png": "bebea1f5-fad6-4b2a-a28a-84f076947190.png",
  "cs-onboarding.png": "2a6cecc8-931a-48c8-a100-dd91e43a2ab8.png",
  "cs-canvas-shortcut.png": "8431b8b8-de2a-4ebf-9c22-b3fd94ba8fa0.png",
  "cs-canvas-embeds.png": "1f6fbfc9-1af1-4ad7-b442-e53a4bb26838.png",
  "next-case.png": "737567f8-ed80-4688-8541-0b3ce188bf09.png",
};

await mkdir("public/assets", { recursive: true });
for (const [name, id] of Object.entries(assets)) {
  const res = await fetch(base + id);
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  await writeFile(`public/assets/${name}`, Buffer.from(await res.arrayBuffer()));
  console.log("saved", name);
}

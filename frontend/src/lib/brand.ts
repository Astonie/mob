/**
 * Mob Limited — brand content from the company brand sheet.
 * Copy only: positioning, value chain, core services, values and contact details.
 */

export const brand = {
  name: "Mob Limited",
  positioning: "Integrated Mining & Mineral Solutions",
  tagline: "Exploring Potential. Delivering Value.",
  signature: "Malawi Beyond",
  signatureLine: "Proudly Malawian. Globally Focused.",
  phone: "+265 881 525 611",
  email: "info@moblimited.com",
  website: "www.moblimited.com",
} as const;

export const valueChain = [
  {
    key: "01",
    title: "Explore",
    body: "Geological mapping, targeting and early-stage evaluation across greenfield and brownfield tenements.",
  },
  {
    key: "02",
    title: "Evaluate",
    body: "Resource definition, technical studies and due diligence that stand up to lenders, boards and regulators.",
  },
  {
    key: "03",
    title: "Develop",
    body: "Mine planning, permitting and project delivery from scoping study through to shovel-ready execution.",
  },
  {
    key: "04",
    title: "Deliver",
    body: "Owner's team support, HSE, technical reporting and field logistics through construction and operations.",
  },
] as const;

export const coreServices = [
  {
    key: "01",
    title: "Geological Services",
    description: "Geological mapping, prospecting, structural studies & resource evaluation.",
  },
  {
    key: "02",
    title: "Mineral Exploration",
    description: "Exploration planning, geochemical sampling, drilling supervision & reporting.",
  },
  {
    key: "03",
    title: "Surveying, GIS & Remote Sensing",
    description: "Topographic surveys, drone mapping, GIS analysis & spatial solutions.",
  },
  {
    key: "04",
    title: "Geophysical Services",
    description: "Magnetic, electrical & EM surveys with professional data interpretation.",
  },
  {
    key: "05",
    title: "Mining Consultancy",
    description: "Mine planning, feasibility studies, due diligence & technical advisory services.",
  },
  {
    key: "06",
    title: "Environmental & Regulatory Services",
    description: "Environmental assessments, compliance support, licensing & rehabilitation planning.",
  },
  {
    key: "07",
    title: "Project Management & Technical Support",
    description: "Project management, HSE, technical reporting, field logistics & data management.",
  },
] as const;

export const brandValues = [
  { title: "Integrity", body: "We do what is right, always." },
  { title: "Safety", body: "We protect our people, our clients & our environment." },
  { title: "Quality", body: "We deliver excellence through proven standards." },
  { title: "Partnership", body: "We build lasting relationships for shared success." },
] as const;

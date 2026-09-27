/**
 * Marketing content layer.
 *
 * Content is authored here (not inside components) so the UI stays declarative
 * and copy can be edited — or later swapped for a CMS — in one place.
 *
 * NOTE: copy was ported from the legacy aglobalcare.com site. Several legacy
 * headline facts were only available as text baked into images
 * (impact1-3.png, business_model1-4.png) and have been transcribed into real,
 * selectable, screen-reader-friendly text below.
 */

import type {
  BusinessModelStep,
  CoreValue,
  Highlight,
  ProductCategory,
  SolutionGroup,
  Stat,
  TeamMember,
} from "@/lib/types";

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Philippines · Healthcare Distribution & Market Access",
  title: "Providing accessible, innovative, safe and reliable healthcare solutions",
  lead: "AGlobal Care, Inc. is committed to reliable healthcare solutions, fostering strong relationships through dependable products and services.",
  primaryCta: { label: "Explore our solutions", href: "#solutions" },
  secondaryCta: { label: "Talk to our team", href: "#contact" },
} as const;

/* -------------------------------------------------------------------------- */
/* Company impact — transcribed from legacy impact1-3.png                     */
/* -------------------------------------------------------------------------- */

export const impactHighlights: readonly Highlight[] = [
  {
    icon: "spark",
    title: "Brand Identity Enhancement",
    description:
      "We empower over 50 business clients to enhance their brand identity, providing them with the tools and support they need to stand out in the market and connect with their target audience effectively.",
  },
  {
    icon: "globe",
    title: "Extensive Reach",
    description:
      "With access to over 250 distributors and 10,000 drugstores, AGlobal Care, Inc. ensures widespread availability of healthcare products, reaching diverse communities and making a positive impact on a global scale.",
  },
  {
    icon: "chart",
    title: "Brand Portfolio Expansion",
    description:
      "AGlobal Care, Inc. supports over 50 business clients in strengthening and expanding their brand portfolio. We work closely with our clients to develop tailored strategies that help them grow and succeed in the competitive market.",
  },
] as const;

export const stats: readonly Stat[] = [
  { value: "50+", label: "Business clients supported" },
  { value: "250+", label: "Distributor partners" },
  { value: "10,000", label: "Drugstores reached" },
  { value: "90%", label: "National coverage" },
] as const;

/* -------------------------------------------------------------------------- */
/* Business model — transcribed from legacy business_model1-4.png             */
/* -------------------------------------------------------------------------- */

export const businessModel = {
  eyebrow: "How we operate",
  title: "A resilient healthcare supply chain, end to end",
  lead: "From sourcing the right products to placing them in the hands of patients, every step is governed by diligence, compliance and care.",
  steps: [
    {
      step: 1,
      title: "Product Selection",
      description:
        "We identify the pharmaceutical products that have demand in the domestic market. This involves conducting market research, considering regulatory requirements, and assessing the potential profitability of importing and selling specific drugs.",
    },
    {
      step: 2,
      title: "Supplier Relationships",
      description:
        "We establish relationships with pharmaceutical manufacturers or authorized distributors in other countries. Negotiating favorable terms, such as pricing, minimum order quantities, and exclusivity agreements, can be important in maintaining a competitive edge.",
    },
    {
      step: 3,
      title: "Regulatory Compliance",
      description:
        "We comply with the necessary licenses, permits, and certifications to import and distribute pharmaceutical products, adhering to good manufacturing practices (GMP) and quality control standards.",
    },
    {
      step: 4,
      title: "Marketing & Distribution",
      description:
        "We run marketing and distribution activities to reach healthcare providers, pharmacies, hospitals, and other relevant stakeholders. Our competent sales team attends trade shows, partners with local distributors, and leverages online channels to promote and sell the imported products.",
    },
  ] satisfies readonly BusinessModelStep[],
} as const;

/* -------------------------------------------------------------------------- */
/* Product categories                                                         */
/* -------------------------------------------------------------------------- */

export const productCategories: readonly ProductCategory[] = [
  {
    name: "Injectables",
    blurb:
      "Parenteral fluids, sterile preparations and hospital-grade injectable therapies.",
    icon: "syringe",
  },
  {
    name: "Oral Products",
    blurb: "Prescription and over-the-counter medicines in oral dosage forms.",
    icon: "capsule",
  },
  {
    name: "Optic Drops",
    blurb: "Ophthalmic solutions and specialized eye-care preparations.",
    icon: "eye",
  },
  {
    name: "Topical Creams",
    blurb: "Dermatological and topical treatments formulated for daily care.",
    icon: "tube",
  },
  {
    name: "Food Supplements",
    blurb: "Nutritional and wellness products supporting every life stage.",
    icon: "leaf",
  },
  {
    name: "Medical Devices",
    blurb: "Diagnostics, laboratory equipment and clinical-grade devices.",
    icon: "stethoscope",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Solutions                                                                  */
/* -------------------------------------------------------------------------- */

export const solutions: readonly SolutionGroup[] = [
  {
    id: "distribution",
    label: "Distribution",
    headline: "End-to-end logistics, warehousing and cold chain excellence",
    intro:
      "We move sensitive healthcare products through the Philippines with speed, security and complete regulatory confidence.",
    pillars: [
      "End-to-End Logistics",
      "Warehousing Excellence",
      "Cold Chain Expertise",
    ],
    cards: [
      {
        icon: "truck",
        title: "Complete Distribution Services",
        description:
          "Warehousing, redressing, pick & pack, credit management, and last-mile delivery.",
      },
      {
        icon: "globe",
        title: "Nationwide Reach",
        description:
          "90% coverage, including remote and hard-to-access areas.",
      },
      {
        icon: "warehouse",
        title: "State-of-the-Art Facilities",
        description:
          "Rapid processing, secure narcotics control, and strict regulatory compliance.",
      },
      {
        icon: "shield",
        title: "Uncompromising Quality Control",
        description:
          "Ensuring products meet the highest standards before reaching customers.",
      },
      {
        icon: "thermometer",
        title: "Advanced Temperature-Controlled Infrastructure",
        description: "Preserving the integrity of sensitive products.",
      },
      {
        icon: "check",
        title: "Innovative Packaging Solutions",
        description:
          "Reliable, temperature-stable shipments with cutting-edge technology like the eZCooler.",
      },
    ],
  },
  {
    id: "regulatory",
    label: "Regulatory & Market Access",
    headline: "Regulatory services, market research and product registration",
    intro:
      "We clear the path to the Philippine market — from feasibility and registration through to launch and lifecycle compliance.",
    pillars: [
      "Regulatory Services",
      "Market Research & Feasibility",
      "Product Registration",
    ],
    cards: [
      {
        icon: "clipboard",
        title: "FDA Compliance & Strategy",
        description:
          "Expert guidance on Philippine FDA regulations, GMP standards, labeling, and licensing.",
      },
      {
        icon: "check",
        title: "Regulatory Submissions",
        description:
          "Hassle-free preparation and filing for Certificate of Product Registration (CPR), amendments, and renewals.",
      },
      {
        icon: "chart",
        title: "Industry & Consumer Insights",
        description:
          "Data-driven analysis of market trends, demand, and competition in the Philippines.",
      },
      {
        icon: "shield",
        title: "Regulatory Impact Assessment",
        description: "Understanding how local laws affect product viability.",
      },
      {
        icon: "globe",
        title: "Risk Management",
        description:
          "Proactively identifying and mitigating compliance and financial risks.",
      },
      {
        icon: "capsule",
        title: "Pharmaceuticals (RX & OTC)",
        description:
          "Fast-tracked Philippine FDA approvals for prescription and over-the-counter medicines.",
      },
      {
        icon: "leaf",
        title: "Food & Supplements",
        description:
          "Ensuring compliance with FDA and BFAD requirements for market entry.",
      },
      {
        icon: "stethoscope",
        title: "Medical Devices",
        description:
          "Expert navigation of Philippine FDA medical device registration and classification.",
      },
    ],
  },
] as const;

/* -------------------------------------------------------------------------- */
/* About                                                                      */
/* -------------------------------------------------------------------------- */

export const about = {
  title: "Who we are",
  lead: "Our extensive product range includes parenteral fluids, nutritional supplements, pharmaceuticals, medical devices, diagnostics, and food products — supporting every stage of life, from growth to critical care.",
  body: "AGlobal Care, Inc. emerged from humble beginnings to become a leading healthcare company, combining skills and resources into a platform that delivers a broad spectrum of life-changing solutions. For decades we have continued to develop affordable, effective and safe products manufactured to strict global quality standards. Through continuous innovation, efficiency and forward-looking management, we keep pace with the rapidly changing needs of the healthcare industry — pairing deep local market expertise with a global vision to deliver dedicated, life-changing solutions.",
  closing:
    "We understand that being healthy is not merely the absence of infection or disease, but the holistic well-being of an individual in every aspect. With the patient as the end user, we accelerate pipeline development and work hard to deliver what we promise.",
  mission:
    "To discover and develop affordable, effective, and safe healthcare solutions while ensuring excellent customer and principal relations as well as efficient and prompt distribution to urban, rural, and remote areas.",
  missionShort: "To save and change lives globally.",
} as const;

export const coreValues: readonly CoreValue[] = [
  {
    letter: "C",
    title: "Customer satisfaction beyond expectations",
    description:
      "We prioritize providing customer satisfaction that goes beyond expectations. We are dedicated to understanding and meeting the needs of our customers, ensuring their utmost satisfaction with our products and services.",
  },
  {
    letter: "A",
    title: "Aligning with God as our guiding force",
    description:
      "We are driven by our commitment to making a positive impact on the lives of our customers. We believe in using our expertise and resources to provide exceptional care and support, guided by our passion for helping others.",
  },
  {
    letter: "R",
    title: "Reliability in products and service",
    description:
      "We understand the importance of delivering products and services that our customers can depend on. By ensuring the reliability of our offerings, we aim to build trust and long-term relationships with our valued customers.",
  },
  {
    letter: "E",
    title: "Efficiency and effectiveness in resource management",
    description:
      "We are committed to optimizing resource management to maximize efficiency and effectiveness, utilizing our resources wisely so we can deliver the highest level of care while optimizing our operations.",
  },
] as const;

export const team: readonly TeamMember[] = [
  {
    name: "Harish Abichandani",
    role: "Director",
    initials: "HA",
    photo: {
      src: "/team/harish.webp",
      width: 640,
      height: 854,
      source: { width: 1066, height: 1600 },
    },
  },
  {
    name: "Javish Abichandani",
    role: "Chief Executive Officer",
    initials: "JA",
    photo: {
      src: "/team/javish.webp",
      width: 640,
      height: 854,
      source: { width: 1066, height: 1600 },
    },
  },
  {
    name: "Pratik Abichandani",
    role: "Chief International Officer",
    initials: "PA",
    photo: {
      src: "/team/pratik.webp",
      width: 640,
      height: 854,
      source: { width: 1066, height: 1600 },
    },
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Partnership network                                                        */
/* -------------------------------------------------------------------------- */

export interface PartnerLogo {
  /** Path under `/public`. */
  src: string;
  /**
   * Accessible name. Taken verbatim from the wordmark printed inside each logo,
   * so it is never invented. The three mark-only logos carry no readable company
   * name in the source artwork and are described neutrally instead.
   */
  name: string;
}

/**
 * Principal and partner logos, recovered from the legacy logo wall
 * (`/images/1..15.jpg` — note the legacy set skips 7, so there are 14).
 * `public/partners/<file>.png` is a 256×256 re-encode with the white page
 * background removed; see `docs/progress.md` for the conversion method.
 */
export const partnerLogos: readonly PartnerLogo[] = [
  { src: "/partners/partner-1.png", name: "Partner logo 1" },
  { src: "/partners/arlico.png", name: "Korea Arlico Pharm. Co., Ltd." },
  { src: "/partners/beximco-pharma.png", name: "Beximco Pharma" },
  {
    src: "/partners/general-pharmaceuticals.png",
    name: "General Pharmaceuticals Ltd.",
  },
  { src: "/partners/grand-pharma.png", name: "Grand Pharma" },
  { src: "/partners/ildong.png", name: "Ildong" },
  { src: "/partners/partner-8.png", name: "Partner logo 8" },
  { src: "/partners/ncpc.png", name: "NCPC" },
  { src: "/partners/penmix.png", name: "Penmix" },
  { src: "/partners/polipharm.png", name: "Polipharm" },
  { src: "/partners/partner-12.png", name: "Partner logo 12" },
  { src: "/partners/swiss-pharma.png", name: "Swiss" },
  { src: "/partners/partner-14.png", name: "Partner logo 14" },
  { src: "/partners/phapros.png", name: "Phapros" },
] as const;

export const partners = {
  title: "Trusted by principals and healthcare partners worldwide",
  lead: "We represent a global network of manufacturers and authorized distributors across pharmaceuticals, devices and nutrition.",
} as const;

/* -------------------------------------------------------------------------- */
/* Contact                                                                    */
/* -------------------------------------------------------------------------- */

export const contact = {
  title: "Contact us",
  lead: "We would love to hear from you. Reach out to us using the form below.",
  enquiryTypes: [
    { value: "talent", label: "Talent" },
    { value: "customer", label: "Customer" },
    { value: "supplier", label: "Supplier" },
    { value: "adr", label: "ADR (Adverse Drug Reaction)" },
  ],
  adrNote:
    "Reporting an adverse drug reaction? Please include the product name, batch or lot number, and a description of the event so our pharmacovigilance team can respond promptly.",
} as const;

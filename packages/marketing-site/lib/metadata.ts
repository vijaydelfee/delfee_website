import type { Metadata } from "next";

const SITE_NAME = "ShieldAI by Delfee";
const SITE_DESCRIPTION =
  "Guardrails for AI coding tools. Policy enforcement, PII detection, and full audit trail — with zero developer friction.";
const BASE_URL = "https://delfee.co";

interface PageMeta {
  title: string;
  description?: string;
  path?: string;
}

export function createMetadata({ title, description, path = "" }: PageMeta): Metadata {
  const fullTitle = `${title} | ${SITE_NAME} — Guardrails for AI Coding Tools`;
  const desc = description ?? SITE_DESCRIPTION;
  const url = `${BASE_URL}${path}`;

  return {
    title: fullTitle,
    description: desc,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: "ShieldAI — Guardrails for AI Coding Tools",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
    },
  };
}

// Components for any Exalynt-built app, internal or client. They take every
// color, size and font from the MUI theme they render under, so they look
// like whichever brand that theme is.

export * from "./CalloutPanel";
export * from "./ConfirmDialog";
export * from "./EmptyState";
export * from "./MaturityDetails";
export * from "./MaturityRing";
export * from "./PageHeader";
export * from "./SearchSelect";
export * from "./SectionCard";
export * from "./StabilityDetails";
export * from "./StabilityMark";
export * from "./StatCard";
export * from "./ThemeToggle";
export * from "./table";

// Stability levels and maturity: what each level means, and how maturity is
// worked out from them. The components' own helpers stay internal.
export {
  STABILITY,
  STABILITY_DOCS_URL,
  STABILITY_LEVELS,
  STABILITY_LEVEL_IDS,
  stabilityStep,
  type StabilityLevel,
  type StabilityLevelId,
} from "./stability";
export {
  HEALTHY_MATURITY,
  MATURITY_BANDS,
  MATURITY_DOCS_URL,
  featureMaturity,
  maturityBand,
  projectMaturity,
} from "./maturity";

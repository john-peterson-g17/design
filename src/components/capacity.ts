// Exalynt's capacity blocks: Flex, Core, and Dedicated, by their names, their
// sizes in capacity units, and the hours that give a sense of that size. The
// names, units, and hours mirror the readme's src/data/exalynt.ts. What
// capacity is, what a block supports, and how blocks are priced are the
// readme's to explain (CAPACITY_DOCS_URL), and prices come from the app,
// which has them from exalynt.com, so none of that is repeated here.

export const CAPACITY_BLOCK_IDS = ["flex", "core", "dedicated"] as const;

export type CapacityBlockId = (typeof CAPACITY_BLOCK_IDS)[number];

export type CapacityBlockSize = {
  id: CapacityBlockId;
  /** "Flex"; a block is called "Flex block" on screen. */
  name: string;
  /** Size in capacity units, each a quarter of one engineer's week. */
  units: number;
  /**
   * The readme's effort reference: roughly how many hours of engineering
   * effort a block is comparable to, only to give a sense of its size. Never
   * hours bought, tracked, or reserved for the client.
   */
  referenceHours: number;
};

export const CAPACITY_BLOCKS: Record<CapacityBlockId, CapacityBlockSize> = {
  flex: { id: "flex", name: "Flex", units: 1, referenceHours: 10 },
  core: { id: "core", name: "Core", units: 2, referenceHours: 20 },
  dedicated: { id: "dedicated", name: "Dedicated", units: 4, referenceHours: 40 },
};

/** The capacity units in one engineer's week: a full CapacityFigure. */
export const WEEK_UNITS = 4;

/*
 * A block card's left column, in px: the figure's width, and the width every
 * line's icon is centred in, so the figure and the icons under it share one
 * vertical axis. ICON_GAP (theme spacing) separates that column from the text.
 */
export const ICON_COLUMN = 24;
export const ICON_GAP = 1;

/** What capacity is, and the blocks it's sold in. */
export const CAPACITY_DOCS_URL = "https://readme.exalynt.com/how-it-works/engineering-capacity";

/** A number of units kept to a whole number from 0 to a week's. */
export function clampUnits(units: number): number {
  return Math.min(Math.max(Math.round(units), 0), WEEK_UNITS);
}

/**
 * A size in the words a client already uses, as a share of one engineer's
 * week rather than units or hours, with the fraction as its own character:
 * "About ½ of an engineer's week". Always shown muted, in `text.secondary`.
 */
export function capacitySize(units: number): string {
  return [
    "None of an engineer's week",
    "About ¼ of an engineer's week",
    "About ½ of an engineer's week",
    "About ¾ of an engineer's week",
    "About a full engineer's week",
  ][clampUnits(units)];
}

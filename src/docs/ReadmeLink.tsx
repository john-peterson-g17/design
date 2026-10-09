import Link from "@mui/material/Link";
import type { ReactNode } from "react";

const README_URL = "https://readme.exalynt.com";

/*
 * A link to a page of the readme, which is the one home for what stability
 * levels and maturity mean. These pages cover how to show them and link
 * there rather than repeating it. `path` is the page's path, with an
 * optional #anchor, e.g. "how-it-works/maturity#why-100-isnt-the-goal".
 */
export function ReadmeLink({ path, children }: { path: string; children: ReactNode }) {
  return (
    <Link href={`${README_URL}/${path}`} target="_blank" rel="noopener noreferrer">
      {children}
    </Link>
  );
}

import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";

export type MarkProps = SvgIconProps;

/** The Exalynt X, copied from the marketing site so both marks stay identical. */
export function Mark(props: MarkProps) {
  return (
    <SvgIcon viewBox="0 0 220 220" {...props}>
      <path d="M25 71 L58 71 L85 98 L68 116 Z" />
      <path d="M28 173 L57 173 L194 38 L162 38 Z" />
      <path d="M110 145 L127 129 L170 172 L137 172 Z" />
    </SvgIcon>
  );
}

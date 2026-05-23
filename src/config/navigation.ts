export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "#top" },
  { label: "Overview", href: "#overview" },
  { label: "The problem", href: "#problem" },
  { label: "Our solution", href: "#solution" },
  { label: "Preview", href: "#screenshots" },
  { label: "Screens", href: "#screens" },
  { label: "Tech", href: "#tech" },
  { label: "AI Architecture", href: "#ai-architecture" },
  { label: "Creators", href: "#made-by" },
  { label: "Contact", href: "#contact" },
];

/** Shown in the desktop top bar */
export const navBarLinks: NavLink[] = [
  { label: "Home", href: "#top" },
  { label: "Overview", href: "#overview" },
  { label: "Solution", href: "#solution" },
  { label: "Preview", href: "#screenshots" },
  { label: "Screens", href: "#screens" },
  { label: "Contact", href: "#contact" },
];

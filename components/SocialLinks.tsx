const LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/institute_im/",
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCHKTM1jaEmZSKZ5HFQJC-6g",
    path: (
      <>
        <path d="M22 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.5a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.5a2.5 2.5 0 0 0 1.8-1.8C22 15.2 22 12 22 12Z" />
        <path d="m10.2 9.2 4.8 2.8-4.8 2.8V9.2Z" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/datainformationinstitute",
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M7.2 10.4v6.2M7.2 7.6v.1M11.2 16.6v-6.2M11.2 13.1c0-1.5.9-2.4 2.2-2.4s2.2.9 2.2 2.6v3.3" />
      </>
    ),
  },
];

export default function SocialLinks({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const styles =
    tone === "light"
      ? "border-white/25 bg-white/5 text-white hover:border-white/70 hover:bg-white/15"
      : "border-hairline bg-white/60 text-navy hover:border-navy/40 hover:bg-white";

  return (
    <ul className="flex items-center gap-3">
      {LINKS.map((link) => (
        <li key={link.name}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`IMI on ${link.name} (opens in a new tab)`}
            className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-200 ${styles}`}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              className="h-[22px] w-[22px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {link.path}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

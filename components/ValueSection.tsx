const PILLARS = [
  {
    title: "Certification",
    body: "Validate and demonstrate your Data & Information Management expertise.",
    tint: "bg-frenchpass",
    icon: (
      <>
        <circle cx="12" cy="8.8" r="5.3" />
        <path d="m8.3 12.9-1.5 7 5.2-2.6 5.2 2.6-1.5-7" />
        <path d="m9.7 8.8 1.7 1.7 3-3.2" />
      </>
    ),
  },
  {
    title: "Learning",
    body: "Build practical, relevant and lasting professional skills.",
    tint: "bg-tangerine/45",
    icon: (
      <>
        <path d="M12 7.2C10.4 5.6 8.2 5 4.5 5v12c3.7 0 5.9.6 7.5 2.2 1.6-1.6 3.8-2.2 7.5-2.2V5c-3.7 0-5.9.6-7.5 2.2Z" />
        <path d="M12 7.2v12" />
      </>
    ),
  },
  {
    title: "Community",
    body: "Connect with a global network of Data & Information Management professionals.",
    tint: "bg-rose/70",
    icon: (
      <>
        <circle cx="9" cy="8.5" r="3.2" />
        <path d="M3.5 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
        <path d="M16 5.6a3.2 3.2 0 0 1 0 5.8M17.2 14.9c2 .6 3.3 2.4 3.3 4.6" />
      </>
    ),
  },
];

export default function ValueSection() {
  return (
    <section aria-labelledby="value-heading" className="border-y border-hairline bg-alabaster/60">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <p className="text-xs font-bold tracking-[0.22em] text-brand-red uppercase">What IMI represents</p>
        <h2
          id="value-heading"
          className="mt-5 max-w-4xl text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.2] font-bold tracking-[-0.015em] text-balance text-navy"
        >
          The world’s leading home for Data &amp; Information Management certification, community and
          learning.
        </h2>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <li
              key={pillar.title}
              className="rounded-2xl border border-hairline bg-white p-8 transition-transform duration-200 hover:-translate-y-1"
            >
              <span
                aria-hidden="true"
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${pillar.tint}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8 text-navy"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {pillar.icon}
                </svg>
              </span>
              <h3 className="mt-7 text-sm font-bold tracking-[0.16em] text-navy uppercase">{pillar.title}</h3>
              <p className="font-body mt-3 text-lg leading-relaxed text-navy-muted">{pillar.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

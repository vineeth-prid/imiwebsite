import Image from "next/image";
import SocialLinks from "./SocialLinks";
import WaitlistForm from "./WaitlistForm";

export default function FinalCTA() {
  return (
    <section aria-labelledby="join-heading" className="relative overflow-hidden bg-navy text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-40%] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-cta-to/15 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <h2
              id="join-heading"
              className="text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.06] font-extrabold tracking-[-0.02em] text-balance"
            >
              Join IMI
            </h2>
            <p className="mt-4 text-[clamp(1.15rem,2.4vw,1.6rem)] leading-snug font-medium text-balance text-white/80">
              Your HOME For Data &amp; Information Management.
            </p>
          </div>

          <div>
            <p className="font-body mb-4 text-white/70">Be the first to know when IMI launches.</p>
            <WaitlistForm tone="dark" />
          </div>
        </div>

        <footer className="mt-20 flex flex-col gap-8 border-t border-white/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4">
            <Image
              src="/imi-logo-light.png"
              alt="Information Management Institute"
              width={804}
              height={312}
              className="h-12 w-auto"
            />
            <p className="font-body text-sm text-white/55">
              © {new Date().getFullYear()} Information Management Institute
            </p>
          </div>
          <nav aria-label="IMI social media">
            <SocialLinks tone="light" />
          </nav>
        </footer>
      </div>
    </section>
  );
}

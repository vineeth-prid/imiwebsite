import Image from "next/image";
import SocialLinks from "./SocialLinks";
import WaitlistForm from "./WaitlistForm";

export default function Hero() {
  return (
    // Soft light bloom behind the artwork, matching the reference design.
    <header
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(125% 105% at 76% 34%, #FCFCFE 0%, #F7F8FB 38%, #F2F3F8 68%, #EFF0F6 100%)",
      }}
    >

      <div className="relative mx-auto w-full max-w-[1440px] px-6 pt-8 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between gap-6">
          <Image
            src="/imi-logo.png"
            alt="Information Management Institute"
            width={804}
            height={312}
            priority
            className="h-14 w-auto sm:h-16"
          />
          <nav aria-label="IMI social media">
            <SocialLinks tone="dark" />
          </nav>
        </div>

        <div className="grid items-center gap-10 pt-10 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-6 lg:pt-4 lg:pb-10">
          <div className="imi-rise order-2 max-w-[620px] lg:order-1">
            <h1 className="text-[clamp(2.4rem,6.2vw,4.35rem)] leading-[1.05] font-extrabold tracking-[-0.02em] text-balance text-navy">
              Your HOME For
              <br />
              Data &amp; Information
              <br />
              Management
            </h1>

            <p className="mt-6 flex items-center gap-3 text-sm font-bold tracking-[0.16em] text-brand-red uppercase sm:text-base">
              <span aria-hidden="true" className="h-px w-6 bg-brand-red" />
              Launching Soon
              <span aria-hidden="true" className="h-px w-6 bg-brand-red" />
            </p>

            <p className="font-body mt-6 max-w-lg text-lg text-navy-muted">
              Be the first to know when IMI launches.
            </p>

            <div className="mt-5">
              <WaitlistForm />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Image
              src="/imi-hero.png"
              alt="Illustration of an AI figure surrounded by the IMI pillars: learning, certification, resources and consultation."
              width={836}
              height={804}
              priority
              className="mx-auto h-auto w-full max-w-[560px] lg:max-w-none"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

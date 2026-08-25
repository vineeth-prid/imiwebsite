import Image from "next/image";
import AdminTable from "@/components/AdminTable";
import LogoutButton from "./LogoutButton";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata = { title: "IMI Admin", robots: { index: false, follow: false } };

export default async function AdminPage() {
  const [leads, total] = await Promise.all([
    prisma.waitlistLead.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.waitlistLead.count(),
  ]);

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12 sm:py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Image src="/imi-logo.png" alt="" width={804} height={312} className="h-9 w-auto" />
          <h1 className="text-2xl font-bold tracking-[-0.01em] text-navy">IMI Admin</h1>
        </div>
        <LogoutButton />
      </div>

      <section className="mt-10 rounded-2xl border border-hairline bg-white p-8">
        <h2 className="text-xs font-bold tracking-[0.2em] text-navy-muted uppercase">Waitlist</h2>
        <p className="mt-3 text-5xl font-extrabold tracking-[-0.02em] text-navy">
          {total.toLocaleString("en-GB")}
        </p>
        <p className="font-body mt-1 text-navy-muted">{total === 1 ? "person" : "people"}</p>
      </section>

      <div className="mt-8">
        <a
          href="/api/admin/export"
          download
          className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cta-from to-cta-to px-6 py-3 text-sm font-bold tracking-[0.06em] text-white uppercase transition-opacity hover:opacity-90"
        >
          Download CSV
        </a>
      </div>

      <section className="mt-8 overflow-hidden rounded-2xl border border-hairline bg-white">
        <AdminTable leads={leads} />
      </section>
    </main>
  );
}

import { prisma } from "@/lib/db";

// Guards against CSV formula injection when the file is opened in a spreadsheet.
function csvCell(value: string): string {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET() {
  const leads = await prisma.waitlistLead.findMany({
    orderBy: { createdAt: "desc" },
    select: { email: true, createdAt: true },
  });

  const csv = [
    "email,createdAt",
    ...leads.map((lead) => `${csvCell(lead.email)},${csvCell(lead.createdAt.toISOString())}`),
  ].join("\r\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="imi-waitlist.csv"',
      "Cache-Control": "no-store",
    },
  });
}

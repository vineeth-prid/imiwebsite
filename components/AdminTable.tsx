const formatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "UTC",
});

export default function AdminTable({ leads }: { leads: { id: string; email: string; createdAt: Date }[] }) {
  if (leads.length === 0) {
    return <p className="font-body px-6 py-10 text-navy-muted">No one has joined the waitlist yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[420px] border-collapse text-left">
        <caption className="sr-only">IMI waitlist registrations, newest first</caption>
        <thead>
          <tr className="border-b border-hairline">
            <th scope="col" className="px-6 py-4 text-xs font-bold tracking-[0.14em] text-navy-muted uppercase">
              Email
            </th>
            <th scope="col" className="px-6 py-4 text-xs font-bold tracking-[0.14em] text-navy-muted uppercase">
              Joined
            </th>
          </tr>
        </thead>
        <tbody className="font-body">
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b border-hairline/60 last:border-0">
              <td className="px-6 py-4 break-all text-navy">{lead.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-navy-muted">
                <time dateTime={lead.createdAt.toISOString()}>{formatter.format(lead.createdAt)} UTC</time>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

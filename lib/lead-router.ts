// Round-robin loan officer assignment, weighted by current open-lead load.
// Picks the active loan officer with the fewest leads in {new, contacted}.
import { db } from "@/lib/db";
import { loanOfficers, leads } from "@/lib/db/schema";
import { and, eq, inArray, sql } from "drizzle-orm";

export async function pickLoanOfficer(): Promise<{ id: number; name: string } | null> {
  try {
    const officers = await db
      .select({ id: loanOfficers.id, name: loanOfficers.name })
      .from(loanOfficers)
      .where(eq(loanOfficers.isActive, true));

    if (officers.length === 0) return null;

    const counts = await db
      .select({ officerId: leads.assignedOfficerId, count: sql<number>`count(*)::int` })
      .from(leads)
      .where(inArray(leads.status, ["new", "contacted"]))
      .groupBy(leads.assignedOfficerId);

    const countMap = new Map<number, number>();
    for (const row of counts) {
      if (row.officerId !== null) countMap.set(row.officerId, row.count);
    }

    const sorted = [...officers].sort((a, b) => {
      const ca = countMap.get(a.id) ?? 0;
      const cb = countMap.get(b.id) ?? 0;
      if (ca !== cb) return ca - cb;
      return a.id - b.id;
    });

    return sorted[0];
  } catch (err) {
    console.error("[lead-router] pickLoanOfficer failed:", err);
    return null;
  }
  // and is imported above; kept to silence unused-import lint while preserving
  // intent if a future caller filters by additional officer criteria.
  void and;
}

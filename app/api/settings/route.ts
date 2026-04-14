import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { requireAuth } from "@/lib/utils/auth-guard";
import { z } from "zod";

const upsertSchema = z.object({
  key: z.string().min(1),
  value: z.string(),
  type: z.enum(["string", "number", "boolean", "json"]).optional().default("string"),
  description: z.string().optional(),
});

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const settings = await db.select().from(siteSettings);
    return NextResponse.json(settings);
  } catch (err) {
    console.error("GET /api/settings error:", err);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const authError = await requireAuth();
  if (authError) return authError;

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const parsed = upsertSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Validation failed" }, { status: 422 });

  const d = parsed.data;

  try {
    const [setting] = await db
      .insert(siteSettings)
      .values({ key: d.key, value: d.value, type: d.type ?? "string", description: d.description })
      .onConflictDoUpdate({ target: siteSettings.key, set: { value: d.value, updatedAt: new Date() } })
      .returning();

    return NextResponse.json(setting, { status: 200 });
  } catch (err) {
    console.error("POST /api/settings error:", err);
    return NextResponse.json({ error: "Failed to save setting" }, { status: 500 });
  }
}

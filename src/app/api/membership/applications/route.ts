import { NextResponse } from "next/server";
import { query, initDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await requireAuth(["committee", "admin"]);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    await initDb();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let sql = `SELECT * FROM membership_applications ORDER BY created_at DESC`;
    let params: any[] = [];

    if (status && ["pending", "approved", "rejected"].includes(status)) {
      sql = `SELECT * FROM membership_applications WHERE status = $1 ORDER BY created_at DESC`;
      params = [status];
    }

    const applications = await query(sql, params);
    return NextResponse.json({ success: true, applications });
  } catch (error: any) {
    console.error("Fetch Applications Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch applications." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await requireAuth(["committee", "admin"]);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    await initDb();
    const body = await request.json();
    const { id, status, reviewNotes } = body;

    if (!id || !["pending", "approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Valid ID and status (pending, approved, rejected) are required." },
        { status: 400 }
      );
    }

    const updated = await query(
      `UPDATE membership_applications 
       SET status = $1, review_notes = $2, reviewed_by = $3, updated_at = CURRENT_TIMESTAMP
       WHERE id = $4
       RETURNING *`,
      [status, reviewNotes || null, session.name, id]
    );

    if (updated.length === 0) {
      return NextResponse.json({ error: "Application not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      application: updated[0],
      message: `Application marked as ${status}.`,
    });
  } catch (error: any) {
    console.error("Update Application Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update application." },
      { status: 500 }
    );
  }
}

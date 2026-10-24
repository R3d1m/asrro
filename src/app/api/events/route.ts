import { NextResponse } from "next/server";
import { query, initDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  try {
    await initDb();
    const events = await query(
      `SELECT * FROM events ORDER BY id DESC`
    );
    return NextResponse.json({ success: true, events });
  } catch (error: any) {
    console.error("Fetch Events Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch events." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAuth(["committee", "admin"]);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    await initDb();
    const body = await request.json();
    const {
      title,
      category = "Workshop",
      date,
      time = "",
      venue,
      description,
      registrationLink = "",
      imageUrl = "",
      status = "published",
    } = body;

    if (!title || !date || !venue || !description) {
      return NextResponse.json(
        { error: "Title, date, venue, and description are required." },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") + "-" + Date.now().toString().slice(-4);

    const inserted = await query(
      `INSERT INTO events (title, slug, category, date, time, venue, description, registration_link, image_url, status, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        title.trim(),
        slug,
        category.trim(),
        date.trim(),
        time.trim(),
        venue.trim(),
        description.trim(),
        registrationLink.trim(),
        imageUrl.trim(),
        status,
        session.name,
      ]
    );

    return NextResponse.json({
      success: true,
      event: inserted[0],
      message: "Event created and published successfully.",
    });
  } catch (error: any) {
    console.error("Create Event Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create event." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await requireAuth(["committee", "admin"]);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    await initDb();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Event ID is required." }, { status: 400 });
    }

    await query("DELETE FROM events WHERE id = $1", [id]);
    return NextResponse.json({ success: true, message: "Event deleted successfully." });
  } catch (error: any) {
    console.error("Delete Event Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete event." },
      { status: 500 }
    );
  }
}

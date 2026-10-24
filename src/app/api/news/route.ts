import { NextResponse } from "next/server";
import { query, initDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  try {
    await initDb();
    const news = await query(
      `SELECT * FROM press_news ORDER BY id DESC`
    );
    return NextResponse.json({ success: true, news });
  } catch (error: any) {
    console.error("Fetch News Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch news." },
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
    const { title, source, url, date, snippet, imageUrl = "", category = "National Press" } = body;

    if (!title || !source || !url || !date || !snippet) {
      return NextResponse.json(
        { error: "Title, source, URL, date, and snippet are required." },
        { status: 400 }
      );
    }

    const inserted = await query(
      `INSERT INTO press_news (title, source, url, date, snippet, image_url, category, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [title.trim(), source.trim(), url.trim(), date.trim(), snippet.trim(), imageUrl.trim(), category.trim(), session.name]
    );

    return NextResponse.json({
      success: true,
      newsItem: inserted[0],
      message: "Press news article published successfully.",
    });
  } catch (error: any) {
    console.error("Create News Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to publish news article." },
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
      return NextResponse.json({ error: "Article ID is required." }, { status: 400 });
    }

    await query("DELETE FROM press_news WHERE id = $1", [id]);
    return NextResponse.json({ success: true, message: "Article deleted successfully." });
  } catch (error: any) {
    console.error("Delete News Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete article." },
      { status: 500 }
    );
  }
}

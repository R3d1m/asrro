import { NextResponse } from "next/server";
import { query, initDb } from "@/lib/db";
import { hashPassword, setSessionCookie, UserSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await initDb();
    const body = await request.json();
    const { name, email, password, role = "alumni", alumniId, department, batch } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existing = await query("SELECT id FROM users WHERE email = $1", [cleanEmail]);
    if (existing.length > 0) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const inserted = await query<UserSession>(
      `INSERT INTO users (name, email, password_hash, role, alumni_id, department, batch)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, name, email, role, alumni_id as "alumniId", department, batch`,
      [name, cleanEmail, passwordHash, role, alumniId || null, department || null, batch || null]
    );

    const user = inserted[0];
    await setSessionCookie(user);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        alumniId: user.alumniId,
      },
    });
  } catch (error: any) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during registration." },
      { status: 500 }
    );
  }
}

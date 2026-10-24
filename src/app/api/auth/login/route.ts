import { NextResponse } from "next/server";
import { query, initDb } from "@/lib/db";
import { verifyPassword, setSessionCookie, UserSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await initDb();
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    const users = await query<{
      id: number;
      name: string;
      email: string;
      password_hash: string;
      role: "admin" | "committee" | "alumni" | "member";
      alumni_id?: string;
      department?: string;
      batch?: string;
    }>("SELECT * FROM users WHERE email = $1", [cleanEmail]);

    if (users.length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const user = users[0];
    const passwordMatch = await verifyPassword(password, user.password_hash);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const session: UserSession = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      alumniId: user.alumni_id,
      department: user.department,
      batch: user.batch,
    };

    await setSessionCookie(session);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        alumniId: user.alumni_id,
      },
    });
  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during login." },
      { status: 500 }
    );
  }
}

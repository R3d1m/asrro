import { NextResponse } from "next/server";
import { query, initDb } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    await initDb();
    const { searchParams } = new URL(request.url);
    const alumniId = searchParams.get("id");

    if (alumniId) {
      const rows = await query("SELECT * FROM alumni_profiles WHERE id = $1", [alumniId]);
      if (rows.length === 0) {
        return NextResponse.json({ error: "Alumnus not found." }, { status: 404 });
      }
      return NextResponse.json({ success: true, profile: rows[0] });
    }

    // Check if authenticated alumnus requesting their own profile
    const session = await getSession();
    if (session && session.alumniId) {
      const rows = await query("SELECT * FROM alumni_profiles WHERE id = $1", [session.alumniId]);
      if (rows.length > 0) {
        return NextResponse.json({ success: true, profile: rows[0], isOwner: true });
      }
    }

    // Otherwise return all profiles from database
    const all = await query("SELECT * FROM alumni_profiles ORDER BY id ASC");
    return NextResponse.json({ success: true, alumni: all });
  } catch (error: any) {
    console.error("Get Alumni Profile Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch alumni data." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getSession();
    if (!session || (session.role !== "alumni" && session.role !== "admin")) {
      return NextResponse.json({ error: "Unauthorized. Please log in as an alumnus." }, { status: 401 });
    }

    await initDb();
    const body = await request.json();
    const {
      id,
      name,
      department,
      academicSession,
      batch,
      graduationYear,
      positionInCommittee,
      currentWorkplace,
      higherStudies,
      researchInterests = [],
      aboutMe,
      researchGate,
      googleScholar,
      image,
    } = body;

    const targetId = session.role === "admin" ? (id || session.alumniId) : session.alumniId;

    if (!targetId) {
      return NextResponse.json({ error: "Alumni profile identifier is missing." }, { status: 400 });
    }

    const updated = await query(
      `UPDATE alumni_profiles
       SET name = COALESCE($1, name),
           department = COALESCE($2, department),
           academic_session = COALESCE($3, academic_session),
           batch = COALESCE($4, batch),
           graduation_year = COALESCE($5, graduation_year),
           position_in_committee = COALESCE($6, position_in_committee),
           current_workplace = COALESCE($7, current_workplace),
           higher_studies = COALESCE($8, higher_studies),
           research_interests = COALESCE($9, research_interests),
           about_me = COALESCE($10, about_me),
           research_gate = COALESCE($11, research_gate),
           google_scholar = COALESCE($12, google_scholar),
           image = COALESCE($13, image),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $14
       RETURNING *`,
      [
        name,
        department,
        academicSession,
        batch,
        graduationYear,
        positionInCommittee,
        currentWorkplace,
        higherStudies,
        researchInterests,
        aboutMe,
        researchGate,
        googleScholar,
        image,
        targetId,
      ]
    );

    if (updated.length === 0) {
      return NextResponse.json({ error: "Profile not found or could not be updated." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      profile: updated[0],
      message: "Alumni profile updated successfully.",
    });
  } catch (error: any) {
    console.error("Update Alumni Profile Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update profile." },
      { status: 500 }
    );
  }
}

import { Pool, neon } from "@neondatabase/serverless";
import { alumniData } from "@/data/alumniData";

const connectionString = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || "";

// Neon connection pool for standard parameterized queries
let pool: Pool | null = null;

if (connectionString) {
  pool = new Pool({
    connectionString,
  });
}

export function isDbConfigured(): boolean {
  return Boolean(connectionString && pool !== null);
}

export async function query<T = any>(text: string, params?: any[]): Promise<T[]> {
  if (!pool) {
    if (!connectionString) {
      console.warn("⚠️ DATABASE_URL is not set. Database query skipped.");
      return [];
    }
    pool = new Pool({ connectionString });
  }

  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows as T[];
  } finally {
    client.release();
  }
}

// Auto-initialize schema and seed initial alumni if empty
let schemaInitialized = false;

export async function initDb(): Promise<boolean> {
  if (schemaInitialized || !isDbConfigured()) return false;

  try {
    // 1. Users table (for Committee, Admin, Alumni, Members)
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'alumni',
        alumni_id VARCHAR(100),
        department VARCHAR(100),
        batch VARCHAR(50),
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Membership Applications table
    await query(`
      CREATE TABLE IF NOT EXISTS membership_applications (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        student_id VARCHAR(100) NOT NULL,
        department VARCHAR(100) NOT NULL,
        batch VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        subteam VARCHAR(100) NOT NULL,
        skills TEXT,
        motivation TEXT,
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        review_notes TEXT,
        reviewed_by VARCHAR(255),
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Events table
    await query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        category VARCHAR(100) NOT NULL DEFAULT 'Workshop',
        date VARCHAR(100) NOT NULL,
        time VARCHAR(100),
        venue VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        registration_link VARCHAR(500),
        image_url VARCHAR(500),
        status VARCHAR(50) NOT NULL DEFAULT 'published',
        created_by VARCHAR(255),
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Press & News table
    await query(`
      CREATE TABLE IF NOT EXISTS press_news (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        source VARCHAR(255) NOT NULL,
        url VARCHAR(500) NOT NULL,
        date VARCHAR(100) NOT NULL,
        snippet TEXT NOT NULL,
        image_url VARCHAR(500),
        category VARCHAR(100) NOT NULL DEFAULT 'National Press',
        created_by VARCHAR(255),
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 5. Alumni Profiles table
    await query(`
      CREATE TABLE IF NOT EXISTS alumni_profiles (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        department VARCHAR(255) NOT NULL,
        academic_session VARCHAR(50),
        batch VARCHAR(50) NOT NULL,
        graduation_year VARCHAR(50),
        position_in_committee VARCHAR(100),
        current_workplace VARCHAR(255),
        higher_studies VARCHAR(255),
        research_interests TEXT[],
        about_me TEXT,
        research_gate VARCHAR(500),
        google_scholar VARCHAR(500),
        image VARCHAR(500),
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed alumni if table is empty
    const existingAlumni = await query(`SELECT COUNT(*) as count FROM alumni_profiles`);
    if (existingAlumni.length > 0 && parseInt(existingAlumni[0].count, 10) === 0) {
      console.log("🌱 Seeding initial 19 alumni records into Neon DB...");
      for (const a of alumniData) {
        await query(
          `INSERT INTO alumni_profiles (
            id, name, department, academic_session, batch, graduation_year,
            position_in_committee, current_workplace, higher_studies,
            research_interests, about_me, research_gate, google_scholar, image
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
          ON CONFLICT (id) DO NOTHING`,
          [
            a.id,
            a.name,
            a.department,
            a.academicSession || "",
            a.batch,
            a.graduationYear || "",
            a.positionInCommittee || "",
            a.currentWorkplace || "",
            a.higherStudies || "",
            a.researchInterests || [],
            a.aboutMe || "",
            a.researchGate || "",
            a.googleScholar || "",
            a.image || "",
          ]
        );
      }
      console.log("✅ Seeded initial alumni successfully.");
    }

    schemaInitialized = true;
    return true;
  } catch (error) {
    console.error("❌ Failed to initialize database schema:", error);
    return false;
  }
}

import nodemailer from "nodemailer";

interface ApplicantEmailData {
  fullName: string;
  email: string;
  studentId: string;
  department: string;
  batch: string;
  subteam: string;
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendMembershipConfirmationEmail(applicant: ApplicantEmailData): Promise<boolean> {
  const transporter = getTransporter();
  const fromAddress = process.env.SMTP_FROM || `"${process.env.SMTP_FROM_NAME || "ASRRO CUET"}" <${process.env.SMTP_USER || "contact@asrrocuetbd.org"}>`;

  if (!transporter) {
    console.log(`📧 [MOCK EMAIL DISPATCH] To: ${applicant.email} | Subject: Membership Application Received — ASRRO CUET`);
    console.log(`Applicant: ${applicant.fullName} (${applicant.studentId}) | Subteam: ${applicant.subteam}`);
    return true;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #030712; color: #ffffff; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #090d1a; border: 1px solid #1f293d; border-radius: 8px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #090d1a 0%, #111827 100%); padding: 32px 24px; border-bottom: 2px solid #f59e0b; text-align: center; }
        .logo-text { font-size: 26px; font-weight: 900; letter-spacing: 2px; color: #ffffff; text-transform: uppercase; margin: 0; }
        .badge { display: inline-block; font-size: 11px; font-family: monospace; font-weight: bold; background-color: #f59e0b; color: #000000; padding: 4px 10px; margin-top: 8px; text-transform: uppercase; letter-spacing: 1px; }
        .content { padding: 32px 24px; color: #d1d5db; line-height: 1.6; }
        .greeting { font-size: 18px; color: #ffffff; font-weight: bold; margin-bottom: 16px; }
        .card { background-color: #030712; border: 1px solid #1f2937; padding: 18px; border-radius: 6px; margin: 20px 0; font-family: monospace; font-size: 13px; }
        .card-row { display: flex; justify-content: space-between; margin-bottom: 8px; border-bottom: 1px solid #111827; padding-bottom: 6px; }
        .card-label { color: #9ca3af; text-transform: uppercase; font-size: 11px; }
        .card-value { color: #f59e0b; font-weight: bold; }
        .steps { background-color: #0c1222; border-left: 3px solid #38bdf8; padding: 16px; margin: 24px 0; border-radius: 4px; font-size: 13px; }
        .steps-title { color: #38bdf8; font-weight: bold; margin-bottom: 8px; font-family: monospace; text-transform: uppercase; }
        .footer { padding: 24px; text-align: center; font-size: 12px; color: #6b7280; font-family: monospace; border-top: 1px solid #1f2937; }
        .footer-link { color: #f59e0b; text-decoration: none; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="logo-text">ASRRO CUET</h1>
          <span class="badge">NASA GLOBAL SPACE CHALLENGE WORLD CHAMPION</span>
        </div>
        
        <div class="content">
          <div class="greeting">Greetings, ${applicant.fullName}!</div>
          
          <p>Thank you for applying to join the <strong>Andromeda Space & Robotics Research Organization (ASRRO)</strong> at Chittagong University of Engineering & Technology (CUET).</p>
          
          <p>Your application dossier has been successfully recorded in our central research admissions database.</p>
          
          <div class="card">
            <div style="font-weight: bold; color: #ffffff; margin-bottom: 12px; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; border-bottom: 1px solid #374151; padding-bottom: 4px;">// Application Telemetry Snapshot</div>
            <div><span class="card-label">Applicant Name:</span> <span class="card-value">${applicant.fullName}</span></div>
            <div style="margin-top: 6px;"><span class="card-label">Student ID:</span> <span class="card-value">${applicant.studentId}</span></div>
            <div style="margin-top: 6px;"><span class="card-label">Department:</span> <span class="card-value">${applicant.department} (Batch '${applicant.batch})</span></div>
            <div style="margin-top: 6px;"><span class="card-label">Assigned Subteam:</span> <span class="card-value">${applicant.subteam}</span></div>
            <div style="margin-top: 6px;"><span class="card-label">Application Status:</span> <span class="card-value" style="color: #38bdf8;">PENDING COMMITTEE REVIEW</span></div>
          </div>
          
          <div class="steps">
            <div class="steps-title">// Next Steps & Recruitment Protocol:</div>
            <ol style="margin: 0; padding-left: 20px; color: #9ca3af;">
              <li style="margin-bottom: 8px;"><strong style="color: #ffffff;">Technical Evaluation:</strong> Our Executive Committee and Wing Leads will evaluate your submission, domain preferences, and skill profile.</li>
              <li style="margin-bottom: 8px;"><strong style="color: #ffffff;">Recruitment Interview & Task:</strong> Shortlisted candidates will be invited for an interactive domain interview or orientation workshop.</li>
              <li><strong style="color: #ffffff;">Onboarding:</strong> Accepted recruits will be inducted into active R&D squads across sounding rocketry, autonomous UAVs, rovers, and astrophotography.</li>
            </ol>
          </div>
          
          <p style="font-size: 13px; color: #9ca3af;">Please ensure you keep an eye on your email inbox and join our official social community channels for updates.</p>
        </div>
        
        <div class="footer">
          <div>Andromeda Space & Robotics Research Organization</div>
          <div>Chittagong University of Engineering & Technology (CUET), Raozan, Bangladesh</div>
          <div style="margin-top: 10px;">
            <a href="https://asrrocuetbd.org" class="footer-link">Official Portal</a> • 
            <a href="mailto:contact@asrrocuetbd.org" class="footer-link">Contact Desk</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: fromAddress,
      to: applicant.email,
      subject: "Application Received: Welcome to ASRRO CUET Recruitment",
      html: htmlContent,
    });
    console.log(`✅ Automated confirmation email dispatched to ${applicant.email}`);
    return true;
  } catch (error) {
    console.error("❌ Failed to send confirmation email:", error);
    return false;
  }
}

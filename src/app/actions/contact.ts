"use server";

import nodemailer from 'nodemailer';

export async function sendContactEmail(formData: {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
}) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.error("SMTP configuration is missing in environment variables");
    return { 
      success: false, 
      error: "Email service is not configured yet. (Missing SMTP credentials in .env)" 
    };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(smtpPort || '587'),
    secure: smtpPort === '465',
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const { name, email, company, budget, message } = formData;
  const date = new Date().toLocaleString('en-US', { 
    year: 'numeric', month: 'numeric', day: 'numeric', 
    hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true 
  });

  try {
    const logoUrl = "https://adsgrind.com/logo/2ccbcd53-e176-41fc-b3cb-70c3f0620511.jpg";
    
    // 1. Admin Email Template (Dark & Professional)
    const adminHtml = `
      <div style="font-family: 'Inter', Arial, sans-serif; background-color: #050505; color: #fff; padding: 60px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #0a0a0a; border: 1px solid rgba(255,255,255,0.05); border-radius: 32px; overflow: hidden; box-shadow: 0 40px 100px rgba(0,0,0,0.8);">
          <div style="background: linear-gradient(135deg, #EE1D23 0%, #F15A24 100%); padding: 40px; text-align: center;">
            <img src="${logoUrl}" alt="Adsgrind" style="width: 80px; height: 80px; border-radius: 20px; margin-bottom: 20px; border: 2px solid rgba(255,255,255,0.2);" />
            <h1 style="margin: 0; font-size: 24px; font-weight: 900; text-transform: uppercase; font-style: italic; letter-spacing: 2px; color: #fff;">New Lead Captured</h1>
          </div>
          <div style="padding: 40px;">
            <p style="color: rgba(255,255,255,0.5); text-transform: uppercase; font-size: 10px; font-weight: 900; letter-spacing: 2px; margin-bottom: 30px;">Campaign Intelligence Report</p>
            
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 24px; padding: 30px; margin-bottom: 30px;">
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr><td style="padding: 10px 0; color: rgba(255,255,255,0.4); font-size: 12px; text-transform: uppercase;">Founder/Lead</td><td style="padding: 10px 0; color: #fff; font-weight: bold; text-align: right;">${name}</td></tr>
                <tr><td style="padding: 10px 0; color: rgba(255,255,255,0.4); font-size: 12px; text-transform: uppercase;">Company</td><td style="padding: 10px 0; color: #fff; font-weight: bold; text-align: right;">${company}</td></tr>
                <tr><td style="padding: 10px 0; color: rgba(255,255,255,0.4); font-size: 12px; text-transform: uppercase;">Email</td><td style="padding: 10px 0; color: #EE1D23; font-weight: bold; text-align: right;">${email}</td></tr>
                <tr><td style="padding: 10px 0; color: rgba(255,255,255,0.4); font-size: 12px; text-transform: uppercase;">Budget</td><td style="padding: 10px 0; color: #4ADE80; font-weight: bold; text-align: right;">${budget}</td></tr>
              </table>
            </div>

            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 24px; padding: 30px;">
              <p style="color: rgba(255,255,255,0.4); font-size: 10px; text-transform: uppercase; margin-bottom: 15px;">Growth Objectives:</p>
              <div style="color: #fff; line-height: 1.8; font-size: 15px;">${message}</div>
            </div>
          </div>
          <div style="padding: 30px; text-align: center; color: rgba(255,255,255,0.2); font-size: 10px; border-top: 1px solid rgba(255,255,255,0.05);">
            SENT VIA ADSGRIND INTELLIGENCE ENGINE v2.0
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Adsgrind Form" <${smtpUser}>`,
      to: 'business@adsgrind.com',
      subject: `🔥 New Lead: ${company} - ${name}`,
      html: adminHtml,
    });

    // 2. User Auto-Response Template (Premium Dark Branding)
    const userHtml = `
      <div style="font-family: 'Inter', Arial, sans-serif; background-color: #050505; color: #fff; padding: 60px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #0a0a0a; border: 1px solid rgba(255,255,255,0.05); border-radius: 40px; overflow: hidden; box-shadow: 0 40px 100px rgba(0,0,0,0.8);">
          <div style="background: linear-gradient(135deg, #EE1D23 0%, #F15A24 100%); padding: 80px 40px; text-align: center; position: relative;">
            <img src="${logoUrl}" alt="Adsgrind" style="width: 100px; height: 100px; border-radius: 24px; margin-bottom: 24px; border: 3px solid rgba(255,255,255,0.3); box-shadow: 0 20px 40px rgba(0,0,0,0.4);" />
            <h1 style="margin: 0; font-size: 42px; font-weight: 900; color: #fff; font-style: italic; text-transform: uppercase; letter-spacing: -1px;">ADSGRIND</h1>
            <p style="margin: 10px 0 0 0; font-size: 14px; font-weight: 900; color: rgba(255,255,255,0.8); text-transform: uppercase; letter-spacing: 4px;">The App Growth</p>
          </div>
          
          <div style="padding: 60px 50px;">
            <h2 style="font-size: 32px; font-weight: 900; margin-bottom: 24px; color: #fff; font-style: italic;">HI ${name.toUpperCase()}!</h2>
            <p style="font-size: 18px; line-height: 1.8; color: rgba(255,255,255,0.7); margin-bottom: 40px;">
              Your request for a high-performance growth strategy has been received. Our engineering team is already analyzing your app's potential.
            </p>

            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 32px; padding: 40px; margin-bottom: 40px; position: relative;">
              <div style="color: #F15A24; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 24px;">Growth Submission Summary</div>
              <div style="margin-bottom: 15px; font-size: 16px;">
                <span style="color: rgba(255,255,255,0.4);">Strategy ID:</span>
                <span style="color: #fff; font-weight: bold; margin-left: 10px;">AG-${Math.floor(Math.random() * 900000) + 100000}</span>
              </div>
              <div style="font-size: 16px;">
                <span style="color: rgba(255,255,255,0.4);">Timestamp:</span>
                <span style="color: #fff; font-weight: bold; margin-left: 10px;">${date}</span>
              </div>
            </div>

            <p style="font-size: 15px; color: rgba(255,255,255,0.5); margin-bottom: 30px; text-align: center;">
              Expect a response from a Growth Architect within 24 hours.
            </p>

            <div style="text-align: center;">
              <a href="https://adsgrind.com" style="display: inline-block; background: #fff; color: #000; padding: 18px 40px; border-radius: 20px; text-decoration: none; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Visit Intelligence HQ</a>
            </div>
          </div>

          <div style="padding: 40px; text-align: center; background: #080808; border-top: 1px solid rgba(255,255,255,0.05);">
            <p style="color: rgba(255,255,255,0.3); font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">
              © 2026 ADSGRIND THE APP GROWTH • SCALE WITHOUT LIMITS
            </p>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Adsgrind Team" <${smtpUser}>`,
      to: email,
      subject: 'We received your inquiry - Adsgrind',
      html: userHtml,
    });

    return { success: true };
  } catch (error: any) {
    console.error('Nodemailer error:', error);
    return { success: false, error: `Failed to send email: ${error.message || 'Unknown error'}` };
  }
}

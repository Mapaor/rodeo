import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  const data = await request.json();
  const { name, email, project, message } = data;

  // Permet paràgrafs: converteix salts de línia en <br>
  const formattedMessage = message.replace(/\n/g, '<br>');

  // Configura el transport amb Zoho Mail
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu', // o smtp.zoho.com segons la regió
    port: 465,
    secure: true,
    auth: {
      user: 'marti@rodeostudio.net',
      pass: process.env.ZOHO_MAIL_PASS, // O al .env en local o com a variable d'entorn a Vercel
    },
  });

  try {
    await transporter.sendMail({
      from: '"Contacte Web" <marti@rodeostudio.net>',
      to: 'tots@rodeostudio.net',
      subject: `Missatge nou de ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background: linear-gradient(135deg, #e0e7ff 0%, #f7f7f9 100%); padding: 40px 0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 540px; margin: 0 auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,112,243,0.10); border: 2px solid #0070f3;">
            <tr>
              <td style="padding: 40px 40px 20px 40px; text-align: center;">
                <h2 style="margin: 0 0 12px 0; color: #0070f3; font-size: 2.1em; font-weight: 700; letter-spacing: 0.5px;">Nou missatge des de la web de Rodeo Studio</h2>
                <p style="margin: 0 0 20px 0; color: #888; font-size: 1.15em;">No responguis a aquest correu, és una notificació automàtica.</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 40px 32px 40px;">
                <div style="background: #e6f0ff; border-radius: 10px; padding: 32px 18px; text-align: center;">
                  <p style="margin: 0 0 18px 0; font-size: 1.25em; color: #222;"><strong style='font-size:1.1em;'>Nom del client:</strong><br><span style="color: #0070f3; font-size: 1.35em; font-weight: 600;">${name}</span></p>
                  <p style="margin: 0 0 18px 0; font-size: 1.25em; color: #222;"><strong style="font-size:1.1em;">Correu electrònic:</strong><br><span style="color: #0070f3; font-size: 1.15em; font-weight: 700;">${email}</span></p>
                  <p style="margin: 0 0 18px 0; font-size: 1.25em; color: #222;"><strong style='font-size:1.1em;'>Tipus de projecte:</strong><br><span style="color: #0070f3; font-size: 1.15em; font-weight: 600;">${project || '-'}</span></p>
                  <p style="margin: 0 0 18px 0; font-size: 1.25em; color: #222;"><strong style='font-size:1.1em;'>Missatge:</strong><br><span style="color: #222;">${formattedMessage}</span></p>
                  <a href="mailto:${email}" style="display: inline-block; margin-top: 18px; background: linear-gradient(90deg, #0070f3 60%, #0051a8 100%); color: #fff; font-size: 1.18em; font-weight: 600; padding: 12px 36px; border-radius: 8px; text-decoration: none; box-shadow: 0 2px 8px rgba(0,112,243,0.10); transition: background 0.2s;">✉️ Respondre Client</a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 40px 28px 40px; text-align: center; color: #aaa; font-size: 1.05em;">
                <p style="margin: 28px 0 0 0;">Aquest correu ha estat generat automàticament des de <a href="https://rodeostudio.net" style="color: #0070f3; text-decoration: none; font-weight: 500;">rodeostudio.net</a></p>
              </td>
            </tr>
          </table>
        </div>
      `,
      text: `Nou missatge des de la web de Rodeo Studio\nNo responguis a aquest correu.\n\nNom: ${name}\nCorreu: ${email}\nProjecte: ${project}\nMissatge:\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error enviant correu:', error);
    return NextResponse.json({ success: false, error: 'Error enviant correu' }, { status: 500 });
  }
}

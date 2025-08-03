import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from '../../components/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.json();
   console.log("BODY RECU 📨", body); // Ajoute ceci

  const { email, subject, message } = body;

  try {
    const { data, error } = await resend.emails.send({
      from: "TheFabStudio <onboarding@resend.dev>",
      to: ["chevallereaufab@gmail.com"],
      subject,
      react: EmailTemplate({ firstName: email, message }),
    });

    if (error) return NextResponse.json({ error }, { status: 400 });
  if (!email || !subject || !message) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

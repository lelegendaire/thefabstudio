import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, object, message, category } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // App password, pas votre mot de passe Gmail
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'thefabstudio2@gmail.com',
      replyTo: email,
      subject: `[${category}] ${object}`,
      html: `
        <h2>Nouveau message de ${email}</h2>
        <p><strong>Catégorie :</strong> ${category}</p>
        <p><strong>Objet :</strong> ${object}</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
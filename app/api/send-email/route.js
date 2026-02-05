import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Redis Upstash
const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"),
});

export async function POST(request) {
  try {
    // ✅ Rate limit par IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      "anonymous";

    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, object, message, category, website } = body;

    // ✅ Honeypot anti-bot
    if (website) {
      return NextResponse.json(
        { error: "Bot detected" },
        { status: 400 }
      );
    }

    // ✅ Validation basique
    if (
      !email ||
      !object ||
      !message ||
      message.length > 2000
    ) {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      );
    }

    // ✅ Nettoyage HTML simple
    const safeMessage = message
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "thefabstudio2@gmail.com",
      replyTo: email,
      subject: `[${category}] ${object}`,
      html: `
        <h2>Nouveau message de ${email}</h2>
        <p><strong>Catégorie :</strong> ${category}</p>
        <p><strong>Objet :</strong> ${object}</p>
        <p>${safeMessage}</p>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

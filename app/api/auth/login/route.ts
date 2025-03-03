import { NextRequest, NextResponse } from "next/server";

// Maneja POST para /api/auth/login
export async function POST(req: NextRequest) {
  const body = await req.json();
  const csrfToken = req.headers.get("x-csrf-token") as string;
  const backendUrl = process.env.BACKEND_URL || "http://localhost:4000";
  const cookies = req.cookies.getAll();
  try {
    const cookieHeader = cookies
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; "); // Construir cabecera Cookie

    const response = await fetch(`${backendUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
        Cookie: cookieHeader,
      },
      body: JSON.stringify(body),
      credentials: "include", // Para enviar y recibir cookies
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    const headers = new Headers();
    response.headers.forEach((value, key) => headers.set(key, value));

    return NextResponse.json(data, { headers });
  } catch (error) {
    return NextResponse.json({ message: "Login failed" }, { status: 401 });
  }
}

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const csrfToken = req.headers.get("x-csrf-token") as string;
  const backendUrl = process.env.BACKEND_URL || "http://localhost:4000";
  const cookies = req.cookies.getAll();
  console.log("csrfToken API REFRESH", csrfToken);
  console.log("Cookies in Refresh Request:", cookies);
  try {
    const cookieHeader = cookies
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; "); // Construir cabecera Cookie

    const response = await fetch(`${backendUrl}/auth/refresh`, {
      method: "POST",
      headers: { "X-CSRF-Token": csrfToken, Cookie: cookieHeader },
      credentials: "include",
    });

    console.log("response refresh", response);

    if (!response.ok) throw new Error("Refresh failed");

    const data = await response.json();
    const headers = new Headers();
    response.headers.forEach((value, key) => headers.set(key, value));

    return NextResponse.json(data, { headers });
  } catch (error) {
    return NextResponse.json({ message: "Refresh failed" }, { status: 401 });
  }
}

import { NextResponse } from "next/server";

export async function GET() {
  const backendUrl = process.env.BACKEND_URL || "http://localhost:4000";
  try {
    const response = await fetch(`${backendUrl}/auth/csrf`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });

    const data = await response.json();

    const headers = new Headers();
    response.headers.forEach((value, key) => {
      headers.set(key, value);
    });
    return NextResponse.json(data, { headers });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch CSRF" },
      { status: 500 }
    );
  }
}

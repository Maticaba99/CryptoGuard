import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Configurar nuevas cookies vacías o expiradas para limpiarlas
  const response = NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );

  // Limpiar access_token (HttpOnly: true)
  response.cookies.set("access_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0, // Expira inmediatamente
    path: "/",
  });

  // Limpiar refresh_token (HttpOnly: true)
  response.cookies.set("refresh_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0, // Expira inmediatamente
    path: "/",
  });

  // Limpiar _csrf (HttpOnly: false)
  response.cookies.set("_csrf", "", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0, // Expira inmediatamente
    path: "/",
  });

  return response;
}

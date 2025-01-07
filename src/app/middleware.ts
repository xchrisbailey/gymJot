import { Session } from "@/lib/auth";
import { betterFetch } from "@better-fetch/fetch";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  if (!session) return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [],
};

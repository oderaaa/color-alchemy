import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { loginLogic } from "@/server/controllers/auth/authControllers";
import { validateData } from "@/server/utils/validation";
import { LoginSchemaValidator } from "@/server/models/user/types";
import { cookieOptions } from "@/server/utils/jwt";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    // Validate input
    const validatedData = validateData(LoginSchemaValidator, body);

    // Execute business logic
    const result = await loginLogic(validatedData);

    // Create response with cookie
    const response = NextResponse.json({
      message: "Login successful",
      user: result.user,
    });

    response.cookies.set("accessToken", result.token, {
      ...cookieOptions,
      sameSite: "lax",
    });

    return response;
  } catch (err: any) {
    console.error("Login error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}

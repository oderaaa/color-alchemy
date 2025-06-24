import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { registerLogic } from "@/server/controllers/auth/authControllers";
import { validateData } from "@/server/utils/validation";
import { RegisterSchemaValidator } from "@/server/models/user/types";
import { cookieOptions } from "@/server/utils/jwt";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    // Validate input
    const validatedData = validateData(RegisterSchemaValidator, body);

    // Execute business logic
    const result = await registerLogic(validatedData);

    // Create response with cookie
    const response = NextResponse.json(
      { message: "User registered", user: result.user },
      { status: 201 }
    );

    response.cookies.set("accessToken", result.token, {
      ...cookieOptions,
      sameSite: "lax",
    });

    return response;
  } catch (err: any) {
    console.error("Registration error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

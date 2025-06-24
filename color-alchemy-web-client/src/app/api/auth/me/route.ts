import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { extractUserFromToken } from "@/server/utils/authHelper";
import UserModel from "@/server/models/user";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const cookieHeader = request.headers.get("cookie");
    const userPayload = extractUserFromToken(cookieHeader);

    if (userPayload.role === "guest") {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get fresh user data from database
    const user = await UserModel.findById(userPayload._id).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        stats: user.stats,
      },
    });
  } catch (err: any) {
    console.error("Auth check error:", err.message);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    );
  }
}

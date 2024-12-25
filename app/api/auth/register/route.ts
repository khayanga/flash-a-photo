import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
   
    const { name, email, password, role } = await req.json();

    // Validate required fields
    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const{password:newUserPassword, ...rest} = newUser;

    // Return the newly created user's details (excluding sensitive info)
    return NextResponse.json({user:rest , message: "User created successfully"}, {status: 201});
    
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}



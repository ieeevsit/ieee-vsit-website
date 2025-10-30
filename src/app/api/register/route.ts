import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Registration from '../../../models/Registration';

export async function POST(request: Request) {
  try {
    // 1. Connect to the database
    await dbConnect();

    // 2. Parse the incoming request body
    const body = await request.json();

    // 3. Create a new registration document
    // Mongoose will automatically validate the data based on your schema
    const newRegistration = await Registration.create(body);

    // 4. Send a success response
    return NextResponse.json(
      { success: true, data: newRegistration },
      { status: 201 } // 201 Created
    );
  } catch (error: any) {
    console.error(error); // Log the error for debugging

    // Handle different types of errors
    if (error.name === 'ValidationError') {
      // Mongoose validation error
      return NextResponse.json(
        { success: false, error: 'Validation Error', details: error.errors },
        { status: 400 } // 400 Bad Request
      );
    }
    if (error.code === 11000) {
      // Duplicate key error (for unique email)
      return NextResponse.json(
        { success: false, error: 'This email is already registered.' },
        { status: 409 } // 409 Conflict
      );
    }

    // General server error
    return NextResponse.json(
      { success: false, error: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
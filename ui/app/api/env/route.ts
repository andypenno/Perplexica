import process from 'process';
import { NextResponse } from 'next/server';

// Enable the Runtime
export const runtime = "dynamic"

export async function GET(_request: Request) {
  // Access environment variables
  const envVars = {
    'BACKEND_API_URL': process.env.BACKEND_API_URL ?? process.env.NEXT_PUBLIC_API_URL,
    'BACKEND_WS_URL': process.env.BACKEND_WS_URL ?? process.env.NEXT_PUBLIC_WS_URL
  }

  console.log("Hit")

  // Return the environment variables as a JSON response
  return NextResponse.json(envVars);
}

"'use server'"

import process from 'process';

export function getServerEnv(envVar: string): string {
  let result: string;
  switch (envVar) {
      case "BACKEND_API_URL":
          result = process.env.BACKEND_API_URL ?? process.env.NEXT_PUBLIC_API_URL;
      case "BACKEND_WS_URL":
          result = process.env.BACKEND_WS_URL ?? process.env.NEXT_PUBLIC_WS_URL;
      default:
          result = process.env[envVar];
  }
  return result;
}

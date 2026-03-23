const ENV = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
};

const getRequiredEnv = (name) => {
  const value = ENV[name]
  if (value === undefined || String(value).trim() === "") {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return String(value).trim()
}

export const NEXT_PUBLIC_API_URL = getRequiredEnv("NEXT_PUBLIC_API_URL")

if (!NEXT_PUBLIC_API_URL.includes("/api/v1")) {
  throw new Error("Invalid NEXT_PUBLIC_API_URL: expected it to include /api/v1")
}


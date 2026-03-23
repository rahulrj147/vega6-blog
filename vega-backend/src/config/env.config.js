const requiredEnvVars = [
  "PORT",
  "MONGODB_URI",
  "ACCESS_TOKEN_SECRET",
  "ACCESS_TOKEN_EXPIRY",
  "REFRESH_TOKEN_SECRET",
  "REFRESH_TOKEN_EXPIRY",
]

const getRequiredEnv = (name) => {
  const value = process.env[name]
  if (value === undefined || String(value).trim() === "") {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return String(value).trim()
}

const missing = requiredEnvVars.filter(
  (name) => process.env[name] === undefined || String(process.env[name]).trim() === ""
)

if (missing.length) {
  throw new Error(`Missing required environment variables: ${missing.join(", ")}`)
}

const PORT = Number(getRequiredEnv("PORT"))
if (!Number.isFinite(PORT) || PORT <= 0) {
  throw new Error(`Invalid PORT environment variable`)
}

module.exports = {
  PORT,
  MONGODB_URI: getRequiredEnv("MONGODB_URI"),
  ACCESS_TOKEN_SECRET: getRequiredEnv("ACCESS_TOKEN_SECRET"),
  ACCESS_TOKEN_EXPIRY: getRequiredEnv("ACCESS_TOKEN_EXPIRY"),
  REFRESH_TOKEN_SECRET: getRequiredEnv("REFRESH_TOKEN_SECRET"),
  REFRESH_TOKEN_EXPIRY: getRequiredEnv("REFRESH_TOKEN_EXPIRY"),
  NODE_ENV: process.env.NODE_ENV || "development",
}


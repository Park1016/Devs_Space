import dotenv from "dotenv";
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresInSecAccess: parseInt(required("JWT_EXPIRES_SEC_ACCESS", 3600)),
    expiresInSecRefresh: parseInt(required("JWT_EXPIRES_SEC_REFRESH", 86400)),
  },
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 10)),
  },
  host: {
    port: parseInt(required("HOST_PORT", 8080)),
  },
  cors: {
    allowedOrigin: required("CORS_ALLOW_ORIGIN"),
  },
  db: {
    host: required("DB_HOST"),
    user: required("DB_USER"),
    database: required("DB_DATABASE"),
    password: required("DB_PASSWORD"),
  },
  csrf: {
    plainToken: required("CSRF_SECRET_KEY"),
  },
  email: {
    validTime: parseInt(required("VALID_TIME", 180)),
  },
};

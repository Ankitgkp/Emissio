// Load .env file and export environment variables
import dotenv from "dotenv";

dotenv.config();

export const env = {
    API_KEY: process.env.API_KEY || "",
    SMTP_HOST: process.env.SMTP_HOST || "",
    SMTP_PORT: Number(process.env.SMTP_PORT) || 587,
    SMTP_USER: process.env.SMTP_USER || "",
    SMTP_PASS: process.env.SMTP_PASS || "",
};

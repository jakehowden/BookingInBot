import dotenv from "dotenv"
dotenv.config()
const { DISCORD_TOKEN, CLIENT_ID, VERSION, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

if(!DISCORD_TOKEN || !CLIENT_ID || !VERSION || !DB_HOST || !DB_PORT || !DB_USER || !DB_PASSWORD || !DB_NAME) {
    throw new Error("Missing environment variables")
}

const config: Record<string, string> = {
    DISCORD_TOKEN,
    CLIENT_ID,
    VERSION, 
    DB_HOST, 
    DB_PORT, 
    DB_USER, 
    DB_PASSWORD,
    DB_NAME
}

export default config;
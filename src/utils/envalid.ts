import { cleanEnv, str } from "envalid";
import { config } from "dotenv";

interface EnvalidType {
  DB_USER_NAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
}

config({ path: `.env.${process.env.NODE_ENV}` });

export const ValidateEnv = (): EnvalidType => {
  return cleanEnv(process.env, {
    DB_USER_NAME: str(),
    DB_PASSWORD: str(),
    DB_DATABASE: str(),
  });
};

import { ValidateEnv } from "@/utils/envalid";

export const { DB_PASSWORD, DB_USER_NAME, DB_DATABASE, JWT_SECRET_KEY } =
  ValidateEnv();

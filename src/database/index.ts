import { DB_DATABASE, DB_PASSWORD, DB_USER_NAME } from "@/config";
import { connect, set } from "mongoose";

export const connectToDb = async () => {
  const dbConfig = {
    url: `mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}@cluster0.i4e1cco.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority`,
  };

  if (process.env.NODE_ENV !== "production") {
    set("debug", true);
  }
  await connect(dbConfig.url);
};

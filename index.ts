import dynamodb from "src/adapters/database/dynamo/dynamodb";
import { startApp } from "src/server";
import dotenv from "dotenv"

dotenv.config()

dynamodb.startDatabase().then(startApp);

import dynamodb from "src/adapters/database/dynamo/dynamodb";
import { startApp } from "src/server";

dynamodb.startDatabase().then(startApp);

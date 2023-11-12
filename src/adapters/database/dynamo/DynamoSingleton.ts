import { DynamoDB } from "aws-sdk";

export class DynamoDBSingleton {
    private static instance: DynamoDBSingleton;
    private dynamoDB: DynamoDB.DocumentClient;

    private constructor() {
        this.dynamoDB = new DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000',
        });
    }

    public static getInstance(): DynamoDB.DocumentClient {
        if (!this.instance) {
            this.instance = new DynamoDBSingleton();
        }

        return this.instance.dynamoDB;
    }
}

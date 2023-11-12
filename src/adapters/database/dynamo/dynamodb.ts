import AWS from 'aws-sdk';
import { DynamoDBSingleton } from './DynamoSingleton';

const dynamodb: DatabaseType = {
  startDatabase: async () => {
    const dynamoDBInstance = DynamoDBSingleton.getInstance();

    await dynamodb.createTableIfNotExists(dynamoDBInstance);
  },

  createTableIfNotExists: async (db: AWS.DynamoDB) => {
    const params = {
      TableName: 'LogEntries',
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' }, // Partition Key
        { AttributeName: 'date', KeyType: 'RANGE' }, // Sort Key
      ],
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' },
        { AttributeName: 'date', AttributeType: 'S' },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    };

    db.createTable(params, (err, data) => {
      if (err) {
        console.error('Error creating table:', err);
      } else {
        console.log('Table created successfully:', data);
      }
    });
  },
};

export default dynamodb;

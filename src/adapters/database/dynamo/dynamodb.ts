import AWS from 'aws-sdk';

const dynamodb: DatabaseType = {
  startDatabase: async () => {
    await dynamodb.createTableIfNotExists();
  },

  createTableIfNotExists: async () => {
    const db = new AWS.DynamoDB({
      region: process.env.DB_REGION,
      endpoint: process.env.DB_URI,
    })

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

    db.describeTable({ TableName: params.TableName }, (err, data) => {
      if (err) {
        if (err.code === 'ResourceNotFoundException') {
          db.createTable(params, (err, data) => {
            if (err) {
              console.error('Error creating table:', err);
            } else {
              console.log('Table created successfully:', data);
            }
          });
        } else {
          console.error('Error describing table:', JSON.stringify(err, null, 2));
        }
      } else {
        console.log('Table already exists. Table description JSON:', JSON.stringify(data, null, 2));
      }
    });


  },
};

export default dynamodb;

const {DynamoDBClient, PutItemCommand} = require('@aws-sdk/client-dynamodb');

const dynamoDbClient = new DynamoDBClient({({region: process.env.REGION});})
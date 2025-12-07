const {DynamoDBClient, PutItemCommand} = require('@aws-sdk/client-dynamodb');

const dynamoDbClient = new DynamoDBClient({region: process.env.REGION});

exports.confirmUpload = async (event) => {
    try {
        const tableName = process.env.DYNAMODB_TABLE;
        const bucketName = process.env.BUCKET
    } catch (error) {
        
    }
}
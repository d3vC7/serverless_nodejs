const {DynamoDBClient, PutItemCommand} = require('@aws-sdk/client-dynamodb');

const dynamoDbClient = new DynamoDBClient({region: process.env.REGION});

exports.confirmUpload = async (event) => {
    try {
        const tableName = process.env.DYNAMODB_TABLE;
        const bucketName = process.env.BUCKET;
        const record = event.Records[0];

        const fileName = record.s3.object.Key;
        const imageUrl = 'https://${bucketName}.s3.amazonaws.com/${fileName'
    } catch (error) {
        
    }
}
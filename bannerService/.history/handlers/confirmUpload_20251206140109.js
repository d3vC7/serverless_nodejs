const {DynamoDBClient, PutItemCommand} = require('@aws-sdk/client-dynamodb');

const dynamoDbClient = new DynamoDBClient({region: process.env.REGION});

exports.confirmUpload = async (event) => {
    try {
        const tableName = process.env.DYNAMODB_TABLE;
        const bucketName = process.env.BUCKET;
        const record = event.Records[0];

        const fileName = record.s3.object.Key;
        const imageUrl = 'https://${bucketName}.s3.amazonaws.com/${fileName}';

        const putItemCommand = new PutItemCommand({
            TableName: tableName,
            Item:{
                fileName: {S: fileName},
                imageUrl: {S: imageUrl},
                uploadedAt: {S: newDate().ToISOString()},
            }
        });
        await dynamoDbClient.send(putItemCommand);
        return {
            statusCode: 200,
            body: JSON.stringify({ msg: "file uploaded and confirmed"}),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error:error.message})
        }
    }
}
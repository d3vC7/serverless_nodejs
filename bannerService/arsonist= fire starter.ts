arsonist= fire starter

    - Effect: 'Allow'
      Action:
        - dynamodb:PutItem



arn:aws:s3:::banner-images-ads-daniel-famous-dev/*



-- confirmUpload.js

const {DynamoDBClient, PutItemCommand} = require('@aws-sdk/client-dynamodb');

const dynamoDbClient = new DynamoDBClient({region: process.env.REGION});

exports.confirmUpload = async (event) =>{
    try {
       const tableName = process.env.DYNAMODB_TABLE;
       const bucketName = process.env.BUCKET_NAME;
       const record = event.Records[0];

       const fileName = record.s3.object.key;
       const imageUrl = `https://${bucketName}.s3.amazonaws.com/${fileName}`;

       const putItemCommand = new PutItemCommand({
        TableName: tableName,
        Item:{
            fileName: {S: fileName},
            imageUrl: {S: imageUrl},
            uploadedAt: {S: new Date().toISOString()},
        }
       });

       await dynamoDbClient.send(putItemCommand);

       return {
        statusCode: 200,
        body: JSON.stringify({msg: "file uploaded & confirmed"}),
       };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error:error.message}),
        };
    }
};


-- uploadBanner.js
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner');

const s3Client = new S3Client({region: "us-east-1"});

exports.getUploadUrl = async (event) =>{
    try {
        const bucketName = process.env.BUCKET_NAME;
        const {fileName, fileType} = JSON.parse(event.body);

        if(!fileName || !fileType){
            return {
                statusCode: 400,
                body: JSON.stringify({error: "fileName and fileType are required"}),
            };
        }
     const command  = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        ContentType: fileType,
      });

    const signedUrl =  await getSignedUrl(s3Client, command, {expiresIn: 3600});

    return {
        statusCode: 200,
        body: JSON.stringify({uploadUrl: signedUrl}),
    };

    } catch (error) {
       return {
        statusCode:200,
        body:JSON.stringify({error:error.message}),
       };
    }
};



serverless.yml

# "org" ensures this Service is used with the correct Serverless Framework Access Key.
org: micasaelei
# "service" is the name of this project. This will also be added to your AWS resource names.
service: bannerService

provider:
  name: aws
  runtime: nodejs22.x
  region: us-east-1
  environment:
    BUCKET_NAME: banner-images-ads-daniel-famous-dev
    DYNAMODB_TABLE: Banners
  iam.role.statements:
    - Effect: 'Allow'
      Action:
        -  s3:PutObject
      Resource: arn:aws:s3:::banner-images-ads-daniel-famous-dev/*
    - Effect: 'Allow'
      Action:
        -  dynamodb:PutItem
      Resource: arn:aws:dynamodb:us-east-1:294659523434:table/Banners
resources:
  Resources:
    BannerImagesBucket:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: banner-images-ads-daniel-famous-dev
    BannersTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: Banners
        BillingMode: PAY_PER_REQUEST
        AttributeDefinitions:
          -  AttributeName: fileName
             AttributeType: S
        KeySchema:
          -  AttributeName: fileName
             KeyType: HASH   
functions:
  uploadBanner:
    handler: handlers/uploadBanner.getUploadUrl
    events:
      - httpApi:
          path: /upload-banner
          method: post
  confirmUpload:
    handler: handlers/confirmUpload.confirmUpload
    events:
      -  s3:
           bucket: banner-images-ads-macaulay-famous-dev-123-new
           event: s3:ObjectCreated:Put
           existing: true



  confirmUpload:
    handler: handlers/confirmUpload.confirmUpload
    events:
      -  s3:
           bucket: banner-images-ads-daniel-famous-dev
           event: s3:ObjectCreated:Put
           existing: true



    BannerTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: Banners
        BillingMode: PAY_PER_REQUEST
        AttributeDefinitions:
          -  AttributeName: fileName
             AttributeType: S
        KeySchema:
          -  AttributeName: fileName
             KeyType: HASH


  confirmUpload:
    handler: handlers/confirmUpload.confirmUpload
    events:
      -  s3:
           bucket: banner-images-ads-daniel-famous-dev
           event: s3:ObjectCreated:Put
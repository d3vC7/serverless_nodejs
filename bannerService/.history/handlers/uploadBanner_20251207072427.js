const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner');

const s3Client = new S3Client({region: process.env.REGION});

exports.getUploadUrl = async (event) => {
    try {
        const bucketName = process.env.BUCKET_NAME
    } catch (error) {
        
    }
}
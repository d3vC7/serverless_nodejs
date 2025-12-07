const {S3Client, PutObjectCommand} = require ('@aws-sdk/client-s3');
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner');
const s3Client = new S3Client({region: process.env.REGION})

exports.getUploadUrl = async (event) => {
    try {
        const bucketName = process.env.BUCKET;
        const {fileName, fileType} = JSON.parse(event.body)
        if(!fileName || !fileType) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "fileName and fileType are required"}),
            };
        }
        new PutObjectCommand({
            Bucket: bucketName, 
            Key: fileName,
            ContentType: fileType,
        });
        const signedUrl = await getSignedUrl(s3Client, PutObjectCommand, {expiredIn. 3600})
    } catch (error) {

    }
}
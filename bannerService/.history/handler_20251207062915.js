exports.getUploadUrl = async (event) =>{
    try {
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
exports.handler = async (event) =>{
    try {
    return {
        statusCode: 200,
        body: JSON.stringify({"salida": "ok"}),
    };
    } catch (error) {
       return {
        statusCode:200,
        body:JSON.stringify({error:error.message}),
       };
    }
};
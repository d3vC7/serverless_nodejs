// import aws cognito sdk classes.
const {CognitoIdentityProviderClient, GlobalSignOutCommand} = require('@aws-sdk/client-cognito-identity-provider');

const client = new CognitoIdentityProviderClient({
    region: process.env.REGION,
});

exports.signOut = async (event) => {
    const {accessToken} = JSON.parse(event.body);
    const params = {
        AccessToken: accessToken,
    };
    try {
        const command = new GlobalSignOutCommand(params);
        await client.send(command);
        return {
            statusCode: 200,
            body: JSON.stringify({msg: "User succesfully signed out!"}),
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({error: "unexpected error", detail: error.message}),
        };
    }
};
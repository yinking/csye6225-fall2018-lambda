const aws = require('aws-sdk');
const ses = new aws.SES({
    region: 'us-east-1'
});

exports.handler = (event)=>{
    // console.log(event.Records[0].Sns.Message);
    const email = {
        Destination: {
            ToAddresses: [event.Records[0].Sns.Message]
        },
        Message: {
            Body: {
                Text: {
                    Data: "Reset password"
                }
            },
            Subject: {
                Data: "Reset password"
            }
        },
        Source: "reset-password@csye6225-fall2018-zhangzhiyo.me"
    };
    ses.sendEmail(email, ()=>{});
};
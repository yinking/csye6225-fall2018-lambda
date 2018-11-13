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
        Source: "zhang.zhiyo@husky.neu.edu"
    };
    ses.sendEmail(email, ()=>{});
};
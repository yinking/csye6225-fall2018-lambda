var aws = require('aws-sdk');
var ses = new aws.SES({
   region: 'us-east-1'
});

exports.handler = function(event, context) {
    var eParams = {
        Destination: {
            ToAddresses: ["zhang.zhiyo@husky.neu.edu"]
        },
        Message: {
            Body: {
                Text: {
                    Data: "Hey! What is up?"
                }
            },
            Subject: {
                Data: "Email Subject!!!"
            }
        },
        Source: "zhang.zhiyo@husky.neu.edu"
    };

    var email = ses.sendEmail(eParams, function(err, data){
        if(err) console.log(err);
        else {
           
        }
    });
};

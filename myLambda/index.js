<<<<<<< HEAD
const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'})
const ses = new AWS.SES()
const dynamoDB = new AWS.DynamoDB()
const route53domains = new AWS.Route53Domains()

exports.handler = function (event, context) {
    
    route53domains.listDomains({MaxItems: 1}, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);  
        return data;
    });
    const email = event.Records[0].Sns.Message

    const getItemObject = {
        TableName: 'csye6225',
        Key: {
            'id': {S: email}
        }
    };

    dynamoDB.getItem(getItemObject, function (err, data) {
        if (data.Item === undefined) {
            const putItemObject = {
                TableName: 'csye6225',
                Item: {
                    id: {S: email},
                    token: {S: context.awsRequestId},
                    ttl: {N: (Math.floor(Date.now() / 1000) + 60 * 20).toString()}
                }
            }
            dynamoDB.putItem(putItemObject, function () {
                }
            )
            
            route53domains.listDomains({MaxItems: 1}, function (err, data) {
                console.log(data)
                /*const emailObject = {
                    Destination: {
                        ToAddresses: [email]
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
                    Source: "reset-password@" + data.Domains[0].DomainName
                }
                ses.sendEmail(emailObject, function () {
                    
                });*/
            });
        }
    })
}
=======
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
>>>>>>> 7a6cee380c2f1229531e5ea512c8f78659824813

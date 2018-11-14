const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })
const ses = new AWS.SES()
const dynamoDB = new AWS.DynamoDB()
const route53 = new AWS.Route53()

exports.handler = (event, context) => {
    const email = event.Records[0].Sns.Message

    const getItemObject = {
        TableName: 'csye6225',
        Key: {
            'id': { S: email }
        }
    }

    dynamoDB.getItem(getItemObject, (err, data) => {
        if (data.Item === undefined) {
        const putItemObject = {
            TableName: 'csye6225',
            Item: {
                id: { S: email },
                token: { S: context.awsRequestId },
                ttl: { N: (Math.floor(Date.now() / 1000) + 60 * 20).toString() }
            }
        }
        dynamoDB.putItem(putItemObject, () => {})

        route53.listHostedZones({}, (err, data) => {
            const domainName=data.HostedZones[0].Name
            const emailObject = {
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
                Source: "reset-password@" + domainName.substring(0,domainName.length-1)
            }
            ses.sendEmail(emailObject, () => {})
    });
    }
})
}
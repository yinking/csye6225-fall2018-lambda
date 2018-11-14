const AWS = require('aws-sdk')
const ses = new AWS.SES({
    region: 'us-east-1'
})
const ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'})

exports.handler = function (event, context) {
    const email = event.Records[0].Sns.Message

    const getItemObject = {
        TableName: 'csye6225',
        Key: {
            'id': {S: email}
        }
    }

    ddb.getItem(getItemObject, function (err, data) {
            if (data.Item === undefined) {
                const putItemObject = {
                    TableName: 'csye6225',
                    Item: {
                        id: {S: email},
                        token: {S: context.awsRequestId},
                        ttl: {N: (Math.floor(Date.now() / 1000) + 60 * 20).toString()}
                    }
                }
                ddb.putItem(putItemObject, function () {
                    }
                )

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
                    Source: "reset-password@csye6225-fall2018-zhangzhiyo.me"
                }
                ses.sendEmail(emailObject, function () {
                    }
                )
            }
        }
    )
}

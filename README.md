# aws-lambda-apig-cookie-check

[![Build and Test](https://github.com/anzharip/aws-lambda-cookie/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/anzharip/aws-lambda-cookie/actions)
[![codecov](https://codecov.io/gh/anzharip/aws-lambda-cookie/branch/main/graph/badge.svg?token=LWQJDZNQV7)](https://codecov.io/gh/anzharip/aws-lambda-cookie)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/96165dceeefa4968b4822ab97d846faa)](https://www.codacy.com/gh/anzharip/aws-lambda-cookie/dashboard?utm_source=github.com&utm_medium=referral&utm_content=anzharip/aws-lambda-cookie&utm_campaign=Badge_Grade)
[![npm downloads](https://img.shields.io/npm/dm/@anzp/aws-lambda-cookie)](https://www.npmjs.com/package/@anzp/aws-lambda-cookie)

Module to parse AWS Lambda events and extract their cookies. 

Currently working for these events: 
- API Gateway HTTP API Proxy Event
- Cloudfront Viewer Request Event (Lambda@Edge)

## Install

```bash
npm i @anzp/aws-lambda-cookie
```

## Examples

### API Gateway HTTP API Proxy Event

Consider this as your event: 
```json
{
  "version": "2.0",
  "routeKey": "$default",
  "rawPath": "/path/to/resource",
  "rawQueryString": "parameter1=value1&parameter1=value2&parameter2=value",
  "cookies": [
    "nevergonnagiveyouup",
    "nevergonna=bringyoudown; secure; httponly; samesite=strict; path=/; domain=.example.com; max-age=3600; expires=Mon, 01-Jan-2020 00:00:00 GMT; version=1; comment=something; commenturl=http://example.com/"
  ],
  "headers": {
    "Header1": "value1",
    "Header2": "value1,value2"
  },
  "queryStringParameters": {
    "parameter1": "value1,value2",
    "parameter2": "value"
  },
  "requestContext": {
    "accountId": "123456789012",
    "apiId": "api-id",
    "authentication": {
      "clientCert": {
        "clientCertPem": "CERT_CONTENT",
        "subjectDN": "www.example.com",
        "issuerDN": "Example issuer",
        "serialNumber": "a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1",
        "validity": {
          "notBefore": "May 28 12:30:02 2019 GMT",
          "notAfter": "Aug  5 09:36:04 2021 GMT"
        }
      }
    },
    "authorizer": {
      "jwt": {
        "claims": {
          "claim1": "value1",
          "claim2": "value2"
        },
        "scopes": [
          "scope1",
          "scope2"
        ]
      }
    },
    "domainName": "id.execute-api.us-east-1.amazonaws.com",
    "domainPrefix": "id",
    "http": {
      "method": "POST",
      "path": "/path/to/resource",
      "protocol": "HTTP/1.1",
      "sourceIp": "192.168.0.1/32",
      "userAgent": "agent"
    },
    "requestId": "id",
    "routeKey": "$default",
    "stage": "$default",
    "time": "12/Mar/2020:19:03:58 +0000",
    "timeEpoch": 1583348638390
  },
  "body": "eyJ0ZXN0IjoiYm9keSJ9",
  "pathParameters": {
    "parameter1": "value1"
  },
  "isBase64Encoded": true,
  "stageVariables": {
    "stageVariable1": "value1",
    "stageVariable2": "value2"
  }
}
```

And this is your lambda code: 
```typescript
let response;
const {
  ApiGatewayHttpApiProxyEventHandler,
} = require("@anzp/aws-lambda-apig-cookie");
exports.lambdaHandler = async (event, context) => {
  try {
    const handler = new ApiGatewayHttpApiProxyEventHandler(event);
    const cookies = handler.getCookies();
    console.log({ cookies });
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: JSON.stringify(cookies),
        // location: ret.data.trim()
      }),
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};

```

This will be the parsed cookies: 
```typescript
const cookies = {
  cookieObjects: [
    { name: "nevergonnagiveyouup", value: "" },
    {
      name: "nevergonna",
      value: "bringyoudown",
      comment: "something",
      commenturl: "http://example.com/",
      domain: ".example.com",
      expires: new Date("2020-01-01T00:00:00.000Z"),
      httpOnly: true,
      maxAge: 3600,
      path: "/",
      sameSite: "strict",
      secure: true,
      version: "1",
    },
  ],
  cookieStrings: [
    "nevergonnagiveyouup",
    "nevergonna=bringyoudown; secure; httponly; samesite=strict; path=/; domain=.example.com; max-age=3600; expires=Mon, 01-Jan-2020 00:00:00 GMT; version=1; comment=something; commenturl=http://example.com/",
  ],
};
```

### Cloudfront Viewer Request Event (Lambda@Edge)

Consider this as your event: 
```json
{
    "Records": [
        {
            "cf": {
                "config": {
                    "distributionId": "EXAMPLE"
                },
                "request": {
                    "uri": "/test",
                    "method": "GET",
                    "clientIp": "2001:cdba::3257:9652",
                    "headers": {
                        "user-agent": [
                            {
                                "key": "User-Agent",
                                "value": "Test Agent"
                            }
                        ],
                        "host": [
                            {
                                "key": "Host",
                                "value": "d123.cf.net"
                            }
                        ],
                        "cookie": [
                            {
                                "key": "Cookie",
                                "value": "nevergonnagiveyouup"
                            },
                            {
                                "key": "Cookie",
                                "value": "nevergonna=bringyoudown; secure; httponly; samesite=strict; path=/; domain=.example.com; max-age=3600; expires=Mon, 01-Jan-2020 00:00:00 GMT; version=1; comment=something; commenturl=http://example.com/"
                            }
                        ]
                    }
                }
            }
        }
    ]
}
```

And this is your lambda code: 
```typescript
let response;
const {
  CloudfrontViewerRequestEventHandler,
} = require("@anzp/aws-lambda-apig-cookie");
exports.lambdaHandler = async (event, context, callback) => {
  try {
    const request = event.Records[0].cf.request;
    const handler = new CloudfrontViewerRequestEventHandler(event);
    const cookies = handler.getCookies();
    console.log({ cookies });
  } catch (err) {
    console.log(err);
    response = {
      statusCode: 500,
    };
    callback(null, response)
  }
  callback(null, request)
};

```

This will be the parsed cookies: 
```typescript
const cookies = {
  cookieObjects: [
    { name: "nevergonnagiveyouup", value: "" },
    {
      name: "nevergonna",
      value: "bringyoudown",
      comment: "something",
      commenturl: "http://example.com/",
      domain: ".example.com",
      expires: new Date("2020-01-01T00:00:00.000Z"),
      httpOnly: true,
      maxAge: 3600,
      path: "/",
      sameSite: "strict",
      secure: true,
      version: "1",
    },
  ],
  cookieStrings: [
    "nevergonnagiveyouup",
    "nevergonna=bringyoudown; secure; httponly; samesite=strict; path=/; domain=.example.com; max-age=3600; expires=Mon, 01-Jan-2020 00:00:00 GMT; version=1; comment=something; commenturl=http://example.com/",
  ],
};
```


import setCookieParser from "set-cookie-parser";

type ApiGatewayHttpApiProxyEvent = {
  version: string;
  routeKey: string;
  rawPath: string;
  rawQueryString: string;
  cookies: Array<string>;
  headers: { [key: string]: string };
  queryStringParameters: { [key: string]: string };
  requestContext: { [key: string]: Record<string, unknown> | string | number };
  body: string;
  pathParameters: { [key: string]: string };
  isBase64Encoded: boolean;
  stageVariables: { [key: string]: string };
};

type CfRecord = {
  cf: {
    config: Record<string, unknown>;
    request: {
      uri: string;
      method: string;
      clientIp: string;
      headers: {
        "user-agent": Array<{ key: string; value: string }>;
        host: Array<{ key: string; value: string }>;
        cookie: Array<{ key: string; value: string }>;
      };
    };
  };
};

type CloudfrontViewerRequestEvent = {
  Records: Array<CfRecord>;
};

type CookieResult = {
  [key: string]: Array<string> | Array<setCookieParser.Cookie>;
};

export {
  ApiGatewayHttpApiProxyEvent,
  CloudfrontViewerRequestEvent,
  CookieResult,
};

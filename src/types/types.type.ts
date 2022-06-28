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

type CookieResult = {
  [key: string]: Array<string> | Array<Record<string, string | boolean>>;
};

enum CookieAttribute {
  Comment = "Comment",
  CommentURL = "CommentURL",
  Discard = "Discard",
  Domain = "Domain",
  Expires = "Expires",
  MaxAge = "MaxAge",
  Origin = "Origin",
  Path = "Path",
  Port = "Port",
  SameSite = "SameSite",
  Secure = "Secure",
  Version = "Version",
}

type ParsedCookie = {
  name: string;
  value: string;
};

export { ApiGatewayHttpApiProxyEvent, CookieResult, CookieAttribute };

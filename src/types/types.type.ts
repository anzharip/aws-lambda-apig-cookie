export type ApiGatewayHttpApiProxyEvent = {
  version: string;
  routeKey: string;
  rawPath: string;
  rawQueryString: string;
  cookies: Array<string>;
  headers: { [key: string]: string };
  queryStringParameters: { [key: string]: string };
  requestContext: { [key: string]: Record<string, unknown> | string };
  body: string;
  pathParameters: { [key: string]: string };
  isBase64Encoded: boolean;
  stageVariables: { [key: string]: string };
};

import { ApiGatewayHttpApiProxyEvent, CookieResult } from "./types/types.type";

class ApiGatewayHttpApiProxyEventHandler {
  readonly event: ApiGatewayHttpApiProxyEvent;

  constructor(event: ApiGatewayHttpApiProxyEvent) {
    this.event = event;
  }

  public getCookies(): CookieResult {
    return _getCookies(this.event);
  }
}

function _getCookies(event: ApiGatewayHttpApiProxyEvent): CookieResult {
  const { cookies } = event;
  const cookieStrings = cookies;
  const cookieObjects: Array<Record<string, string | boolean>> = [];
  for (const cookie of cookies) {
    const items = cookie.split(";");
    const parsedCookie: Record<string, string | boolean> = {};
    for (const item of items) {
      const keyValue = item.split("=");
      if (keyValue.length === 2) {
        parsedCookie[keyValue[0].trim()] = keyValue[1].trim();
      } else {
        parsedCookie[keyValue[0].trim()] = keyValue[0].trim();
      }
    }
    cookieObjects.push(parsedCookie);
  }
  return { cookieStrings, cookieObjects };
}

export { ApiGatewayHttpApiProxyEventHandler };

import { ApiGatewayHttpApiProxyEvent, CookieResult } from "./types/types.type";
import setCookieParser from "set-cookie-parser";

class ApiGatewayHttpApiProxyEventHandler {
  readonly event: ApiGatewayHttpApiProxyEvent;

  constructor(event: ApiGatewayHttpApiProxyEvent) {
    this.event = event;
  }

  getCookies(): CookieResult {
    const { cookies } = this.event;
    const cookieStrings = cookies;
    const cookieObjects: Array<setCookieParser.Cookie> = [];
    for (const cookie of cookies) {
      const parsedCookie = setCookieParser.parseString(cookie);
      cookieObjects.push(parsedCookie);
    }
    return { cookieStrings, cookieObjects };
  }
}

function _getCookies(event: ApiGatewayHttpApiProxyEvent): CookieResult {
  const { cookies } = event;
  const cookieStrings = cookies;
  const cookieObjects: Array<setCookieParser.Cookie> = [];
  for (const cookie of cookies) {
    const parsedCookie = setCookieParser.parseString(cookie);
    cookieObjects.push(parsedCookie);
  }
  return { cookieStrings, cookieObjects };
}

export { ApiGatewayHttpApiProxyEventHandler };

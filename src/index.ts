import {
  ApiGatewayHttpApiProxyEvent,
  CloudfrontViewerRequestEvent,
  CookieResult,
} from "./types/types.type";
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

class CloudfrontViewerRequestEventHandler {
  readonly event: CloudfrontViewerRequestEvent;

  constructor(event: CloudfrontViewerRequestEvent) {
    this.event = event;
  }

  getCookies(): CookieResult {
    const { cookie } = this.event.Records[0].cf.request.headers;
    const cookieStrings = [];
    const cookieObjects: Array<setCookieParser.Cookie> = [];
    for (const cookieItem of cookie) {
      const { value } = cookieItem;
      const cookieString = value;
      cookieStrings.push(cookieString);
      const parsedCookie = setCookieParser.parseString(cookieString);
      cookieObjects.push(parsedCookie);
    }
    return { cookieStrings, cookieObjects };
  }
}

export {
  ApiGatewayHttpApiProxyEventHandler,
  CloudfrontViewerRequestEventHandler,
};

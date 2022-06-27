import { ApiGatewayHttpApiProxyEvent } from "./types/types.type";

class ApiGatewayHttpApiProxyEventHandler {
  public static getCookies(event: ApiGatewayHttpApiProxyEvent): string[] {
    return _getCookies(event);
  }
}

function _getCookies(event: ApiGatewayHttpApiProxyEvent): string[] {
  return event.headers.cookie.split(";");
}

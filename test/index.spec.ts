import eventApigJson from "./fixture/event-apig.json";
import eventCfJson from "./fixture/event-cf.json";
import {
  ApiGatewayHttpApiProxyEventHandler,
  CloudfrontViewerRequestEventHandler,
} from "../src/index";

const cookieResult = {
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

describe("index.js", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("parse the cookies correctly from ApiGatewayHttpApiProxyEventHandler", async () => {
    const handler = new ApiGatewayHttpApiProxyEventHandler(eventApigJson);
    const result = handler.getCookies();
    expect(result).toEqual(cookieResult);
  });

  it("parse the cookies correctly from CloudfrontViewerRequestEventHandler", async () => {
    const handler = new CloudfrontViewerRequestEventHandler(eventCfJson);
    const result = handler.getCookies();
    expect(result).toEqual(cookieResult);
  });
});

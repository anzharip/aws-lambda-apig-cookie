import eventJson from "./fixture/event.json";
import { ApiGatewayHttpApiProxyEventHandler } from "../src/index";

describe("index.js", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("parse the cookies correctly", async () => {
    const handler = new ApiGatewayHttpApiProxyEventHandler(eventJson);
    const result = handler.getCookies();
    expect(result).toEqual({
      cookieObjects: [
        { cookie1: "cookie1" },
        {
          comment: "something",
          commenturl: "http://example.com/",
          domain: ".example.com",
          expires: "Mon, 01-Jan-2020 00:00:00 GMT",
          httponly: "httponly",
          "max-age": "3600",
          path: "/",
          samesite: "strict",
          secure: "secure",
          something: "tasty",
          version: "1",
        },
      ],
      cookieStrings: [
        "cookie1",
        "something=tasty; secure; httponly; samesite=strict; path=/; domain=.example.com; max-age=3600; expires=Mon, 01-Jan-2020 00:00:00 GMT; version=1; comment=something; commenturl=http://example.com/",
      ],
    });
  });
});

import { APIGatewayEvent } from "aws-lambda";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { handler } from "../../../src/function2/app";
import event from "../../events/event.json";

describe("Function 2 tests", function () {
  const gatewayEvent = event as unknown as APIGatewayEvent;
  beforeEach(() => {
    // tell vitest we use mocked time
  });

  afterEach(() => {
    // restoring date after each test run
  });

  it("verifies successful response", async () => {
    const response = await handler(gatewayEvent, undefined);
    expect(response).to.be.an("object");
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an("string");

    const body = JSON.parse(response.body);
    expect(body).toHaveProperty("message");
    expect(body.message).toBe("Function 2");

    expect(body).toHaveProperty("location");
    expect(body.location).to.be.an("string");
  });
});

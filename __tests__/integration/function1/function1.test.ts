import axios from "axios";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("Function 1 Tests", function () {
  beforeEach(() => {
    // tell vitest we use mocked time
  });

  afterEach(() => {
    // restoring date after each test run
  });

  it("verifies successful response", async () => {
    const function1URI = process.env.FUNCTION1_URI;
    expect(function1URI).toBeTypeOf("string")

    const functionResponse = await axios.get(function1URI as string)
    
    expect(functionResponse.status).to.equal(200);
    
    const data = await functionResponse.data;

    expect(data).toHaveProperty("message");
    expect(data.message).toBe("Function 1");
  });
});

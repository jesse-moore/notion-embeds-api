import axios from "axios";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("Function 2 tests", function () {
  beforeEach(() => {
    // tell vitest we use mocked time
  });

  afterEach(() => {
    // restoring date after each test run
  });

  it("verifies successful response", async () => {
    const function2URI = process.env.FUNCTION2_URI;
    expect(function2URI).toBeTypeOf("string")

    const functionResponse = await axios.get(function2URI as string);
    
    expect(functionResponse.status).to.equal(200);
    
    const data = await functionResponse.data;

    expect(data).toHaveProperty("location");
    expect(data.location).to.be.an("string");
  });
});

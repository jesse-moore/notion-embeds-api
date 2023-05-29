import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import axios from "axios";

let response: APIGatewayProxyResult;

export const lambdaHandler = async (event: APIGatewayEvent, context?: Context): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Context: ${JSON.stringify(context, null, 2)}`);
  try {
    const ret = await axios.get("http://checkip.amazonaws.com/");
    const data = await ret.data;
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Function 2",
        location: data.trim(),
      }),
    };
  } catch (err) {
    console.log(err);
    if (err && typeof err === "object" && "message" in err && typeof err.message === "string") {
      throw new Error(err.message);
    }
  }

  return response;
};

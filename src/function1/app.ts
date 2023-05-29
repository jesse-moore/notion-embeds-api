import { APIGatewayEvent, APIGatewayProxyCallback, Context } from "aws-lambda";

export const lambdaHandler = async (event: APIGatewayEvent, context?: Context, callback?: APIGatewayProxyCallback) => {
  console.log(`Event: ${JSON.stringify(event)}`);
  console.log(`Context: ${JSON.stringify(context, null, 2)}`);
  if (callback) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: "Function 1",
      }),
    });
  }
};

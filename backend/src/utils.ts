import { APIGatewayProxyEventV2 } from "aws-lambda";

type Params = {
  url: string;
};

type Result = {
  title: string;
  content: string;
  textContent: string;
  length: number;
  excerpt: string;
  byline: string;
  dir: string;
  siteName: string;
  lang: string;
};

type Response =
  | {
      result: Result | null;
      error?: undefined;
    }
  | {
      result?: undefined;
      error: Error;
    };

export function parseRequest(event: APIGatewayProxyEventV2): Params {
  const { url } = event.queryStringParameters || {};

  if (!url) throw new Error("Missing query string parameter: url");

  try {
    // eslint-disable-next-line no-new
    new URL(url);
  } catch {
    throw new Error(`Invalid url: ${url}`);
  }

  return { url };
}

export function formatResponse(response: Response) {
  const headers = {
    "Content-Type": "text/html; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "*",
  };

  const { result, error } = response;

  return error
    ? {
        statusCode: 400,
        body: error?.message,
        headers,
      }
    : {
        statusCode: 200,
        body: result?.content,
        headers,
      };
}

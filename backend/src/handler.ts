import chromium from "@sparticuz/chromium";
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import puppeteer, { Browser, Page } from "puppeteer-core";
import { parseRequest, formatResponse } from "./utils";

// define browser outside of function so it stays open between invocations
let browser: Browser | undefined;

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  // define page outside of try-catch block so it can be closed in finally block
  let page: Page | undefined;

  try {
    // parse parameters from event
    const { url } = parseRequest(event);

    // launch browser
    if (!browser) {
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      });
    }

    // create new page
    page = await browser.newPage();

    // navigate to given url
    await page.goto(url);

    // get page content
    const content = await page.content();

    // create DOM from HTML
    const dom = new JSDOM(content, { url: page.url() });

    // get article content
    const reader = new Readability(dom.window.document);
    const result = reader.parse();

    return formatResponse({ result });
  } catch (cause) {
    const error =
      cause instanceof Error ? cause : new Error("Unknown error", { cause });
    console.error(error);
    return formatResponse({ error });
  } finally {
    await page?.close();
  }
};

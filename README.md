# Lambda Readability

Lambda Readability is a Serverless Reader View to extract readable content from web pages using AWS Lambda, Chromium, and the Readability.js library.

For more information, read my article on [DEV.to](http://DEV.to): [Building a Serverless Reader View with Lambda and Chrome](https://dev.to/aws-builders/build-a-reader-view-with-lambda-and-1gc3-temp-slug-7485541?preview=391f5c98e5dfc3a139493afb5a0e482e597d7df3219af181d5aeed93ac559ff9271b77d3ae06fe47db1c0f0a19869c101e69c1750167814c816d7c6a)

## Features

- Serverless architecture built with AWS CDK.
- Runs a headless Chrome browser in an AWS Lambda function to extract content from web pages.
- Uses the Readability.js library to convert complex web pages into a clean and readable view.
- Simple REST API to retrieve the readable content from a given URL.
- Demonstration web app built with React, Tailwind, and Vite to showcase the project.

## Application

Visit [zirkelc.github.io/lambda-readability](https://zirkelc.github.io/lambda-readability/) and enter a URL for a website. Here are some examples:

**Maker's Schedule, Manager's Schedule** by Paul Graham. 

[Readability](https://zirkelc.github.io/lambda-readability/?url=http%3A%2F%2Fwww.paulgraham.com%2Fmakersschedule.html) vs [Original](http://www.paulgraham.com/makersschedule.html)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sne91wuoqqorj856ifhb.png)**Understanding AWS Lambda’s invoke throttling limits** by Archana Srikanta on the AWS Compute Blog. 

[Readability](https://zirkelc.github.io/lambda-readability/?url=http%3A%2F%2Fwww.paulgraham.com%2Fmakersschedule.html) vs [Original](http://www.paulgraham.com/makersschedule.html)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a6i6vgt0ptok2v2wvqcu.png) **Advice for Junior Developers** by Jeroen De Dauw on [DEV.to](http://DEV.to) 

[Readability](https://zirkelc.github.io/lambda-readability/?url=http%3A%2F%2Fwww.paulgraham.com%2Fmakersschedule.html) vs [Original](http://www.paulgraham.com/makersschedule.html)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yf1vbwko0ksmwzmqg5x4.png)## Development

Install dependencies from root:

```
npm install
```

Build and deploy backend with CDK:

```
cd backend
npm run build
npm run deploy
```

Note API URL from the outputs and retrieve the secret API key from the AWS console. Then add tehse values to [vite.config.ts](https://./frontend/vite.config.ts): 

```
export default defineConfig(() => {
  process.env.VITE_API_URL = "https://...";
  process.env.VITE_API_KEY = "...";

  return {
    // ...
  };
});
```

Start frontend with Vite:

```
cd frontend
npm start
```
import * as cdk from "aws-cdk-lib";
import {
  ApiKeySourceType,
  Cors,
  LambdaIntegration,
  Period,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";
import {
  Architecture,
  Code,
  LayerVersion,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

export class LambdaReadabilityStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const chromeLayer = new LayerVersion(this, "chrome-layer", {
      description: "Chromium v111.0.0",
      compatibleRuntimes: [Runtime.NODEJS_18_X],
      compatibleArchitectures: [Architecture.X86_64],
      code: Code.fromAsset("layers/chromium/chromium-v111.0.0-layer.zip"),
    });

    const handler = new NodejsFunction(this, "handler", {
      functionName: "lambda-readability",
      entry: "src/handler.ts",
      handler: "handler",
      runtime: Runtime.NODEJS_18_X,
      timeout: cdk.Duration.seconds(30),
      memorySize: 2048,
      reservedConcurrentExecutions: 10,
      environment: {
        NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      },
      bundling: {
        externalModules: ["@sparticuz/chromium"],
        nodeModules: ["jsdom"],
      },
      layers: [chromeLayer],
    });

    const lambdaIntegration = new LambdaIntegration(handler);

    const api = new RestApi(this, "lambda-readability-api", {
      apiKeySourceType: ApiKeySourceType.HEADER,
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: Cors.DEFAULT_HEADERS,
      },
    });

    api.root.addMethod("GET", lambdaIntegration, {
      requestParameters: { "method.request.querystring.url": true },
      apiKeyRequired: true,
    });

    const key = api.addApiKey("lambda-readability-apikey");
    const plan = api.addUsagePlan("lambda-readability-plan", {
      quota: {
        limit: 5_000,
        period: Period.DAY,
      },
      throttle: {
        rateLimit: 10,
        burstLimit: 2,
      },
    });

    plan.addApiKey(key);
    plan.addApiStage({ api, stage: api.deploymentStage });

    new cdk.CfnOutput(this, "ApiUrl", {
      value: api.url,
    });

    new cdk.CfnOutput(this, "ApiKey", {
      value: key.keyId,
    });
  }
}

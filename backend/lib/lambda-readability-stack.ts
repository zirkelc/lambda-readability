import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction, NodejsFunctionProps, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs";
import { Architecture, Code, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { LambdaIntegration, MockIntegration, PassthroughBehavior, RestApi, IResource, Period } from 'aws-cdk-lib/aws-apigateway';

export class LambdaReadabilityStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const chromeLayer = new LayerVersion(this, 'chrome-layer', {
      description: 'Chromium v111.0.0',
      compatibleRuntimes: [Runtime.NODEJS_18_X],
      compatibleArchitectures: [Architecture.X86_64],
      code: Code.fromAsset('layers/chromium/chromium-v111.0.0-layer.zip'),
    });

    const handler = new NodejsFunction(this, "handler", {
      entry: "src/handler.ts",
      handler: "handler",
      runtime: Runtime.NODEJS_18_X,
      timeout: cdk.Duration.seconds(30),
      memorySize: 1600,
      environment: {
        NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000"
      },
      bundling: {
        externalModules: [
          "@sparticuz/chromium",
        ],
        nodeModules: [
          "jsdom",
        ],
      },
      layers: [chromeLayer]
    });

    const lambdaIntegration = new LambdaIntegration(handler);

    const api = new RestApi(this, 'api', {});
    api.root.addMethod('GET', lambdaIntegration, { requestParameters: { 'method.request.querystring.url': true } });
    addCorsOptions(api.root);

    const plan = api.addUsagePlan('usagePlan', {
      quota: {
        limit: 1_000,
        period: Period.DAY
      },
      throttle: {
        rateLimit: 10,
        burstLimit: 2
      }
    });

    plan.addApiStage({
      stage: api.deploymentStage,
    });
  }
}

export function addCorsOptions(apiResource: IResource) {
  apiResource.addMethod('OPTIONS', new MockIntegration({
    // In case you want to use binary media types, uncomment the following line
    // contentHandling: ContentHandling.CONVERT_TO_TEXT,
    integrationResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
        'method.response.header.Access-Control-Allow-Origin': "'*'",
        'method.response.header.Access-Control-Allow-Credentials': "'false'",
        'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,GET,PUT,POST,DELETE'",
      },
    }],
    // In case you want to use binary media types, comment out the following line
    passthroughBehavior: PassthroughBehavior.NEVER,
    requestTemplates: {
      "application/json": "{\"statusCode\": 200}"
    },
  }), {
    methodResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': true,
        'method.response.header.Access-Control-Allow-Methods': true,
        'method.response.header.Access-Control-Allow-Credentials': true,
        'method.response.header.Access-Control-Allow-Origin': true,
      },
    }]
  })
}
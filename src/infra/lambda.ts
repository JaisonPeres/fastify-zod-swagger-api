import { serverless } from "./bootstrap";
import awsLambdaFastify from '@fastify/aws-lambda';

exports.handler = awsLambdaFastify(serverless());
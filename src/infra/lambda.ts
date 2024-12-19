import { serverless } from "./bootstrap";
import awsLambdaFastify from '@fastify/aws-lambda';

const proxy = awsLambdaFastify(serverless());

exports.handler = proxy;
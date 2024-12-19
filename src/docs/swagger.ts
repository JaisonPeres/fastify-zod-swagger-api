import fastifySwagger from "@fastify/swagger";
import { FastifyTypeInstance } from "../types";
import { readFileSync } from "fs";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { UserModule } from "../app/users/users.module";
import { AuthModule } from "../app/auth/auth.module";
import { BootstrapFactory } from "../infra/factories/BootstrapFactory";

const DESCRIPTION_MD_FILE = 'src/docs/description.md';
const LOGO_FILE = 'src/docs/logo.png';
const FAVICON_FILE = 'src/docs/favicon.png';
const THEME_CSS_FILE = 'src/docs/theme.css';

const TITLE = 'Onbloc API';
const DOC_VERSION = '1.0.0';

export class SwaggerConfig {
  static register(app: FastifyTypeInstance) {
    const description = readFileSync(DESCRIPTION_MD_FILE, 'utf-8');

    const logoFile = readFileSync(LOGO_FILE);
    const logoToBase64 = Buffer.from(logoFile).toString('base64');
    const logoToBuffer = Buffer.from(logoToBase64, 'base64');
    
    const faviconFile = readFileSync(FAVICON_FILE);
    const faviconToBase64 = Buffer.from(faviconFile).toString('base64');
    const faviconToBuffer = Buffer.from(faviconToBase64, 'base64');

    const themeContent = readFileSync(THEME_CSS_FILE, 'utf-8')

    const { authModule, userModule } = BootstrapFactory.create();

    app.register(fastifySwagger, {
      openapi: {
        info: {
          title: TITLE,
          version: DOC_VERSION,
          contact: {
            email: 'support@onbloc.dev.br',
            name: 'Onbloc Support',
            url: 'https://onbloc.dev.br',
          },
          description,
          license: {
            name: 'MIT',
            identifier: 'MIT',
            url: 'https://opensource.org/licenses/MIT',
          },
          summary: TITLE,
          termsOfService: 'https://onbloc.dev.br/terms',
        },
        tags: [
          userModule.info,
          authModule.info,
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              description: 'JWT Token',
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            }
          }
        },
      },
      transform: jsonSchemaTransform,
    });
    
    app.register(fastifySwaggerUi, {
      routePrefix: '/docs',
      uiConfig: {
        docExpansion: 'list',
        deepLinking: false,
      },
      staticCSP: true,
      transformStaticCSP: (header) => header,
      transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
      transformSpecificationClone: true,
      logo: {
        type: 'image/png',
        content: logoToBuffer,
        href: 'https://onbloc.dev.br',
        target: '_blank',
      },
      theme: {
        title: TITLE,
        css: [{
          filename: 'theme.css',
          content: themeContent,
        }],
        favicon: [
          {
            filename: 'favicon.png',
            rel: 'icon',
            sizes: '16x16',
            type: 'image/png',
            content: faviconToBuffer,
          }
        ]
      }
    });
  }
}
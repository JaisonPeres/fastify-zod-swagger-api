import { readFileSync } from "node:fs";


export const openapi = () => {

  const description = readFileSync('src/docs/description.md', 'utf-8')

  return {
    info: {
      title: 'Onbloc API',
      version: '1.0.0',
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
      summary: 'Onbloc API Documentation',
      termsOfService: 'https://onbloc.dev.br/terms',
    }
  };
}
const Documentation = {
  openapi: '3.0.0',
  info: {
    title: 'Shop API simulation',
    description: 'This is a simple shop API simulation',
    contact: {
      email: 'mikhael-dcs@outlook.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
    },
    version: '1.0.0',
  },
  servers: [
    {
      url: 'https://virtserver.swaggerhub.com/mikhael-dantas/devshop/1.0.0',
      description: 'SwaggerHub API Auto Mocking',
    },
  ],
  tags: [
    {
      name: 'Admins',
      description: 'Operations available only to users with admin role',
    },
    {
      name: 'Masters',
      description: 'Operations available only to users with master role',
    },
  ],
  paths: {
    '/': {
      get: {
        summary: 'searches homepage info',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'welcome to the API',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/users': {
      get: {
        tags: ['Masters'],
        summary: 'searches users info',
        description:
          'By passing in the appropriate options and having the right permissions, you can search users info',
        parameters: [
          {
            name: 'email',
            in: 'query',
            description: 'pass an option to search users by email',
            required: false,
            style: 'form',
            explode: true,
            schema: {
              type: 'boolean',
            },
          },
          {
            name: 'admin',
            in: 'query',
            description: 'pass an option to search only admins',
            required: false,
            style: 'form',
            explode: true,
            schema: {
              type: 'boolean',
            },
          },
        ],
        responses: {
          '200': {
            description: 'search results matching criteria',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'integer',
                        example: 2,
                      },
                      email: {
                        type: 'string',
                        example: 'WidgetAdapter@gmail.com',
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad request',
          },
          '401': {
            description: 'Access token is missing or invalid',
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
    '/users/user': {
      get: {
        summary: 'searches user info',
        description:
          'By passing in the appropriate options, you can search info about the logged user in the system',
        responses: {
          '200': {
            description: 'search results matching criteria',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'integer',
                        example: 2,
                      },
                      email: {
                        type: 'string',
                        example: 'WidgetAdapter@gmail.com',
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad request',
          },
          '401': {
            description: 'Access token is missing or invalid',
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
  },
  components: {
    schemas: {
      PaginatedResourceMeta: {
        type: 'object',
        properties: {
          total: {
            type: 'integer',
            example: 250,
          },
          per_page: {
            type: 'integer',
            example: 20,
          },
          current_page: {
            type: 'integer',
            example: 1,
          },
          last_page: {
            type: 'integer',
            example: 13,
          },
          first_page: {
            type: 'integer',
            example: 1,
          },
          first_page_url: {
            type: 'string',
            example: '/?page=1',
          },
          last_page_url: {
            type: 'string',
            example: '/?page=13',
          },
          next_page_url: {
            type: 'string',
            nullable: true,
            example: '/?page=2',
          },
          previous_page_url: {
            type: 'string',
            nullable: true,
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
}

export default Documentation

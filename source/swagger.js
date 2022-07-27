export const swaggerDocument = {
  openapi: '3.0.2',
  info: {
    title: 'Post articles API',
    description:
      'The API allows you to register, search, change, delete user accounts. After authentication, users can create, search, edit, delete articles.',
    version: '1.0.0',
    contact: {
      name: 'Molochkov Sergey',
      email: 'wwwsergwww@mail.ru',
    },
    license: {
      name: 'ISC',
    },
  },
  servers: [
    {
      url: '/',
    },
  ],
  tags: [
    {
      name: 'Auth',
      description: 'Module to login/logout to system',
    },
    {
      name: 'User',
      description: 'Module to provide operations with user accounts',
    },
    {
      name: 'Article',
      description: 'Module to provide operations with articles',
    },
    {
      name: 'Administration',
      description:
        'Module to provide administrative operations with users and articles',
    },
  ],
  paths: {
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Authenticate user',
        description: 'Login user into the system',
        operationId: 'authenticateUser',
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            description: 'base64 string concatenated email + : + password',
            schema: {
              example: 'Base nfjenjwfjnewfuuh382rhfh838fh93=,',
              type: 'string',
            },
            required: true,
          },
        ],
        responses: {
          204: {
            description: 'Success authentication',
            headers: {
              'X-Token': {
                schema: {
                  type: 'string',
                },
                description:
                  'This jsonwebtoken should be used as authorization token in next requests to server',
              },
            },
          },
          401: {
            description: 'Invalid credentials',
            content: {
              'application/json': {
                schema: {
                  type: 'string',
                  example: {
                    message: 'Сredentials are not valid',
                  },
                },
              },
            },
          },
          429: {
            $ref: '#/components/responses/TooManyPequestsError',
          },
        },
      },
    },
    '/auth/logout': {
      post: {
        tags: ['Auth'],
        summary: 'Logout user',
        description: 'Logout current logged in user session',
        operationId: 'logoutUser',
        responses: {
          204: {
            description: 'User logged out successfully',
          },
          403: {
            $ref: '#/components/responses/AuthorizeError',
          },
        },
        security: [
          {
            JWT: [],
          },
        ],
      },
    },
    '/users': {
      post: {
        tags: ['User'],
        description: 'Creates user',
        requestBody: {
          description: 'User account that needs to be added to the service',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserSchema',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Create new user account',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UserView',
                },
              },
            },
          },
          400: {
            description: 'Invalid payload',
            content: {
              'application/json': {
                schema: {
                  oneOf: [
                    {
                      $ref: '#/components/schemas/ValidationError',
                    },
                    {
                      $ref: '#/components/schemas/DuplicateValueError',
                    },
                    {
                      $ref: '#/components/schemas/CreationError',
                    },
                  ],
                },
              },
            },
          },
          429: {
            $ref: '#/components/responses/TooManyPequestsError',
          },
        },
      },
      get: {
        tags: ['User'],
        description: 'Get all users',
        responses: {
          200: {
            description: 'Gets an array of users',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/UserShortView',
                  },
                },
              },
            },
          },
          403: {
            $ref: '#/components/responses/AuthorizeError',
          },
        },
        security: [
          {
            JWT: [],
          },
        ],
      },
    },
    '/users/{UserId}': {
      get: {
        tags: ['User'],
        description: 'Gets user by id',
        parameters: [
          {
            $ref: '#/components/parameters/UserId',
          },
        ],
        responses: {
          200: {
            description: 'Get information about user',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UserView',
                },
              },
            },
          },
          400: {
            description: 'Invalid id',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/InvalidIdError',
                },
              },
            },
          },
          403: {
            $ref: '#/components/responses/AuthorizeError',
          },
          404: {
            $ref: '#/components/responses/NotFoundUserError',
          },
        },
        security: [
          {
            JWT: [],
          },
        ],
      },
      put: {
        tags: ['User'],
        description: 'Updates user by id',
        parameters: [
          {
            $ref: '#/components/parameters/UserId',
          },
        ],
        requestBody: {
          description: 'Update user account',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserSchema',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Update user account',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UserView',
                },
              },
            },
          },
          400: {
            description: 'Invalid payload',
            content: {
              'application/json': {
                schema: {
                  oneOf: [
                    {
                      $ref: '#/components/schemas/InvalidIdError',
                    },
                    {
                      $ref: '#/components/schemas/ValidationError',
                    },
                    {
                      $ref: '#/components/schemas/DuplicateValueError',
                    },
                  ],
                },
              },
            },
          },
          403: {
            $ref: '#/components/responses/AuthorizeError',
          },
          404: {
            $ref: '#/components/responses/NotFoundUserError',
          },
        },
        security: [
          {
            JWT: [],
          },
        ],
      },
      delete: {
        tags: ['User'],
        description: 'Deletes user by id',
        parameters: [
          {
            $ref: '#/components/parameters/UserId',
          },
        ],
        responses: {
          204: {
            description: 'Success delete user',
          },
          400: {
            description: 'Invalid payload',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/InvalidIdError',
                },
              },
            },
          },
          403: {
            $ref: '#/components/responses/AuthorizeError',
          },
          404: {
            $ref: '#/components/responses/NotFoundUserError',
          },
        },
        security: [
          {
            JWT: [],
          },
        ],
      },
    },
    '/articles': {
      post: {
        tags: ['Article'],
        description: 'Creates article',
        requestBody: {
          description: 'Article that needs to be added to the service',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ArticleSchema',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Create new article',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/ArticleView',
                  },
                },
              },
            },
          },
          400: {
            description: 'Invalid payload',
            content: {
              'application/json': {
                schema: {
                  oneOf: [
                    {
                      $ref: '#/components/schemas/ValidationError',
                    },
                    {
                      $ref: '#/components/schemas/DuplicateValueError',
                    },
                    {
                      $ref: '#/components/schemas/CreationError',
                    },
                  ],
                },
              },
            },
          },
          403: {
            $ref: '#/components/responses/AuthorizeError',
          },
        },
        security: [
          {
            JWT: [],
          },
        ],
      },
      get: {
        tags: ['Article'],
        description: 'Get all articles',
        responses: {
          200: {
            description: 'Gets an array of articles',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/ArticleShortView',
                  },
                },
              },
            },
          },
        },
        security: [
          {
            JWT: [],
          },
        ],
      },
    },
    '/articles/{ArticleId}': {
      get: {
        tags: ['Article'],
        description: 'Gets article by id',
        parameters: [
          {
            $ref: '#/components/parameters/ArticleId',
          },
        ],
        responses: {
          200: {
            description: 'Get information about article',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ArticleView',
                },
              },
            },
          },
          400: {
            description: 'Invalid id',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/InvalidIdError',
                },
              },
            },
          },
          404: {
            $ref: '#/components/responses/NotFoundArticleError',
          },
        },
        security: [
          {
            JWT: [],
          },
        ],
      },
      put: {
        tags: ['Article'],
        description: 'Updates article by id',
        parameters: [
          {
            $ref: '#/components/parameters/ArticleId',
          },
        ],
        requestBody: {
          description: 'Update article account',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ArticleSchema',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Update article',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ArticleView',
                },
              },
            },
          },
          400: {
            description: 'Invalid payload',
            content: {
              'application/json': {
                schema: {
                  oneOf: [
                    {
                      $ref: '#/components/schemas/InvalidIdError',
                    },
                    {
                      $ref: '#/components/schemas/ValidationError',
                    },
                    {
                      $ref: '#/components/schemas/DuplicateValueError',
                    },
                  ],
                },
              },
            },
          },
          403: {
            $ref: '#/components/responses/AuthorizeError',
          },
          404: {
            $ref: '#/components/responses/NotFoundArticleError',
          },
        },
        security: [
          {
            JWT: [],
          },
        ],
      },
      delete: {
        tags: ['Article'],
        description: 'Deletes user by article id',
        parameters: [
          {
            $ref: '#/components/parameters/ArticleId',
          },
        ],
        responses: {
          204: {
            description: 'Success delete article',
          },
          400: {
            description: 'Invalid payload',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/InvalidIdError',
                },
              },
            },
          },
          403: {
            $ref: '#/components/responses/AuthorizeError',
          },
          404: {
            $ref: '#/components/responses/NotFoundArticleError',
          },
        },
        security: [
          {
            JWT: [],
          },
        ],
      },
    },
    '/users/{UserId}/makeadmin': {
      post: {
        tags: ['Administration'],
        description: 'Give the user administrator rights',
        parameters: [
          {
            $ref: '#/components/parameters/UserId',
          },
        ],
        responses: {
          204: {
            description: 'Success make admin',
          },
          400: {
            description: 'Invalid payload',
            content: {
              'application/json': {
                schema: {
                  oneOf: [
                    {
                      $ref: '#/components/schemas/InvalidIdError',
                    },
                  ],
                },
              },
            },
          },
          403: {
            $ref: '#/components/responses/AuthorizeError',
          },
          404: {
            $ref: '#/components/responses/NotFoundUserError',
          },
        },
        security: [
          {
            JWT: [],
          },
        ],
      },
    },
    '/users/{UserId}/excludeadmin': {
      post: {
        tags: ['Administration'],
        description: 'Exclude the user administrator rights',
        parameters: [
          {
            $ref: '#/components/parameters/UserId',
          },
        ],
        responses: {
          204: {
            description: 'Success exclude admin',
          },
          400: {
            description: 'Invalid payload',
            content: {
              'application/json': {
                schema: {
                  oneOf: [
                    {
                      $ref: '#/components/schemas/InvalidIdError',
                    },
                  ],
                },
              },
            },
          },
          403: {
            $ref: '#/components/responses/AuthorizeError',
          },
          404: {
            $ref: '#/components/responses/NotFoundUserError',
          },
        },
        security: [
          {
            JWT: [],
          },
        ],
      },
    },
    '/articles/{ArticleId}/approve': {
      post: {
        tags: ['Administration'],
        description: 'Approve user article',
        parameters: [
          {
            $ref: '#/components/parameters/ArticleId',
          },
        ],
        responses: {
          204: {
            description: 'Success approve user article',
          },
          400: {
            description: 'Invalid payload',
            content: {
              'application/json': {
                schema: {
                  oneOf: [
                    {
                      $ref: '#/components/schemas/InvalidIdError',
                    },
                  ],
                },
              },
            },
          },
          403: {
            $ref: '#/components/responses/AuthorizeError',
          },
          404: {
            $ref: '#/components/responses/NotFoundArticleError',
          },
        },
        security: [
          {
            JWT: [],
          },
        ],
      },
    },
    '/articles/{ArticleId}/disapprove': {
      post: {
        tags: ['Administration'],
        description: 'Disapprove user article',
        parameters: [
          {
            $ref: '#/components/parameters/ArticleId',
          },
        ],
        responses: {
          204: {
            description: 'Success approve user article',
          },
          400: {
            description: 'Invalid payload',
            content: {
              'application/json': {
                schema: {
                  oneOf: [
                    {
                      $ref: '#/components/schemas/InvalidIdError',
                    },
                  ],
                },
              },
            },
          },
          403: {
            $ref: '#/components/responses/AuthorizeError',
          },
          404: {
            $ref: '#/components/responses/NotFoundArticleError',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      UserId: {
        type: 'string',
        description: 'unique indentifier',
        example: '62de778c48bdbcddfa21ff61',
      },
      ArticleId: {
        type: 'string',
        description: 'unique indentifier',
        example: '62de778c48bdbcddfa21ff61',
      },
      UserSchema: {
        required: ['name', 'sex', 'birthDay', 'phone', 'email', 'password'],
        properties: {
          name: {
            type: 'string',
            description:
              'Value, should have a minimum 8 characters, maximum 25 characters,  contain a-zA-Z0-9',
            example: 'Tom',
          },
          sex: {
            type: 'string',
            enum: ['male', 'female'],
            example: 'male',
          },
          birthDay: {
            type: 'string',
            format: 'dateTime',
            description:
              'Registration is available to users over the age of 18. Valid values are from 1900-01-01.',
            example: '1988-01-01T00:00:00.000Z',
          },
          phone: {
            type: 'string',
            description: 'Value should be like at +7(8)-nnn-nnn-nn-nn',
            example: '+7-123-456-78-90',
          },
          email: {
            type: 'string',
            description: 'Value should be a valid email',
            example: 'mail@mail.ru',
          },
          password: {
            type: 'string',
            description:
              'Value should have a minimum 8 characters, at least one letter, one number and one special character',
            example: 'Sw331@111',
          },
        },
      },
      ArticleSchema: {
        required: ['theme'],
        properties: {
          theme: {
            type: 'string',
            description:
              'Value, should have a minimum 3 characters, maximum 100 characters',
            example: 'Some theme',
          },
          content: {
            type: 'string',
            example: 'Very interesting text',
          },
        },
      },
      UserView: {
        properties: {
          id: {
            type: 'string',
            example: '62de778c48bdbcddfa21ff61',
          },
          name: {
            type: 'string',
            example: 'Tom',
          },
          sex: {
            type: 'string',
            enum: ['male', 'female'],
            example: 'male',
          },
          age: {
            type: 'number',
            example: 34,
          },
          phone: {
            type: 'string',
            example: '+7-123-456-78-90',
          },
          email: {
            type: 'string',
            example: 'mail@mail.ru',
          },
          articles: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ArticleShortView',
            },
          },
        },
      },
      UserShortView: {
        properties: {
          id: {
            type: 'string',
            example: '62de778c48bdbcddfa21ff61',
          },
          name: {
            type: 'string',
            example: 'Tom',
          },
          sex: {
            type: 'string',
            enum: ['male', 'female'],
            example: 'male',
          },
          age: {
            type: 'number',
            example: 34,
          },
          phone: {
            type: 'string',
            example: '+7-123-456-78-90',
          },
          email: {
            type: 'string',
            example: 'mail@mail.ru',
          },
        },
      },
      ArticleView: {
        properties: {
          id: {
            type: 'string',
            example: '62de778c48bdbcddfa21ff61',
          },
          author: {
            properties: {
              id: {
                type: 'string',
                example: '62de778c48bdbcddfa21ff61',
              },
              name: {
                type: 'string',
                example: 'Bob',
              },
            },
          },
          theme: {
            type: 'string',
            example: 'Some theme',
          },
          content: {
            type: 'string',
            example: 'Very interesting text',
          },
          check: {
            type: 'boolean',
            description: 'Article status',
            example: true,
          },
          created: {
            type: 'string',
            format: 'date-time',
            example: '2022-07-25T10:59:33.099Z',
          },
          modified: {
            type: 'string',
            format: 'date-time',
            example: '2022-07-25T10:59:33.099Z',
          },
        },
      },
      ArticleShortView: {
        properties: {
          id: {
            type: 'string',
            example: '62de778c48bdbcddfa21ff61',
          },
          author: {
            type: 'string',
            example: 'Bob',
          },
          theme: {
            type: 'string',
            example: 'Some theme',
          },
          check: {
            type: 'boolean',
            description: 'Article status',
            example: true,
          },
          created: {
            type: 'string',
            format: 'date-time',
            example: '2022-07-25T10:59:33.099Z',
          },
          modified: {
            type: 'string',
            format: 'date-time',
            example: '2022-07-25T10:59:33.099Z',
          },
        },
      },
      ValidationError: {
        properties: {
          message: {
            type: 'string',
            example: 'error.message',
          },
        },
      },
      InvalidIdError: {
        properties: {
          message: {
            type: 'string',
            example: 'Id is invalid',
          },
        },
      },
      DuplicateValueError: {
        properties: {
          message: {
            type: 'string',
            example: 'Duplicate value error in error.keyValue',
          },
        },
      },
      CreationError: {
        properties: {
          message: {
            type: 'string',
            example: 'Incorrect payload',
          },
        },
      },
    },
    responses: {
      TooManyPequestsError: {
        description: 'Too Many Pequests',
        content: {
          'application/json': {
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example:
                    'Too many authentications created from this IP, please try again after an X seconds',
                },
              },
            },
          },
        },
      },
      AuthenticateError: {
        description: 'Forbidden',
        content: {
          'application/json': {
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Сredentials are not valid',
                },
              },
            },
          },
        },
      },
      AuthorizeError: {
        description: 'Forbidden',
        content: {
          'application/json': {
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'That may be, but you have no right to access it',
                },
              },
            },
          },
        },
      },
      DuplicateValueError: {
        description: 'Duplicate value',
        content: {
          'application/json': {
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Duplicate value error in error.keyValue',
                },
              },
            },
          },
        },
      },
      CreationError: {
        description: 'Creation error',
        content: {
          'application/json': {
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Incorrect payload',
                },
              },
            },
          },
        },
      },
      NotFoundArticleError: {
        description: 'Not found article',
        content: {
          'application/json': {
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'Article not found by id',
                },
              },
            },
          },
        },
      },
      NotFoundUserError: {
        description: 'Not found user',
        content: {
          'application/json': {
            schema: {
              properties: {
                message: {
                  type: 'string',
                  example: 'User not found by id',
                },
              },
            },
          },
        },
      },
    },
    parameters: {
      UserId: {
        name: 'UserId',
        in: 'path',
        description: 'User id',
        schema: {
          $ref: '#/components/schemas/UserId',
        },
        required: true,
      },
      ArticleId: {
        name: 'ArticleId',
        in: 'path',
        description: 'Article id',
        schema: {
          $ref: '#/components/schemas/ArticleId',
        },
        required: true,
      },
    },
    securitySchemes: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'access_token',
      },
    },
  },
}

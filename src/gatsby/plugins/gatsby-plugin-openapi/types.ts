export type RequestBodySchema = {
  properties: Record<string, {description: string; type: string}>;
  required: string[];
  type: string;
};

export type Parameter = {
  description: string;
  in: string;
  name: string;
  required: boolean;
  schema: {
    enum: string[];
    format: string;
    type: string;
    items?: {[key: string]: {}};
  };
};

type Markdown = {
  childMdx: {
    body: string;
  };
};

type Tag = {
  description: string;
  externalDocs: {
    description: string;
    url: string;
  };
  name: string;
};

type OpenAPIResponse = {
  content: {
    'application/json': {
      example: any;
      schema: any;
    };
  };
  description: string;
};

type OpenAPIRequestBody = {
  content: {
    'application/json': {
      example: any;
      schema: RequestBodySchema;
    };
  };
  required: boolean;
};

type OpenAPIOperation = {
  operationId: string;
  parameters: Parameter[];
  requestBody: OpenAPIRequestBody;
  responses: Record<string, OpenAPIResponse>;
  tags: string[];
};

export type DeRefedOpenAPI = {
  paths: {
    [path: string]: {
      [method: string]: OpenAPIOperation;
    };
  };
  tags: Tag[];
};

export type ResponseContent = {
  content_type: string;
  example: string;
  examples: string;
  schema: string;
};

export type Response = {
  content: ResponseContent | null;
  description: string;
  status_code: string;
};

export type RequestBody = {
  content: {
    content_type: string;
    example: string;
    schema: string;
  };
  required: boolean;
};

export type OpenApiPath = {
  apiPath: string;
  description: string;
  method: string;
  operationId: string;
  parameters: Parameter[];
  readableUrl: string;
  requestBody: RequestBody | null;
  responses: Response[];
  security: {[key: string]: string[]}[];
  summary: string | null;
  tags: string[];
};

export type OpenAPI = {
  childOpenApiPathDescription: Markdown;
  childrenOpenApiBodyParameter: (Parameter & Markdown)[];
  childrenOpenApiPathParameter: (Parameter & Markdown)[];
  id: string;
  path: OpenApiPath;
};

import { FromSchema, JSONSchema } from 'json-schema-to-ts';

export type SchemaToInterface<
  T extends {
    body?: JSONSchema;
    querystring?: JSONSchema;
    params?: JSONSchema;
    headers?: JSONSchema;
    response?: { [key: string]: JSONSchema };
  },
  deserializeOption extends [{ pattern: unknown; output: unknown }] | false = false
> = {
  Body: T['body'] extends JSONSchema
  ? FromSchema<T['body']>
  : unknown;
  Querystring: T['querystring'] extends JSONSchema
  ? FromSchema<T['querystring']>
  : unknown;
  Params: T['params'] extends JSONSchema
  ? FromSchema<T['params']>
  : unknown;
  Headers: T['headers'] extends JSONSchema
  ? FromSchema<T['headers']>
  : unknown;
  Reply: {
    [key in keyof T['response']]: T['response'][key] extends JSONSchema
    ? FromSchema<T['response'][key],{ deserialize: deserializeOption }>
    : unknown;
  };
};

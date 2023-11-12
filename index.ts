import { FromSchema, JSONSchema } from 'json-schema-to-ts';

export type SchemaToInterface<
  T extends {
    body?: JSONSchema;
    querystring?: JSONSchema;
    params?: JSONSchema;
    headers?: JSONSchema;
    response?: { [key: string]: JSONSchema };
  },
  Option extends [{ pattern: unknown; output: unknown }] | false = false
> = {
  Body: T['body'] extends JSONSchema
  ? FromSchema<T['body'], { deserialize: Option }>
  : unknown;
  Querystring: T['querystring'] extends JSONSchema
  ? FromSchema<T['querystring'], { deserialize: Option }>
  : unknown;
  Params: T['params'] extends JSONSchema
  ? FromSchema<T['params'], { deserialize: Option }>
  : unknown;
  Headers: T['headers'] extends JSONSchema
  ? FromSchema<T['headers'], { deserialize: Option }>
  : unknown;
  Reply: {
    [key in keyof T['response']]: T['response'][key] extends JSONSchema
    ? FromSchema<T['response'][key],{ deserialize: Option }>
    : unknown;
  };
};

import { SchemaToInterface } from '../index'
import { expectType } from 'tsd'

const schema = {
    tags: ['posts'],
    summary: 'post a new post',
    headers: {
        type: 'object',
        properties: {
          authorization: { type: 'string' },
        },
        additionalProperties: false,
        required: ['authorization'],
    },
    body: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          content: { type: 'string' },
        },
        additionalProperties: false,
        required: ['title', 'content'],
    },
    response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            title: { type: 'string' },
            content: { type: 'string' },
          },
          additionalProperties: false,
          required: ['id', 'title', 'content'],
        },
    },
} as const;

type Post = SchemaToInterface<typeof schema>

expectType<Post['Body']>({
    title: 'string',
    content: 'string',
})

expectType<Post['Headers']>({
    authorization: 'string',
})

expectType<Post['Reply'][200]>({
    id: 1,
    title: 'string',
    content: 'string',
});

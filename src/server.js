import { createServer, Model, Response } from 'miragejs';

export function makeServer({ environment = 'test' } = {}) {
  const server = createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create('user', { name: 'Bob' });
      server.create('user', { name: 'Alice' });
    },

    routes() {
      this.namespace = 'api';

      this.get('/users', schema => {
        return schema.users.all();
      });

      this.post('/signup', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const user = schema.users.create({ ...attrs });
        return user;
      });

      this.post('/login', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const errorStatus = 400;
        const token =
          'eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6InBhc3NAMTIzIiwiZW1haWwiOiJ0ZXN0ZUB0ZXN0ZS5jb20ifQ.rT4trLnLMvw74emV2SSvBoRwTrYt74TZuOL8FVfD9Ik';

        if (
          attrs.email === 'teste@teste.com' &&
          attrs.password === 'pass@123'
        ) {
          return { token };
        }

        return new Response(
          errorStatus,
          { some: 'header' },
          { error: 'Invalid email or password' },
        );
      });
    },
  });

  return server;
}
